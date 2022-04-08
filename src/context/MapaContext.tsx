import { LngLatLike, Map, Marker } from "mapbox-gl";
import { createContext, FC, useRef, useState } from "react";

interface IMapaContext {
  mapa: Map | undefined;
  setMapa: React.Dispatch<React.SetStateAction<Map | undefined>>;
  resultsVisible: boolean;
  setResultsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  marker: React.MutableRefObject<Marker | undefined>;
  miUbicacion: [number, number];
  setMiUbicacion: React.Dispatch<React.SetStateAction<[number, number]>>;
}

export const MapaContext = createContext<IMapaContext>({} as IMapaContext);

export const MapaProvider: FC = ({ children }) => {
  const [mapa, setMapa] = useState<Map>();
  const [resultsVisible, setResultsVisible] = useState(false);
  const marker = useRef<Marker>();
  const [miUbicacion, setMiUbicacion] = useState<[number, number]>([-74.5, 40]);

  return (
    <MapaContext.Provider
      value={{
        marker,
        mapa,
        setMapa,
        resultsVisible,
        setResultsVisible,
        miUbicacion,
        setMiUbicacion,
      }}
    >
      {children}
    </MapaContext.Provider>
  );
};
