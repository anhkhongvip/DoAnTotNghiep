import { Datepicker, localeVi } from "@mobiscroll/react";
import React, { useState, useEffect, useCallback } from "react";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import styled from "styled-components";
import { useAppDispatch } from "../app/hooks";
import { findRoomByIdAsync } from "../services/room.service";
import { format, addDays } from "date-fns";
import { fommatCurrency } from "../configs/formatCurrency";
import { createContractAsync } from "../services/contract.service";
import { BouceLoading } from "../components/loading";
const HomeStayPageStyles = styled.div`
  .homestay {
    padding-bottom: 2rem;
    margin-top: 7rem;
    &-back {
      font-size: 2.2rem;
      font-weight: 500;
      margin-right: 1.5rem;
    }
    &-info {
      width: calc(100% / 2);
    }
    &-title {
      font-size: 3rem;
      font-weight: bold;
      margin-top: 5rem;
      &-sm {
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

    .general-standard {
      position: relative;
      margin-top: 2rem;
      padding-top: 2rem;
      &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        border-top: 1px solid #80808063;
      }
      &__list {
        list-style-type: disc;
        list-style-position: inside;
      }
      &__title {
        font-weight: 700;
        font-size: 2.2rem;
      }
      &__desc {
        margin: 2rem 0;
        font-weight: 600;
      }
      &__item {
        margin-top: 1rem;
        font-weight: 600;
      }
    }
    .btn-continue {
      font-weight: 600;

      background-image: linear-gradient(
        to right,
        #e61e4d 27.5%,
        #e31c5f 40%,
        #d70466 57.5%,
        #bd1e59 75%,
        #bd1e59 100%
      );
      width: 20rem;
      height: 5rem;
      color: white;
      border-radius: 0.8rem;
    }

    &-order {
      border: 1px solid #80808063;
      padding: 2rem;
      border-radius: 0.8rem;
      width: calc(100% / 2 - 10rem);
      position: sticky;
      top: 8rem;
      align-self: flex-start;
      &__image {
        width: 12.4rem;
        height: 10.6rem;
        border-radius: 0.8rem;
        overflow: hidden;
      }
      &__info-room {
        position: relative;
        &::before {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          border-top: 1px solid #80808063;
        }
      }
      &__rating-room {
        font-size: 1.4rem;
      }
      &__price {
        & .title {
          font-size: 2.4rem;
          font-weight: bold;
        }
        &-info {
          position: relative;
          font-weight: 500;
          &::before {
            content: "";
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            border-top: 1px solid #80808063;
          }
        }
      }
      &__total-money {
        font-weight: 700;
      }
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
    total_money: 0,
  });
  const [home, setHome] = useState<any>();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [total, setTotal] = useState<any>({
    totalDay: 0,
    totalGuest: 1,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    dispatch(findRoomByIdAsync(room_id!))
      .then((res) => {
        const { home } = res.payload.data;
        setHome(home);
        let cloneObj: any = {};
        let dayDiff = Math.round(
          Math.abs(
            Date.parse(searchParams.get("checkin")!) -
              Date.parse(searchParams.get("checkout")!)
          ) /
            (1000 * 60 * 60 * 24)
        );
        searchParams.forEach((value, key) => {
          cloneObj = { ...cloneObj, [key]: value };
        });
        setData({ ...cloneObj, total_money: dayDiff * home.price });
        setTotal({
          ...total,
          totalDay: dayDiff,
          totalGuest:
            Number(searchParams.get("numberOfAdults")) +
            Number(searchParams.get("numberOfChildrens")),
        });
      })
      .catch((err) => {
        console.log(err);
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
    setTotal({
      ...total,
      totalGuest:
        Number(searchParams.get("numberOfAdults")) +
        Number(searchParams.get("numberOfChildrens")),
    });
    setToggleUpdate({ ...toggleUpdate, togglePassenger: false });
  };

  function wait(time: number) {
    return new Promise((resolve) => {
      setTimeout(resolve, time);
    });
  }

  const handleChange = (ev: any) => {
    if (ev.value[0] && ev.value[1]) {
      let dayDiff = Math.round(
        Math.abs(ev.value[0] - ev.value[1]) / (1000 * 60 * 60 * 24)
      );
      console.log(data);
      
      setData({
        ...data,
        total_money: dayDiff * home?.price,
        checkin: format(new Date(ev.value[0]), "yyyy-MM-dd"),
        checkout: format(new Date(ev.value[1]), "yyyy-MM-dd"),
      });
      setTotal({ ...total, totalDay: dayDiff });
    }
  };

  const handleOrderRequest = async () => {
    try {
      setIsLoading(true);
      let res = await dispatch(createContractAsync({...data, home_id: room_id}));
      await wait(1500)
      setIsLoading(false);
      const { results } = res.payload.data;
      navigate(`/book/${room_id}/payments/${results.id}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <HomeStayPageStyles>
      <div className="container">
        <h2 className="homestay-title">
          <button onClick={() => navigate(-1)} className="homestay-back">
            {"<"}
          </button>
          Yêu cầu đặt phòng/đặt chỗ
        </h2>
        <div className="homestay flex justify-between">
          <div className="homestay-info">
            <h4 className="homestay-title-sm">Chuyến đi của bạn</h4>
            <div className="homestay-content">
              <div className="homestay-content__item flex justify-between items-start">
                <div className="group">
                  <div className="homestay-content__item--title">Ngày</div>
                  <div className="homestay-content__item--desc">
                    {
                      <>
                        Ngày {format(new Date(data.checkin), "dd")} - Ngày{" "}
                        {format(new Date(data.checkout), "dd")} tháng{" "}
                        {format(new Date(data.checkout), "M")}
                      </>
                    }
                  </div>
                  <div className="date-booking hidden">
                    <Datepicker
                      theme="ios"
                      display="center"
                      themeVariant="light"
                      dateFormat="DD-MM-YYYY"
                      controls={["calendar"]}
                      select="range"
                      onChange={handleChange}
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
                      {`${total.totalGuest} khách${
                        data.numberOfInfants > 0
                          ? `, ${data.numberOfInfants} em bé`
                          : ""
                      }`}
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

              <div className="general-standard">
                <h2 className="general-standard__title">Quy chuẩn chung</h2>
                <p className="general-standard__desc">
                  Chúng tôi yêu cầu tất cả khách phải ghi nhớ một số quy chuẩn
                  đơn giản để làm một vị khách tuyệt vời.
                </p>
                <ul className="general-standard__list">
                  <li className="general-standard__item">
                    <span>Tuân thủ nội quy nhà</span>
                  </li>
                  <li className="general-standard__item">
                    <span>Giữ gìn ngôi nhà như thể đó là nhà bạn</span>
                  </li>
                </ul>
              </div>

              <button
                className="btn btn-continue mt-16"
                onClick={handleOrderRequest}
                disabled={isLoading}
              >
                {isLoading ? (
                  <BouceLoading dotNumber={3} bgColor="#ffff"/>
                ) : (
                  "Yêu cầu đặt phòng"
                )}
              </button>
            </div>
          </div>
          <div className="homestay-order">
            <div className="group flex pb-8 homestay-order__info-room">
              <div className="homestay-order__image">
                <img src={home?.image_main} alt="" />
              </div>
              <div className="group flex flex-col justify-between ml-5">
                <h2 className="title">{home?.title}</h2>

                <div className="homestay-order__rating-room">
                  <i className="fa-solid fa-star"></i> Mới
                </div>
              </div>
            </div>
            <div className="homestay-order__price mt-12">
              <h2 className="title">Chi tiết giá</h2>
              <div className="group flex justify-between homestay-order__price-info pb-8 pt-6">
                <span>
                  {fommatCurrency("vi-VN", "VND").format(Number(home?.price))} x{" "}
                  {total.totalDay} đêm
                </span>
                <span>
                  {fommatCurrency("vi-VN", "VND").format(
                    Number(home?.price) * Number(total.totalDay)
                  )}
                </span>
              </div>
              <div className="group flex justify-between homestay-order__total-money mt-10">
                <span>Tổng tiền </span>
                <span>
                  {fommatCurrency("vi-VN", "VND").format(
                    Number(home?.price) * Number(total.totalDay)
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </HomeStayPageStyles>
  );
};

export default HomeStayPage;
