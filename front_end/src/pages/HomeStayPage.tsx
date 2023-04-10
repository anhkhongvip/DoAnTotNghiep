import { Datepicker, localeVi } from "@mobiscroll/react";
import React, { useState, useEffect } from "react";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import styled from "styled-components";
import { useAppDispatch } from "../app/hooks";
import { findRoomByIdAsync } from "../services/room.service";
const HomeStayPageStyles = styled.div`
  .homestay {
    margin-top: 5rem;
    &-back {
      font-size: 3rem;
      font-weight: 500;
      margin-right: 1.5rem;
    }
    &-info {
      width: calc(100% / 2 - 10rem);
    }
    &-title {
      font-size: 3rem;
      font-weight: bold;
      &-sm {
        margin-top: 2rem;
        font-size: 2.2rem;
        font-weight: bold;
      }
    }
    &-content {
      &__item {
        margin-top: 2rem;
        &--title {
          font-weight: bold;
        }
      }
    }
    .btn-edit {
      font-weight: bold;
      text-decoration: underline;
    }
    .passenger {
      &-update {
        margin-top: 2rem;
        border-radius: 0.8rem;
        border: 1px solid #8080804f;
      }
      &-main {
        width: calc(100% / 2);
      }
      &-title {
        font-weight: 700;
      }
      &-desc {
        font-size: 1.2rem;
        font-weight: 600;
        color: gray;
        margin-bottom: 2rem;
      }
      &-info {
        padding: 1.5rem 1.5rem;
      }
      &-footer {
        border-top: 1px solid #8080804f;
        display: flex;
        justify-content: space-between;
        padding: 1.5rem 2rem;
      }
    }

    .btn-down,
    .btn-up {
      width: 3.5rem;
      height: 3.5rem;
      line-height: 3.5rem;
      text-align: center;
      color: gray;
      border: 1px solid gray;
      border-radius: 3.5rem;
      &.not-allow {
        cursor: not-allowed;
        color: transparent !important;
        border-color: transparent !important;
        &:hover {
          color: transparent !important;
          border-color: transparent !important;
        }
      }
    }
    .btn-down:hover,
    .btn-up:hover {
      transition: 0.2s linear;
      border-color: black;
      color: black;
    }

    .item {
      &-group {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 2rem;
      }
      &-title {
        color: #404040;
        font-weight: bold;
      }
      &-desc {
        font-size: 1.4rem;
      }
      &-count {
        display: flex;
        align-items: center;
        .amount {
          padding: 0 1.5rem;
        }
      }
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
  }
`;
type NameObject = "numberOfAdults" | "numberOfChildrens" | "numberOfInfants";

