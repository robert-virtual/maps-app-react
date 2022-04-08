import { Map, Marker } from "mapbox-gl";
import { createContext, FC, useRef, useState } from "react";

interface IMapaContext {
  mapa: Map | undefined;
  setMapa: React.Dispatch<React.SetStateAction<Map | undefined>>;
  resultsVisible: boolean;
  setResultsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  marker: React.MutableRefObject<Marker | undefined>;
}

export const MapaContext = createContext<IMapaContext>({} as IMapaContext);

export const MapaProvider: FC = ({ children }) => {
  const [mapa, setMapa] = useState<Map>();
  const [resultsVisible, setResultsVisible] = useState(false);
  const marker = useRef<Marker>();
  return (
    <MapaContext.Provider
      value={{ marker, mapa, setMapa, resultsVisible, setResultsVisible }}
    >
      {children}
    </MapaContext.Provider>
  );
};
