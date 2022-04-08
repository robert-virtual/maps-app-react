import axios from "axios";
import { ILugar, mapboxAccessToken } from "../contantes";

// https://api.mapbox.com/geocoding/v5/mapbox.places/central park.json
// ?proximity=ip
// &types=place%2Cpostcode%2Caddress
// &access_token=YOUR_MAPBOX_ACCESS_TOKEN

export interface searchPlacesRes {
  features: ILugar[];
}

export const searchPlaces = axios.create({
  baseURL: "https://api.mapbox.com/geocoding/v5/mapbox.places/",
  params: {
    proximity: "ip",
    types: "place,postcode,address",
    access_token: mapboxAccessToken,
  },
});
