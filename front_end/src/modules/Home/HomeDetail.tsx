import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { format, addDays } from "date-fns";
import HomeHeaderRouter from "./HomeHeaderRouter";
import { Formik, Form } from "formik";
import Calendar from "../../components/calendar/Calendar";
import Dropdown from "../../components/dropdown/Dropdown";
import MapContainer from "../../components/google_map/MapContainer";
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
        margin-bottom: 2rem;
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
`;

type Range = {
  startDate: Date;
  endDate: Date;
  key: string;
};

interface IHomeBooking {
  searchLocation: string;
}

const initialValues: IHomeBooking = {
  searchLocation: "",
};

const HomeDetail = () => {
  const [openDate, setOpenDate] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(1);
  const [date, setDate] = useState<[Range]>([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);
  let numberDate = useRef<number>(
    (date[0]?.endDate.getTime() - date[0].startDate.getTime()) /
      (1000 * 3600 * 24) +
      1
  );

  useEffect(() => {
    numberDate.current =
      (date[0]?.endDate.getTime() - date[0].startDate.getTime()) /
        (1000 * 3600 * 24) +
      1;
  }, [date]);
  const handleClickDown = () => {
    setQuantity((quantity) => quantity - 1);
  };
  const handleClickUp = () => {
    setQuantity((quantity) => quantity + 1);
  };
  return (
    <HomeDetailStyles>
      <div className="container">
        <HomeHeaderRouter>
          <Link to="/">Trang chủ {">"}</Link>{" "}
          <Link to="/">Danh sách các căn nhà {">"}</Link>{" "}
          <span>Chi tiết phòng</span>
        </HomeHeaderRouter>
        <div className="home-body">
          <h2 className="home-title">Santorini Hạ Long Villa</h2>
          <div className="home-rate-location flex items-center">
            <div className="room_content__rate-star mr-2">
              <i className="fa-solid fa-star" style={{ color: "#ffc542" }}></i>{" "}
              <span>4.8</span> (122 reviews)
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
              <h2 className="room-location-title">
                Thành phố Đà Nẵng, Việt Nam
              </h2>
            </div>
          </div>
          <div className="home-thumb">
            <div className="home-thumb-main">
              <img
                src="https://a0.muscache.com/im/pictures/c0b5943a-9c0c-449c-ab3b-cf148b8471c3.jpg?im_w=1200"
                alt=""
              />
            </div>
            <div className="home-thumb-list">
              <div className="home-thumb-item">
                <img
                  src="https://a0.muscache.com/im/pictures/9df73161-3743-4cdb-bc98-864e408af6f0.jpg?im_w=720"
                  alt=""
                />
              </div>
              <div className="home-thumb-item">
                <img
                  src="https://a0.muscache.com/im/pictures/6713071b-519d-49ad-bc64-76db60d8de9d.jpg?im_w=720"
                  alt=""
                />
              </div>
              <div className="home-thumb-item">
                <img
                  src="https://a0.muscache.com/im/pictures/788ec8d8-fdd2-4c45-b6ed-a8b44d98a8df.jpg?im_w=720"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="home-content flex mt-16">
            <div className="home-info">
              <h2 className="home-info__title">Mô tả</h2>
              <p className="home-info__desc">
                Arabian Park Hotel is a great choice for travellers looking for
                a 3 star hotel in Dubai. It is located in Bur Dubai. This Hotel
                stands out as one of the highly recom.2 kms), Al Wasl Indoor
                Stadium (1.2 kms), Dubai Mall (5.4 kms), Jumeirah Beach Park
                (9.6 kms) and Jumeirah Public Beach (15.8 kms).
              </p>
              <h2 className="home-info__title">Nơi này có những gì cho bạn</h2>
              <div className="home-info__services">
                <div className="home-info__services--item flex flex-wrap items-center">
                  <i className="fa-regular fa-flower-tulip home-info__services--icon"></i>
                  <h3 className="home-info__services--title ml-5">
                    Hướng nhìn ra vườn
                  </h3>
                </div>
                <div className="home-info__services--item flex flex-wrap items-center">
                  <i className="fa-regular fa-flower-tulip home-info__services--icon"></i>
                  <h3 className="home-info__services--title ml-5">
                    Hướng nhìn ra vườn
                  </h3>
                </div>
                <div className="home-info__services--item flex flex-wrap items-center">
                  <i className="fa-regular fa-flower-tulip home-info__services--icon"></i>
                  <h3 className="home-info__services--title ml-5">
                    Hướng nhìn ra vườn
                  </h3>
                </div>
                <div className="home-info__services--item flex flex-wrap items-center">
                  <i className="fa-regular fa-flower-tulip home-info__services--icon"></i>
                  <h3 className="home-info__services--title ml-5">
                    Hướng nhìn ra vườn
                  </h3>
                </div>
              </div>
            </div>
            <div className="home-booking">
              <div className="home-booking__price-room">
                1200000 VNĐ <small>/đêm</small>
              </div>
              <Formik
                initialValues={initialValues}
                onSubmit={(values, actions) => {
                  console.log({ values, actions });
                }}
              >
                <Form>
                  <div
                    onClick={() => setOpenDate(!openDate)}
                    className="calendar_check_in_out flex mr-10"
                  >
                    <div className="home-booking-checkinout flex items-center">
                      <div className="home-booking-content">
                        <label htmlFor="check-in">Nhận phòng</label>
                        <div className="home-booking-info">
                          {format(date[0].startDate, "dd/MM/yyyy")}
                        </div>
                      </div>
                    </div>
                    <div className="home-booking-checkinout flex items-center">
                      <div className="home-booking-content">
                        <label htmlFor="check-in">Trả phòng</label>
                        <div className="home-booking-info">
                          {format(date[0].endDate, "dd/MM/yyyy")}
                        </div>
                      </div>
                    </div>
                    {openDate ? (
                      <div className="calendar-range">
                        <Calendar date={date} setDate={setDate}></Calendar>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <Dropdown labelHeader="Khách" labelName={`${quantity} khách`}>
                    <div className="dropdown__content--item-style-2 flex items-center justify-between">
                      <h3 className="drowdown-item__title">Khách</h3>
                      <div className="dropdown-info flex items-center">
                        {quantity !== 1 ? (
                          <button
                            type="button"
                            className="btn btn-tool btn-decrease"
                            onClick={handleClickDown}
                          >
                            <i className="fa-regular fa-minus"></i>
                          </button>
                        ) : null}
                        <span className="quantity">{quantity}</span>
                        <button
                          type="button"
                          className="btn btn-tool btn-increase"
                          onClick={handleClickUp}
                        >
                          <i className="fa-regular fa-plus"></i>
                        </button>
                      </div>
                    </div>
                  </Dropdown>

                  <button className="btn btn-booking-submit" type="submit">
                    Đặt phòng
                  </button>
                  <div className="text-center booking-p">
                    Bạn vẫn chưa bị trừ tiền
                  </div>
                  <div className="total-money-room flex justify-between">
                    <div className="total-money-room__title">
                      1200000 VNĐ x {numberDate.current}
                    </div>
                    <div className="total-money-room__price">$525</div>
                  </div>
                  <ul className="money-service-list">
                    <li className="money-service-item">
                      <div className="money-service-item__title">
                        Phí vệ sinh
                      </div>
                      <div className="money-service-item__price">$21</div>
                    </li>
                    <li className="money-service-item">
                      <div className="money-service-item__title">
                        Phí dịch vụ
                      </div>
                      <div className="money-service-item__price">$77</div>
                    </li>
                  </ul>
                  <div className="total_money_all flex justify-between">
                    <div className="total-money-room__title">Tổng tiền</div>
                    <div className="total-money-room__price">$525</div>
                  </div>
                </Form>
              </Formik>
            </div>
          </div>
          <div className="home-map">
            <h2 className="home-map-title">Nơi bạn sẽ đến</h2>
            <MapContainer></MapContainer>
          </div>
        </div>
      </div>
    </HomeDetailStyles>
  );
};

export default HomeDetail;
