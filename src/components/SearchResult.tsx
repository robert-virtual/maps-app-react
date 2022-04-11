import { Marker, LngLatBounds, AnySourceData } from "mapbox-gl";
import { FC, useContext, useMemo } from "react";
import { ISearchDirectionsRes, searchDirections } from "../axios";
import { ILugar } from "../contantes";
import { MapaContext } from "../context";

interface ISearchResultProps {}
export const SearchResult: FC<ISearchResultProps & ILugar> = ({
  text,
  place_name,
  center,
}) => {
  const routeId = useMemo(() => "routeId", []);
  const { marker, mapa, setResultsVisible, miUbicacion } =
    useContext(MapaContext);

  async function trazarRuta() {
    if (!mapa) {
      return;
    }
    // si existe un markador lo eliminamos
    if (marker.current) {
      marker.current.remove();
      console.log("marker removed");
    }
    // esconder la lista de resultados
    setResultsVisible(false);
    // crear marcardor y le asignamos una referencia
    marker.current = new Marker();
    // establecemos la ubicacion del marcador
    marker.current.setLngLat(center).addTo(mapa);

    // trazar ruta
    const { data } = await searchDirections.get<ISearchDirectionsRes>(
      `/${miUbicacion.join(",")};${center.join(",")}`
    );
    const { coordinates } = data.routes[0].geometry;
    const bounds = new LngLatBounds(miUbicacion, miUbicacion);
    for (const coord of coordinates) {
      bounds.extend(coord);
    }
    mapa.fitBounds(bounds, { padding: 200 });

    let sourceData: AnySourceData = {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates,
            },
          },
        ],
      },
    };
    if (mapa.getLayer(routeId)) {
      mapa.removeLayer(routeId);
      mapa.removeSource(routeId);
    }
    mapa.addSource(routeId, sourceData);
    mapa.addLayer({
      id: routeId,
      type: "line",
      source: routeId,
      layout: {
        "line-cap": "round",
        "line-join": "round",
      },
      paint: {
        "line-color": "violet",
        "line-width": 3,
      },
    });
  }

  return (
    <div
      onClick={trazarRuta}
      className="my-2 p-4 border-b-[1px] border-gray-300 cursor-pointer"
    >
      <p>{text}</p>
      <p>{place_name}</p>
    </div>
  );
};
