import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  InfoWindow,
  MarkerF,
} from "@react-google-maps/api";

const mapStyles = {
  height: "50rem",
  width: "100%",
};
const defaultCenter = {
  lat: 41.3851,
  lng: 2.1734,
};
type Coordinates = {
  lat: number;
  lng: number;
};
const MapContainer = () => {
  const [currentPosition, setCurrentPosition] =
    useState<Coordinates>(defaultCenter);
  const success = (position: any) => {
    const currentPosition = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };
    console.log(currentPosition);
    
    setCurrentPosition(currentPosition);
  };
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);
  },[]);
  return (
    <LoadScript googleMapsApiKey="AIzaSyDzzi_VBcf2Oef6LTViLU767UPNHlnIze4">
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={13}
        center={currentPosition}
      >
        <MarkerF position={currentPosition} />
      </GoogleMap>
    </LoadScript>
  );
};

export default MapContainer;
