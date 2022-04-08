import { AnySourceData, LngLatBounds, Marker } from "mapbox-gl";
import { FC, useContext, useRef, useState } from "react";
import { directionsApi, IDirectionsApiRes } from "../axios/directionsApi";
import { ILugar } from "../contantes";
import { MapaContext } from "../context";

interface ISearchResultProps {}
export const SearchResult: FC<ISearchResultProps & ILugar> = ({
  text,
  place_name,
  center,
}) => {
  const [routeId, setRouteId] = useState("RouteString");
  const { marker, mapa, setResultsVisible, miUbicacion } =
    useContext(MapaContext);

  async function trazarRuta() {
    if (!mapa) {
      return;
    }
    if (marker.current) {
      marker.current.remove();
      console.log("marker removed");
    }
    setResultsVisible(false);
    marker.current = new Marker({ color: "#f75555" });

    marker.current.setLngLat(center).addTo(mapa);
    const { data } = await directionsApi.get<IDirectionsApiRes>(
      `/${miUbicacion.join(",")};${center.join(",")}`
    );
    const { geometry, distance, duration } = data.routes[0];
    const { coordinates } = geometry;
    let bounds = new LngLatBounds(miUbicacion, miUbicacion);
    console.log(data.routes[0]);
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
        "line-color": "#a855f7",
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
