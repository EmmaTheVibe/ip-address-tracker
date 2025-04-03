"use client";

import styles from "./Map.module.css";
import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useMediaQuery } from "@mui/material";
import { useGeolocation } from "../GeolocationContext";
import Spinner from "../Spinner/Spinner";

const customIcon = L.icon({
  iconUrl: "/icon-location.svg",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const Map = () => {
  const { geolocation } = useGeolocation();
  const lat = geolocation?.location.lat;
  const lng = geolocation?.location.lng;

  const [isMounted, setIsMounted] = useState(false);
  const md = useMediaQuery("(min-width:650px)");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  function RecenterMap({ lat, lng }) {
    const map = useMap();

    useEffect(() => {
      if (lat && lng) {
        map.setView([lat, lng], 13, { animate: true });
      }
    }, [lat, lng, map]);

    return null;
  }

  if (!geolocation) return;
  if (!isMounted) return <Spinner />;

  return (
    <MapContainer
      center={[lat, lng]}
      zoom={13}
      className={styles.map}
      zoomControl={md ? true : false}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={[lat, lng]} icon={customIcon}>
        <Popup>Your Location</Popup>
      </Marker>
      <RecenterMap lat={lat} lng={lng} />
    </MapContainer>
  );
};

export default Map;
