import { Marker } from "mapbox-gl";
import { FC, useContext, useRef } from "react";
import { ILugar } from "../contantes";
import { MapaContext } from "../context";

interface ISearchResultProps {}
export const SearchResult: FC<ISearchResultProps & ILugar> = ({
  text,
  place_name,
  center,
}) => {
  const { marker, mapa, setResultsVisible } = useContext(MapaContext);

  function trazarRuta() {
    if (!mapa) {
      return;
    }
    if (marker.current) {
      marker.current.remove();
      console.log("marker removed");
    }
    setResultsVisible(false);
    marker.current = new Marker();

    marker.current.setLngLat(center).addTo(mapa);
    mapa.flyTo({ center });
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
