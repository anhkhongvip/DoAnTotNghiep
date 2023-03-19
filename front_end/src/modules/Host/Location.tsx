import {
  Autocomplete,
  GoogleMap,
  LoadScript,
  MarkerF,
  useJsApiLoader,
} from "@react-google-maps/api";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import MapContainer from "../../components/google_map/MapContainer";

type Coordinates = {
  lat: number;
  lng: number;
};

const defaultCenter = {
  lat: 41.3851,
  lng: 2.1734,
};

const LocationStyles = styled.div`
  .title {
    display: inline-block;
    margin-top: 2rem;
    font-weight: bold;
    font-size: 3rem;
    margin-bottom: 2rem;
    white-space: nowrap;
    overflow: hidden;
    animation: typing 10s steps(40);
  }

  @keyframes typing {
    0%,
    100% {
      width: 0;
    }

    50%,
    90% {
      width: 100%;
    }
  }

  .content {
    color: gray;
    font-weight: bold;
    margin-bottom: 2rem;
  }

  .search-map {
    display: flex;
    align-items: center;
    padding-right: 2rem;
    margin-bottom: 2rem;
    &-icon {
      padding: 2rem;
      font-size: 2.5rem;
    }
    height: 7rem;
    border: 1px solid gray;
    border-radius: 0.8rem;
    input {
      background-color: transparent;
      height: 100%;
      width: 100%;
    }
    .current-location {
      width: 20rem;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: 2rem;
      color: black;
      border: 1px solid black;
      font-size: 1.4rem;
      border-radius: 0.8rem;
      padding: 1rem 1rem;
      transition: 0.4s ease-in-out;
      background-color: transparent;
      i {
        margin-right: 1rem;
        font-size: 3rem;
      }

      &:hover {
        color: white;
        background-color: black;
      }
    }
  }
`;
const Location = () => {
  let infowindow: any = null;
  let geocoder: any;
  const [markers, setMarkers] = useState<any>([]);
  const [map, setMap] = useState<any>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [libraries] = useState<any>(["places"]);
  const [currentPosition, setCurrentPosition] =
    useState<Coordinates>(defaultCenter);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDzzi_VBcf2Oef6LTViLU767UPNHlnIze4",
    libraries,
  });

  function createMarker(place: any) {
    if (!place.geometry || !place.geometry.location) return;

    const marker = new google.maps.Marker({
      map,
      position: place.geometry.location,
    });
    setMarkers([...markers, marker]);
    map.panTo(place.geometry.location);
    infowindow?.setContent(place.name || "");
    infowindow?.open(map);
  }

  const clearMarker = () => {
    for (let i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
  };

  const handleGetPosition = (event: ChangeEvent) => {
    let { value } = event.target as HTMLInputElement;

    let request = {
      query: value,
      fields: ["name", "geometry"],
    };
    let service = new google.maps.places.PlacesService(map);
    service.findPlaceFromQuery(request, (results: any, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && results) {
        clearMarker();
        createMarker(results[0]);
      }
    });
  };

  const locationInit = (position: any) => {
    const curPosition = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };

    setCurrentPosition(curPosition);
  };

  const handleGetPositionCurrent = () => {
    clearMarker();
    geocoder = new google.maps.Geocoder();
    geocoder
      .geocode({ location: currentPosition })
      .then((response: any) => {
        if (response.results[0]) {
          const marker = new google.maps.Marker({
            position: currentPosition,
            map: map,
          });
          setMarkers([...markers, marker]);
          map.panTo(currentPosition);
          inputRef.current!.value = response.results[0].formatted_address;
          infowindow?.open(map, marker);
        } else {
          window.alert("No results found");
        }
      })
      .catch((error: Error) =>
        window.alert("Geocoder failed due to: " + error)
      );
  };

  useEffect(() => {
    // const places = searchBox.getPlaces();
    if (isLoaded) {
      navigator.geolocation.getCurrentPosition(locationInit);
    }
  }, [isLoaded]);

  if (!isLoaded) {
    return null;
  }

  return (
    <LocationStyles>
      <div className="container-sm">
        <h2 className="title">Chỗ ở của bạn nằm ở đâu?</h2>
        <p className="content">
          Địa chỉ của bạn chỉ được chia sẻ với khách sau khi họ đặt phòng thành
          công.
        </p>
        <div className="map">
          <Autocomplete>
            <div className="search-map">
              <div className="search-map-icon">
                <i className="fa-solid fa-location-dot"></i>
              </div>
              <input
                type="text"
                name="search-map"
                placeholder="Nhập địa chỉ của bạn"
                id="search-location"
                onBlur={(event) => handleGetPosition(event)}
                ref={inputRef}
              />
              <button
                className="current-location"
                onClick={handleGetPositionCurrent}
              >
                <i className="fa-solid fa-location-arrow"></i>Vị trí hiện tại
              </button>
            </div>
          </Autocomplete>

          <GoogleMap
            onLoad={(map) => setMap(map)}
            mapContainerStyle={{ height: "50rem", width: "100%" }}
            zoom={13}
            center={currentPosition}
          ></GoogleMap>
        </div>
      </div>
    </LocationStyles>
  );
};

export default Location;