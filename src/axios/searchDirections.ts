import axios from "axios";
import { mapboxAccessToken } from "../contantes";

// https://api.mapbox.com/directions/v5/mapbox/driving/
// -73.99061497578263,40.735840195921924;-74.00678933153394,40.73115675613835

interface IGeometry {
  coordinates: [number, number][];
}

interface IRoute {
  distance: number;
  duration: number;
  geometry: IGeometry;
}
export interface ISearchDirectionsRes {
  routes: IRoute[];
}

export const searchDirections = axios.create({
  baseURL: "https://api.mapbox.com/directions/v5/mapbox/driving",
  params: {
    alternatives: false,
    geometries: "geojson",
    language: "es",
    overview: "simplified",
    steps: false,
    access_token: mapboxAccessToken,
  },
});
