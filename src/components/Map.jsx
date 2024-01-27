import PropTypes from "prop-types";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvent,
} from "react-leaflet";
import styles from "./Map.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCities } from "../Contexts/CitiesContext";
import { useGeolocation } from "../hooks/useGeolocation";
import Button from "./Button";
import useUrlPosition from "../hooks/useUrlPosition";

function Map() {
  const [mapPosition, setMapPosition] = useState([40, 0]);

  const { cities } = useCities();
  const [mapLat, mapLng] = useUrlPosition();

  const {
    isLoading: isLoadinfPosition,
    position: geoLocation,
    getPosition,
  } = useGeolocation();

  useEffect(() => {
    if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
  }, [mapLat, mapLng]);

  useEffect(() => {
    if (geoLocation) setMapPosition([geoLocation.lat, geoLocation.lng]);
  }, [geoLocation]);

  console.log(cities);
  return (
    <div className={styles.mapContainer}>
      {!geoLocation && (
        <Button type="position" onClick={getPosition}>
          {isLoadinfPosition ? "Loading..." : "Use Current Position"}
        </Button>
      )}
      <MapContainer
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}>
            <Popup>
              <span>{city.emoji}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChnageCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChnageCenter({ position }) {
  const map = useMap();
  map.setView(position);

  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvent({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
}

ChnageCenter.propTypes = {
  position: PropTypes.array.isRequired,
};

export default Map;
