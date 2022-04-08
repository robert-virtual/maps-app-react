import axios from "axios";
import { ILugar, mapboxAccessToken } from "../contantes";

// https://api.mapbox.com/geocoding/v5/mapbox.places/central park.json
// ?proximity=ip
// &types=place%2Cpostcode%2Caddress
// &access_token=YOUR_MAPBOX_ACCESS_TOKEN

// https://api.mapbox.com/geocoding/v5/mapbox.places/
// tegu.json
// ?proximity=-86.56219312751475%2C14.056458975622064
// &types=place%2Cpostcode%2Caddress
// &language=es
// &access_token=pk.eyJ1Ijoicm9iZXJ0NjMiLCJhIjoiY2wxcG16bnM2MWYxYzNlbW04NnZzeTR4dSJ9.-nftiLcajvnJhZwMkiE9fQ

export interface searchPlacesRes {
  features: ILugar[];
}

export const searchPlaces = axios.create({
  baseURL: "https://api.mapbox.com/geocoding/v5/mapbox.places",
  params: {
    proximity: "-86.56219312751475,14.056458975622064",
    types: "place,postcode,address",
    access_token: mapboxAccessToken,
    language: "es",
  },
});
