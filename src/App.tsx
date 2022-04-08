import { Map, Marker } from "mapbox-gl"; // or "const mapboxgl = require('mapbox-gl');"
import { useContext, useEffect, useRef, useState } from "react";
import { searchPlaces, searchPlacesRes } from "./axios/searchPlaces";
import { SearchResult } from "./components/SearchResult";
import { ILugar } from "./contantes";
import { MapaContext } from "./context";

function App() {
  const {
    mapa,
    setMapa,
    setResultsVisible,
    resultsVisible,
    miUbicacion,
    setMiUbicacion,
  } = useContext(MapaContext);

  const [lugares, setLugares] = useState<ILugar[]>([]);
  const [lugar, setLugar] = useState("");
  const divMapaRef = useRef<HTMLDivElement>(null);

  const [error, setError] = useState("");
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setMiUbicacion([coords.longitude, coords.latitude]);
      },
      () => {
        setError("No se pudo acceder a la ubicacion");
      }
    );
  }, []);

  useEffect(() => {
    mapa?.flyTo({
      center: miUbicacion,
    });
    if (mapa) {
      new Marker().setLngLat(miUbicacion).addTo(mapa);
    }
  }, [miUbicacion]);

  useEffect(() => {
    if (divMapaRef.current) {
      setMapa(
        new Map({
          container: divMapaRef.current, // container ID
          style: "mapbox://styles/mapbox/streets-v11", // style URL
          center: miUbicacion, // starting position [lng, lat]
          zoom: 9, // starting zoom
        })
      );
    }
  }, [divMapaRef]);

  function positionInicial() {
    mapa?.flyTo({ center: miUbicacion });
  }
  if (error) {
    <div className="grid h-screen w-screen place-items-center">
      <p className="text-red-500 ">{error}</p>
    </div>;
  }
  const timeOutRef = useRef<number>();
  function buscar() {
    if (timeOutRef.current) {
      clearInterval(timeOutRef.current);
    }
    if (!lugar) {
      return;
    }
    timeOutRef.current = setTimeout(async () => {
      const { data, config } = await searchPlaces.get<searchPlacesRes>(
        `/${lugar}.json`,
        {
          params: {
            proximity: miUbicacion.join(","),
          },
        }
      );

      setResultsVisible(data.features.length > 0);
    }, 500);
  }

  return (
    <div>
      <div className=" absolute z-50 top-5 left-5">
        <input
          className="p-4 shadow-sm rounded-sm"
          type="search"
          value={lugar}
          onChange={({ target }) => setLugar(target.value)}
          onKeyUp={buscar}
          placeholder="buscar"
        />
        <div className="bg-white  mt-4 rounded">
          {lugares.length && resultsVisible
            ? lugares.map((place, i) => (
                <SearchResult key={i.toString()} {...place} />
              ))
            : lugar &&
              resultsVisible && (
                <div className="my-2 p-4 border-b-[1px] border-gray-300 cursor-pointer">
                  <p>No encontrado</p>
                  <p>No se encontro el lugar "{lugar}"</p>
                </div>
              )}
        </div>
      </div>
      <button
        onClick={positionInicial}
        className="absolute z-50 bg-purple-500 text-white p-4 rounded bottom-10 right-5 hover:scale-110 transition-all active:scale-100"
      >
        Mi Ubicacion
      </button>
      <div className="absolute w-screen h-screen" ref={divMapaRef}></div>
    </div>
  );
}

export default App;