const HomeStayPage = () => {
  const [toggleUpdate, setToggleUpdate] = useState({
    togglePicker: false,
    togglePassenger: false,
  });
  const { room_id } = useParams();
  const [data, setData] = useState<any>({
    numberOfAdults: 1,
    numberOfChildrens: 0,
    numberOfInfants: 0,
    checkin: "2023-04-16",
    checkout: "2023-04-23",
  });
  const [home, setHome] = useState<any>();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [total, setTotal] = useState<any>({
    totalDay: 0,
    totalGuest: 1,
  });

  useEffect(() => {
    dispatch(findRoomByIdAsync(room_id!))
      .then((res) => {
        const { home } = res.payload.data;
        setHome(home);
      })
      .catch((err) => {
        console.log(err);
      });
    let cloneObj: any = {};
    let dayDiff = Math.round(
      Math.abs(Date.parse(searchParams.get('checkin')!) - Date.parse(searchParams.get('checkout')!)) / (1000 * 60 * 60 * 24)
    );
    searchParams.forEach((value, key) => {
      cloneObj = { ...cloneObj, [key]: value };
    });
    setData(cloneObj);
    setTotal({
      ...total,
      totalDay: dayDiff,
      totalGuest:
        Number(searchParams.get("numberOfAdults")) +
        Number(searchParams.get("numberOfChildrens")) +
        Number(searchParams.get("numberOfInfants")),
    });
  }, []);
  const handleClickUp = (name: NameObject) => {
    setData({ ...data, [name]: Number(data[name]) + 1 });
    if (name !== "numberOfInfants") {
      setTotal({ ...total, totalGuest: total.totalGuest + 1 });
    }
  };
  const handleClickDown = (name: NameObject) => {
    setData({ ...data, [name]: Number(data[name]) - 1 });
    if (name !== "numberOfInfants") {
      setTotal({ ...total, totalGuest: total.totalGuest - 1 });
    }
  };

  const handleSave = () => {
    setSearchParams(data);
    setToggleUpdate({ ...toggleUpdate, togglePassenger: false });
  };
  const handleClose = () => {
    let cloneObj: any = {};
    searchParams.forEach((value, key) => {
      cloneObj = { ...cloneObj, [key]: value };
    });
    setData(cloneObj);
    setToggleUpdate({ ...toggleUpdate, togglePassenger: false });
  };

  return (
    <HomeStayPageStyles>
      <div className="container">
        <div className="homestay flex justify-between">
          <div className="homestay-info">
            <h2 className="homestay-title">
              <button onClick={() => navigate(-1)} className="homestay-back">
                {"<"}
              </button>
              Yêu cầu đặt phòng/đặt chỗ - {total.totalDay}
            </h2>
            <h4 className="homestay-title-sm">Chuyến đi của bạn</h4>
            <div className="homestay-content">
              <div className="homestay-content__item flex justify-between items-start">
                <div className="group">
                  <div className="homestay-content__item--title">Ngày</div>
                  <div className="homestay-content__item--desc">
                    Ngày 08 - Ngày 14 tháng 4
                  </div>
                  <div className="date-booking hidden">
                    <Datepicker
                      theme="ios"
                      display="center"
                      themeVariant="light"
                      dateFormat="DD-MM-YYYY"
                      controls={["calendar"]}
                      select="range"
                      rangeStartLabel="Ngày đến"
                      rangeEndLabel="Ngày trả"
                      showOnClick={false}
                      showOnFocus={false}
                      isOpen={toggleUpdate.togglePicker}
                      onClose={() =>
                        setToggleUpdate({
                          ...toggleUpdate,
                          togglePicker: false,
                        })
                      }
                      touchUi={true}
                      locale={localeVi}
                      inputComponent="input"
                    />
                  </div>
                </div>
                <button
                  className="btn-edit"
                  onClick={() =>
                    setToggleUpdate({ ...toggleUpdate, togglePicker: true })
                  }
                >
                  Chỉnh sửa
                </button>
              </div>
              {toggleUpdate.togglePassenger ? (
                <>
                  <div className="passenger-update">
                    <div className="passenger-info">
                      <h2 className="passenger-title">Khách</h2>
                      <div className="passenger-desc">
                        Chỗ ở này cho phép tối đa {home?.max_passenger} khách,
                        không tính em bé
                      </div>
                      <div className="passenger-main">
                        <div className="item-group">
                          <div className="item-title">Người lớn</div>
                          <div className="item-count">
                            <button
                              className={`btn-down ${
                                data.numberOfAdults > 1 ? " " : "not-allow"
                              }`}
                              disabled={!(data.numberOfAdults > 1)}
                              onClick={() => handleClickDown("numberOfAdults")}
                            >
                              <i className="fa-regular fa-minus"></i>
                            </button>
                            <span className="amount">
                              {data.numberOfAdults}
                            </span>
                            <button
                              className={`btn-up ${
                                total.totalGuest < home?.max_passenger
                                  ? " "
                                  : "not-allow"
                              }`}
                              disabled={
                                !(total.totalGuest < home?.max_passenger)
                              }
                              onClick={() => handleClickUp("numberOfAdults")}
                            >
                              <i className="fa-regular fa-plus"></i>
                            </button>
                          </div>
                        </div>
                        <div className="item-group">
                          <div className="group">
                            <div className="item-title">Trẻ em</div>
                            <div className="item-desc">Độ tuổi 2 - 12</div>
                          </div>
                          <div className="item-count">
                            {data.numberOfChildrens > 0 && (
                              <button
                                className={`btn-down ${
                                  data.numberOfChildrens > 0 ? " " : "not-allow"
                                }`}
                                disabled={!(data.numberOfChildrens > 0)}
                                onClick={() =>
                                  handleClickDown("numberOfChildrens")
                                }
                              >
                                <i className="fa-regular fa-minus"></i>
                              </button>
                            )}

                            <span className="amount">
                              {data.numberOfChildrens}
                            </span>
                            <button
                              className={`btn-up ${
                                total.totalGuest < home?.max_passenger
                                  ? " "
                                  : "not-allow"
                              }`}
                              disabled={
                                !(total.totalGuest < home?.max_passenger)
                              }
                              onClick={() => handleClickUp("numberOfChildrens")}
                            >
                              <i className="fa-regular fa-plus"></i>
                            </button>
                          </div>
                        </div>
                        <div className="item-group">
                          <div className="group">
                            <div className="item-title">Em bé</div>
                            <div className="item-desc">Dưới 2 tuổi</div>
                          </div>
                          <div className="item-count">
                            <button
                              className={`btn-down ${
                                data.numberOfInfants > 0 ? " " : "not-allow"
                              }`}
                              disabled={!(data.numberOfInfants > 0)}
                              onClick={() => handleClickDown("numberOfInfants")}
                            >
                              <i className="fa-regular fa-minus"></i>
                            </button>

                            <span className="amount">
                              {data.numberOfInfants}
                            </span>
                            <button
                              className={`btn-up ${
                                data.numberOfInfants < 5 ? " " : "not-allow"
                              }`}
                              disabled={!(data.numberOfInfants < 5)}
                              onClick={() => handleClickUp("numberOfInfants")}
                            >
                              <i className="fa-regular fa-plus"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="passenger-footer flex justify-between">
                      <button onClick={handleClose} className="btn-close">
                        Hủy
                      </button>
                      <button onClick={handleSave} className="btn-save">
                        Lưu
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="homestay-content__item flex justify-between items-start">
                  <div className="group">
                    <div className="homestay-content__item--title">Khách</div>
                    <div className="homestay-content__item--desc">
                      {total.totalGuest} khách
                    </div>
                  </div>
                  <button
                    className="btn-edit"
                    onClick={() =>
                      setToggleUpdate({
                        ...toggleUpdate,
                        togglePassenger: true,
                      })
                    }
                  >
                    Chỉnh sửa
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </HomeStayPageStyles>
  );
};

export default HomeStayPage;
