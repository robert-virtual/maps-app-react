import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl"; // or "const mapboxgl = require('mapbox-gl');"
import { mapboxAccessToken } from "./contantes";
import { MapaProvider } from "./context";

mapboxgl.accessToken = mapboxAccessToken;

ReactDOM.render(
  <React.StrictMode>
    <MapaProvider>
      <App />
    </MapaProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
