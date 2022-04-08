import axios from "axios";
import { mapboxAccessToken } from "../contantes";

// base_url/-73.98950324608802,40.73327291177242;-73.99091535784588,40.73412456721374
interface IGeometry {
  coordinates: [number, number][];
}

interface IRoute {
  geometry: IGeometry;
  distance: number;
  duration: number;
}

export interface IDirectionsApiRes {
  routes: IRoute[];
}

export const directionsApi = axios.create({
  baseURL: "https://api.mapbox.com/directions/v5/mapbox/driving",
  params: {
    geometries: "geojson",
    language: "es",
    overview: "simplified",
    steps: true,
    access_token: mapboxAccessToken,
  },
});
