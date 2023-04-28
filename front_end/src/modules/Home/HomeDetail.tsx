import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import styled from "styled-components";
import { format, addDays } from "date-fns";
import HomeHeaderRouter from "./HomeHeaderRouter";
import Calendar from "../../components/calendar/Calendar";
import Dropdown from "../../components/dropdown/Dropdown";
import MapContainer from "../../components/google_map/MapContainer";
import { useAppDispatch } from "../../app/hooks";
import {
  findImageByHomeId,
  findRoomByIdAsync,
  findServiceByHomeId,
} from "../../services/room.service";
import { Datepicker, getJson, localeVi } from "@mobiscroll/react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { fommatCurrency } from "../../configs/formatCurrency";
import { findContractsAsync } from "../../services/contract.service";

const HomeDetailStyles = styled.div`
  .home {
    &-title {
      padding-top: 2rem;
      font-size: 4rem;
      font-weight: 700;
    }
    &-thumb {
      display: flex;
      border-radius: 3rem;
      overflow: hidden;
      max-height: 47rem;
      &-main {
        max-width: 100%;
        height: inherit;
      }
      &-list {
        transform: translateY(-1rem);
        margin-left: 1rem;
        display: flex;
        flex-direction: column;
      }
      &-item {
        max-width: 75rem;
        margin-top: 1rem;
        height: calc(100% / 3);
      }
    }
    &-info {
      max-width: 80rem;
      &__title {
        font-weight: 700;
        font-size: 2.4rem;
      }
      &__desc {
        margin-top: 1rem;
        font-weight: 500;
        color: black;
      }
      &__services {
        font-size: 1.8rem;
        font-weight: 600;
        &--item {
          width: calc(100% / 2 - 10rem);
          margin-top: 2rem;
        }
      }
    }
    &-booking {
      max-width: 112rem;
      min-width: 36.5rem;
      margin-left: 7rem;
      max-height: 100vh;
      padding: 2rem;
      border: 1px solid rgb(221, 221, 221);
      border-radius: 2rem;
      .btn-booking-submit {
        margin-top: 2rem;
        width: 100%;
        display: block;
        text-align: center;
        padding: 1.5rem 0;
        border-radius: 0.8rem;
        background-color: #316bff;
        color: white;
        font-weight: 500;
      }
      &__price-room {
        font-size: 2rem;
        font-weight: 600;
      }
      .calendar_check_in_out {
        width: 100%;
        border: 1px solid gray;
        border-radius: 1rem;
        position: relative;
        & .calendar-range {
          background-color: white;
          position: absolute;
          z-index: 99;
          top: 100%;
          left: 50%;
          transform: translate(-50%, 1%);
        }
      }
      &-checkinout {
        width: 50%;
        min-height: 5.6rem;
        font-size: 1.4rem;
        font-weight: 600;
        padding-left: 2rem;
        &:last-child {
          border-left: 1px solid gray;
        }
      }
      .booking-p {
        margin: 1rem 0;
        font-size: 1.5rem;
        font-weight: 600;
      }
      .total-money-room {
        margin-top: 1rem;
        font-size: 1.6rem;
        font-weight: 600;
        color: #0000009d;
      }
      .money-service {
        &-item {
          margin-top: 1rem;
          display: flex;
          justify-content: space-between;
          font-size: 1.6rem;
          font-weight: 600;
          color: #0000009d;
        }
      }
      .total_money_all {
        border-top: 1px solid #e1e1e1;
        margin-top: 2rem;
        padding-top: 2rem;
        font-weight: 600;
      }
    }
    &-map {
      &-title {
        font-weight: 600;
        font-size: 2.6rem;
        margin-bottom: 2rem;
      }
    }
  }

  .dropdown-item {
    &__title {
      font-weight: 700;
    }
    &__desc {
      font-size: 1.4rem;
    }
  }
  .attention-title {
    margin-top: 2rem;
    font-size: 1.3rem;
  }

  .not-allow-booking {
    background-color: #316bff8c !important;
    cursor: not-allowed;
  }
`;

