import React, {
  useState,
  useEffect,
  useRef,
  ChangeEvent,
  KeyboardEvent,
} from "react";
import styled from "styled-components";
import TextareaAutoResize from "../../../components/textarea/TextareaAutoResize";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useParams } from "react-router-dom";
import {
  Autocomplete,
  GoogleMap,
  useJsApiLoader,
} from "@react-google-maps/api";
import { updateRoomAsync } from "../../../services/room.service";
import Swal from "sweetalert2";
import { selectRoom, setRoom } from "../../../features/room/roomSlice";
const LocationStyles = styled.div`
  border: 1px solid #8080804f;
  border-radius: 0.8rem;
  margin-bottom: 2rem;

  .homeUpdate {
    &__address {
      font-weight: 700;
      &--main {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin: 2rem 2rem;
      }
      &--footer {
        border-top: 1px solid #8080804f;
        display: flex;
        justify-content: space-between;
        padding: 1.5rem 2rem;
      }
    }
    &__address {
      font-size: 1.2rem;
      font-weight: 600;
      color: gray;
      margin-bottom: 2rem;
    }
    &__info {
      max-width: calc(100% - 2rem);
      width: 100%;
    }
    &__close {
      font-size: 1.4rem;
      line-height: 1;
    }
    &__title {
      font-weight: 700;
      margin-bottom: 2rem;
    }
  }
  .map {
    flex-shrink: 0;
    width: 100%;
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

  .btn-not-allow {
    background-color: #ddd !important;
  }

  .content-length {
    font-size: 1.4rem;
    font-weight: 700;
    color: gray;
  }

  .btn-close {
    font-weight: 700;
  }
  .btn-save {
    background-color: black;
    color: white;
    padding: 0.5rem 1.5rem;
    border-radius: 0.8rem;
    font-weight: 700;
  }

  .error-message-entered {
    display: flex;
    align-items: center;
    font-size: 1.4rem;
    color: #c13515;
    margin-top: 1rem;
  }
`;

type Coordinates = {
  lat: number;
  lng: number;
};

const defaultCenter = {
  lat: 41.3851,
  lng: 2.1734,
};

type Props = {
  toogleUpdate: any;
  setToogleUpdate: (toogleUpdate: any) => void;
};

const Location = ({ setToogleUpdate, toogleUpdate }: Props) => {
  const dispatch = useAppDispatch();
  let infowindow: any = null;
  let geocoder: any;
  const roomSelector = useAppSelector(selectRoom);
  const [markers, setMarkers] = useState<any>([]);
  const [map, setMap] = useState<any>(null);
  const [libraries] = useState<any>(["places"]);
  const [currentPosition, setCurrentPosition] =
    useState<Coordinates>(defaultCenter);
  const inputRef = useRef<HTMLInputElement>(null);
  const { room_id } = useParams();
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDzzi_VBcf2Oef6LTViLU767UPNHlnIze4",
    libraries,
  });
  const [address, setAddress] = useState<String>("");
  const [check, setCheck] = useState<boolean>(false);
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
  const handleChange = (event: ChangeEvent) => {
    let { value } = event.target as HTMLInputElement;
    if (value.length === 0) {
      setCheck(false);
    }
    setAddress(value);
  };

  const handleGetPosition = (event: KeyboardEvent | ChangeEvent) => {
    let { target } = event as ChangeEvent<HTMLInputElement>;
    let { keyCode } = event as KeyboardEvent<HTMLInputElement>;
    let request = {
      query: target.value,
      fields: ["name", "geometry"],
    };
    if (event.type === "keydown") {
      if (keyCode === 13) {
        let service = new google.maps.places.PlacesService(map);
        service.findPlaceFromQuery(request, (results: any, status) => {
          if (status === "OK") {
            setCheck(true);
          } else {
            setCheck(false);
          }
          clearMarker();
          if (status === google.maps.places.PlacesServiceStatus.OK && results) {
            setAddress(target.value);
            createMarker(results[0]);
          }
        });
      }
    } else {
      let service = new google.maps.places.PlacesService(map);
      service.findPlaceFromQuery(request, (results: any, status) => {
        if (status === "OK") {
          setCheck(true);
        } else {
          setCheck(false);
        }
        clearMarker();
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          setAddress(target.value);
          createMarker(results[0]);
        }
      });
    }
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
          setCheck(true);
          map.panTo(currentPosition);
          setAddress(response.results[0].formatted_address);
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

  const handleSave = async () => {
    try {
      let res = await dispatch(updateRoomAsync({ address, room_id }));
      let { status } = res.payload.data;
      if (status) {
        Swal.fire({
          position: "center",
          icon: status,
          title: "Cập nhật vị trí nhà/phòng thành công",
          showConfirmButton: false,
          timer: 1500,
        }).then((result) => {
          if (status === "success") {
            dispatch(setRoom({ ...roomSelector.room, address }));
            setToogleUpdate({ ...toogleUpdate, locationToggle: false });
          }
        });
      }
    } catch (err) {
      console.log(err);
    }
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

  const handleClose = () => {
    setToogleUpdate({ ...toogleUpdate, locationToggle: false });
  };
  return (
    <LocationStyles>
      <div className="homeUpdate__address--main">
        <div className="homeUpdate__info">
          <h2 className="homeUpdate__title">Địa chỉ</h2>
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
                  onBlur={handleGetPosition}
                  onKeyDown={handleGetPosition}
                  onChange={handleChange}
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
              mapContainerStyle={{
                height: "40rem",
                width: "100%",
                flexShrink: "0",
              }}
              zoom={13}
              center={currentPosition}
            ></GoogleMap>
          </div>
        </div>
        <button className="homeUpdate__close" onClick={handleClose}>
          <i className="fa-regular fa-x"></i>
        </button>
      </div>
      <div className="homeUpdate__address--footer">
        <button onClick={handleClose} className="btn-close">
          Hủy
        </button>
        <button
          onClick={handleSave}
          className={`btn-save ${!check ? "btn-not-allow" : ""}`}
          disabled={!check}
        >
          Lưu
        </button>
      </div>
    </LocationStyles>
  );
};

export default Location;
