import { LngLatLike } from "mapbox-gl";

export interface ILugar {
  center: LngLatLike;
  place_name: string;
  text: string;
}

export const mapboxAccessToken =
  "pk.eyJ1Ijoicm9iZXJ0NjMiLCJhIjoiY2wxcG16bnM2MWYxYzNlbW04NnZzeTR4dSJ9.-nftiLcajvnJhZwMkiE9fQ";