type NameObject = "numberOfAdults" | "numberOfChildrens" | "numberOfInfants";

const HomeDetail = () => {
  const google = window.google;
  const { room_id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [openDate, setOpenDate] = useState<boolean>(false);
  const [home, setHome] = useState<any>();
  const [listImage, setListImage] = useState<any>([]);
  const [services, setServices] = useState<any>([]);
  const [date, setDate] = useState<any>([]);
  const [multipleInvalid, setMultipleInvalid] = React.useState([]);
  const [map, setMap] = useState<any>(null);
  const [libraries] = useState<any>(["places"]);
  const [total, setTotal] = useState<any>({
    totalDay: 0,
    totalGuest: 1,
  });
  const [data, setData] = useState<any>({
    checkin: null,
    checkout: null,
    numberOfAdults: 1,
    numberOfChildrens: 0,
    numberOfInfants: 0,
  });
  let infowindow: any = null;
  const [markers, setMarkers] = useState<any>([]);

  // const onPageLoadingMultiple = React.useCallback((event: any, inst: any) => {
  //   getBookings(event.firstDay, (bookings: any) => {
  //     setMultipleInvalid(bookings.invalid);
  //   });
  // }, []);

  const handleClickUp = (name: NameObject) => {
    setData({ ...data, [name]: data[name] + 1 });
    if (name !== "numberOfInfants") {
      setTotal({ ...total, totalGuest: total.totalGuest + 1 });
    }
  };
  const handleClickDown = (name: NameObject) => {
    setData({ ...data, [name]: data[name] - 1 });
    if (name !== "numberOfInfants") {
      setTotal({ ...total, totalGuest: total.totalGuest - 1 });
    }
  };

  const handleChange = useCallback((ev: any) => {
    if (ev.value[0] && ev.value[1]) {
      let dayDiff = Math.round(
        Math.abs(ev.value[0] - ev.value[1]) / (1000 * 60 * 60 * 24)
      );
      setTotal({ ...total, totalDay: dayDiff });
      setOpenDate(false);
    } else {
      setTotal({ ...total, totalDay: 0 });
    }
    setDate([ev.value[0], ev.value[1]]);
    setData({
      ...data,
      checkin: format(new Date(ev.value[0]), "yyyy-MM-dd"),
      checkout: format(new Date(ev.value[1]), "yyyy-MM-dd"),
    });
  }, []);

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

  useEffect(() => {
    Promise.all([
      dispatch(findRoomByIdAsync(room_id!)),
      dispatch(findImageByHomeId(room_id!)),
      dispatch(findServiceByHomeId(room_id!)),
    ]).then((res) => {
      const { home } = res[0].payload.data;
      setHome(home);
      const { images } = res[1].payload.data;
      setListImage(images);
      const { service } = res[2].payload.data;
      setServices(service);
    });

    dispatch(findContractsAsync({ status: 1, home_id: room_id }))
      .then((res) => {
        let { contracts } = res.payload.data;
        let invalidDay = contracts.map((item: any, index: number) => {
          return {
            start: item.checkin,
            end: item.checkout,
          };
        });
        setMultipleInvalid(invalidDay);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (isLoaded && map) {
      const request = {
        query: home?.address,
        fields: ["name", "geometry"],
      };

      const service = new google.maps.places.PlacesService(map);
      if (service) {
        service.findPlaceFromQuery(request, (results: any, status) => {
          console.log(results);
          clearMarker();

          if (status === google.maps.places.PlacesServiceStatus.OK && results) {
            createMarker(results[0]);
          }
        });
      }
    }
  }, [home, isLoaded, map]);

  return (
    <HomeDetailStyles>
      <div className="container">
        <HomeHeaderRouter>
          <Link to="/">Trang chủ {">"}</Link>{" "}
          <Link to="/">Danh sách các căn nhà {">"}</Link>{" "}
          <span>Chi tiết phòng</span>
        </HomeHeaderRouter>
        <div className="home-body">
          <h2 className="home-title">{home?.title}</h2>
          <div className="home-rate-location flex items-center">
            <div className="room_content__rate-star mr-2">
              <i className="fa-solid fa-star" style={{ color: "#ffc542" }}></i>{" "}
              <span>4.8</span> (122 đánh giá)
            </div>
            <div className="room-location ml-10">
              <svg
                width="17"
                height="20"
                viewBox="0 0 17 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.2522 0C6.13047 0 4.09563 0.842855 2.59534 2.34315C1.09505 3.84344 0.252197 5.87827 0.252197 8C0.252197 13.4 7.3022 19.5 7.6022 19.76C7.78333 19.9149 8.01384 20.0001 8.2522 20.0001C8.49055 20.0001 8.72106 19.9149 8.9022 19.76C9.2522 19.5 16.2522 13.4 16.2522 8C16.2522 5.87827 15.4093 3.84344 13.9091 2.34315C12.4088 0.842855 10.3739 0 8.2522 0ZM8.2522 17.65C6.1222 15.65 2.2522 11.34 2.2522 8C2.2522 6.4087 2.88434 4.88258 4.00956 3.75736C5.13478 2.63214 6.6609 2 8.2522 2C9.8435 2 11.3696 2.63214 12.4948 3.75736C13.6201 4.88258 14.2522 6.4087 14.2522 8C14.2522 11.34 10.3822 15.66 8.2522 17.65ZM8.2522 4C7.46107 4 6.68771 4.2346 6.02992 4.67412C5.37212 5.11365 4.85943 5.73836 4.55668 6.46927C4.25393 7.20017 4.17471 8.00444 4.32906 8.78036C4.4834 9.55628 4.86436 10.269 5.42377 10.8284C5.98318 11.3878 6.69591 11.7688 7.47184 11.9231C8.24776 12.0775 9.05203 11.9983 9.78293 11.6955C10.5138 11.3928 11.1385 10.8801 11.5781 10.2223C12.0176 9.56448 12.2522 8.79113 12.2522 8C12.2522 6.93913 11.8308 5.92172 11.0806 5.17157C10.3305 4.42143 9.31306 4 8.2522 4ZM8.2522 10C7.85663 10 7.46996 9.8827 7.14106 9.66294C6.81216 9.44318 6.55581 9.13082 6.40444 8.76537C6.25306 8.39991 6.21346 7.99778 6.29063 7.60982C6.3678 7.22186 6.55828 6.86549 6.83798 6.58579C7.11769 6.30608 7.47405 6.1156 7.86202 6.03843C8.24998 5.96126 8.65211 6.00087 9.01756 6.15224C9.38302 6.30362 9.69537 6.55996 9.91514 6.88886C10.1349 7.21776 10.2522 7.60444 10.2522 8C10.2522 8.53043 10.0415 9.03914 9.66641 9.41421C9.29134 9.78929 8.78263 10 8.2522 10Z"
                  fill="#84878B"
                />
              </svg>
              <h2 className="room-location-title">{home?.address}</h2>
            </div>
          </div>
          <div className="home-thumb">
            <div className="home-thumb-main">
              <img src={home?.image_main} alt="" />
            </div>
            <div className="home-thumb-list">
              {listImage.map((item: any, index: number) => (
                <div className="home-thumb-item" key={item.id}>
                  <img src={item?.url} alt="" />
                </div>
              ))}
            </div>
          </div>
          <div className="home-content flex justify-between mt-16">
            <div className="home-info">
              <h2 className="home-info__title">Mô tả</h2>
              <p className="home-info__desc">{home?.description}</p>
              <h2 className="home-info__title mt-10">
                Nơi này có những gì cho bạn
              </h2>
              <div className="home-info__services flex flex-wrap">
                {services.map((item: any, key: number) => (
                  <div
                    className="home-info__services--item flex items-center mr-24"
                    key={item.id}
                  >
                    <i className={item?.icon_service}></i>
                    <h3 className="home-info__services--title ml-5">
                      {item?.name}
                    </h3>
                  </div>
                ))}
              </div>
            </div>
            <div className="home-booking">
              <div className="group flex justify-between items-center mb-5">
                <div className="home-booking__price-room">
                  {fommatCurrency("vi-VN", "VND").format(home?.price)}{" "}
                  <small>/đêm</small>
                </div>
                <div>Tối thiểu {home?.minimumTime} đêm</div>
              </div>

              <div
                onClick={() => setOpenDate(!openDate)}
                className="calendar_check_in_out flex mr-10 cursor-pointer"
              >
                <div className="home-booking-checkinout flex items-center">
                  <div className="home-booking-content cursor-pointer">
                    <label htmlFor="check-in">Nhận phòng</label>
                    <div className="home-booking-info">
                      {date[0]
                        ? format(new Date(date[0]), "dd/MM/yyyy")
                        : "Chọn ngày"}
                    </div>
                  </div>
                </div>
                <div className="home-booking-checkinout flex items-center">
                  <div className="home-booking-content cursor-pointer">
                    <label htmlFor="check-out">Trả phòng</label>
                    <div className="home-booking-info">
                      {date[1]
                        ? format(new Date(date[1]), "dd/MM/yyyy")
                        : "Chọn ngày"}
                    </div>
                  </div>
                </div>
                <div
                  onClick={(event) => event.stopPropagation()}
                  className={`calendar-range ${openDate ? "" : "hidden"}`}
                >
                  <Datepicker
                    theme="ios"
                    themeVariant="light"
                    dateFormat="DD-MM-YYYY"
                    select="range"
                    display="inline"
                    touchUi={false}
                    onChange={handleChange}
                    rangeStartLabel="Ngày đến"
                    rangeEndLabel="Ngày trả"
                    locale={localeVi}
                    min={new Date(new Date().getTime() + 1 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10)}
                    // min={Date.now}
                    minRange={home?.minimumTime}
                    maxRange={home?.maximumTime}
                    width={`200px`}
                    rangeHighlight={true}
                    controls={["calendar"]}
                    invalid={multipleInvalid}
                    //onPageLoading={onPageLoadingMultiple}
                  />
                </div>
              </div>
              <Dropdown
                labelHeader="Khách"
                labelName={`${total.totalGuest} khách${
                  data.numberOfInfants > 0
                    ? `, ${data.numberOfInfants} em bé`
                    : ""
                }`}
              >
                <div className="dropdown__content--item-style-2 ">
                  <div className="group flex items-center justify-between">
                    <div className="group">
                      <h3 className="dropdown-item__title">Người lớn</h3>
                      <p className="dropdown-item__desc">Từ 13 tuổi trở lên</p>
                    </div>
                    <div className="dropdown-info flex items-center">
                      <button
                        type="button"
                        disabled={!(data.numberOfAdults !== 1)}
                        className={`btn btn-tool btn-decrease ${
                          data.numberOfAdults !== 1 ? " " : "not-allow"
                        }`}
                        onClick={() => handleClickDown("numberOfAdults")}
                      >
                        <i className="fa-regular fa-minus"></i>
                      </button>

                      <span className="quantity">{data.numberOfAdults}</span>

                      <button
                        type="button"
                        disabled={!(total.totalGuest < home?.max_passenger)}
                        className={`btn btn-tool btn-increase ${
                          total.totalGuest < home?.max_passenger
                            ? " "
                            : "not-allow"
                        }`}
                        onClick={() => handleClickUp("numberOfAdults")}
                      >
                        <i className="fa-regular fa-plus"></i>
                      </button>
                    </div>
                  </div>
                  <div className="group flex items-center justify-between mt-7">
                    <div className="group">
                      <h3 className="dropdown-item__title">Trẻ em</h3>
                      <p className="dropdown-item__desc">Độ tuổi 2 - 12</p>
                    </div>
                    <div className="dropdown-info flex items-center">
                      <button
                        type="button"
                        disabled={!(data.numberOfChildrens > 0)}
                        className={`btn btn-tool btn-decrease ${
                          data.numberOfChildrens > 0 ? " " : "not-allow"
                        }`}
                        onClick={() => handleClickDown("numberOfChildrens")}
                      >
                        <i className="fa-regular fa-minus"></i>
                      </button>

                      <span className="quantity">{data.numberOfChildrens}</span>

                      <button
                        type="button"
                        disabled={!(total.totalGuest < home?.max_passenger)}
                        className={`btn btn-tool btn-increase ${
                          total.totalGuest < home?.max_passenger
                            ? " "
                            : "not-allow"
                        }`}
                        onClick={() => handleClickUp("numberOfChildrens")}
                      >
                        <i className="fa-regular fa-plus"></i>
                      </button>
                    </div>
                  </div>
                  <div className="group flex items-center justify-between mt-7">
                    <div className="group">
                      <h3 className="dropdown-item__title">Em bé</h3>
                      <p className="dropdown-item__desc">Dưới 2 tuổi</p>
                    </div>
                    <div className="dropdown-info flex items-center">
                      <button
                        type="button"
                        disabled={!(data.numberOfInfants > 0)}
                        className={`btn btn-tool btn-decrease ${
                          data.numberOfInfants > 0 ? "" : "not-allow"
                        }`}
                        onClick={() => handleClickDown("numberOfInfants")}
                      >
                        <i className="fa-regular fa-minus"></i>
                      </button>

                      <span className="quantity">{data.numberOfInfants}</span>
                      <button
                        type="button"
                        disabled={!(data.numberOfInfants < 5)}
                        className={`btn btn-tool btn-increase ${
                          data.numberOfInfants < 5 ? "" : "not-allow"
                        }`}
                        onClick={() => handleClickUp("numberOfInfants")}
                      >
                        <i className="fa-regular fa-plus"></i>
                      </button>
                    </div>
                  </div>
                  <p className="attention-title">
                    Chỗ ở này cho phép tối đa {home?.max_passenger} khách, không
                    tính em bé. Không được phép mang theo thú cưng.
                  </p>
                </div>
              </Dropdown>

              <button
                className={`btn btn-booking-submit ${
                  !total?.totalDay ? "not-allow-booking" : ""
                }`}
                onClick={() =>
                  navigate(
                    `/book/stays/${room_id}?numberOfAdults=${data.numberOfAdults}&numberOfChildrens=${data.numberOfChildrens}&numberOfInfants=${data.numberOfInfants}&checkin=${data.checkin}&checkout=${data.checkout}`
                  )
                }
                disabled={!total?.totalDay}
              >
                Đặt phòng
              </button>

              {total?.totalDay ? (
                <>
                  <div className="text-center booking-p">
                    Bạn vẫn chưa bị trừ tiền
                  </div>
                  <div className="total-money-room flex justify-between">
                    <div className="total-money-room__title">
                      {fommatCurrency("vi-VN", "VND").format(home?.price)} x{" "}
                      {total.totalDay}
                    </div>
                    <div className="total-money-room__price">
                      {fommatCurrency("vi-VN", "VND").format(
                        Number(home?.price) * Number(total.totalDay)
                      )}
                    </div>
                  </div>
                  <div className="total_money_all flex justify-between">
                    <div className="total-money-room__title">Tổng tiền</div>
                    <div className="total-money-room__price">
                      {fommatCurrency("vi-VN", "VND").format(
                        Number(home?.price) * Number(total.totalDay)
                      )}
                    </div>
                  </div>
                </>
              ) : null}
            </div>
          </div>
          <div className="home-map">
            <h2 className="home-map-title mt-16">Nơi bạn sẽ đến</h2>
            {isLoaded && home && (
              <GoogleMap
                onLoad={(map) => setMap(map)}
                mapContainerStyle={{ height: "50rem", width: "100%" }}
                zoom={13}
              ></GoogleMap>
            )}
          </div>
        </div>
      </div>
    </HomeDetailStyles>
  );
};

export default HomeDetail;
