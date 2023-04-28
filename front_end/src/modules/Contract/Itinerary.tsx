import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { useAppDispatch } from "../../app/hooks";
import {
  findContractByIdAsync,
  updateContractAsync,
} from "../../services/contract.service";
import { findRoomByIdAsync } from "../../services/room.service";
import { format, addDays } from "date-fns";
import { fommatCurrency } from "../../configs/formatCurrency";
import Swal from "sweetalert2";
import { Modal } from "../../components/modal";
import Review from "../Review/Review";
const ItineraryPageStyles = styled.div`
  .Itinerary {
    margin: 5rem 0;
    .title {
      font-size: 2rem;
      font-weight: bold;
      margin-bottom: 2rem;
    }
    .description {
      font-weight: bold;
      font-size: 3rem;
    }
    .home {
      margin-top: 5rem;
      & .title {
        margin-top: 2rem;
        font-weight: 700;
        font-size: 2.5rem;
      }
      & .floor-plan {
        font-weight: 700;
      }
      &-info {
        margin-right: 10rem;
        width: calc(100% / 2 - 7rem);
        .info-booking {
          width: 100%;
          & .title {
            font-size: 1.6rem;
          }

          & .total-money {
            margin-top: 3rem;
            padding-top: 1rem;
            position: relative;
            &::before {
              content: "";
              position: absolute;
              width: 100%;
              height: 1px;
              background-color: #00000029;
              top: 0;
              left: 0;
            }
          }
        }
      }
      &-thumb {
        border-radius: 0.8rem;
        overflow: hidden;
        width: 67rem;
        height: 40.3rem;
      }
    }
    .btn-default {
      padding: 2rem 2rem;
      font-weight: bold;
      color: #ffffff;
      border-radius: 0.8rem;
      &.danger {
        background-color: #c13515;
      }
      &.primary {
        background-color: #3b71fe;
      }
    }
    .btn-status {
      font-weight: bold;
      border-radius: 0.8rem;
      display: inline-block;
      padding: 0.2rem 1rem;
      &.primary {
        background-color: #00a8ff;
        color: white;
      }
      &.pending {
        background-color: #adb0b9;
        color: #545050;
      }
      &.success {
        background-color: #4cd137;
        color: white;
      }
      &.danger {
        color: white;
        background-color: #c13515;
      }
    }
  }
`;
const ItineraryPage = () => {
  const { contract_id } = useParams();
  const [home, setHome] = useState<any>();
  const navigate = useNavigate();
  const [contract, setContract] = useState<any>();
  const dispatch = useAppDispatch();
  const [toggle, setToggle] = useState<boolean>(false);
  useEffect(() => {
    dispatch(findContractByIdAsync(contract_id!))
      .then((res) => {
        const { contract } = res.payload.data;
        if (contract[0]) {
          setContract(contract[0]);
          dispatch(findRoomByIdAsync(contract[0].home_id))
            .then((res) => {
              const { home } = res.payload.data;
              setHome(home);
              console.log(res);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const closeModal = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setToggle(false);
  };

  const handleDecline = () => {
    Swal.fire({
      title: "Bạn có chắc muốn hủy đơn đặt này?",
      text: "Bạn sẽ không thể khôi phục nó",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Xác nhận hủy",
      cancelButtonText: "Quay lại",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(updateContractAsync({ status: 3, contract_id }))
          .then((res) => {
            let { data } = res.payload;
            Swal.fire({
              position: "center",
              icon: data.status,
              title:
                data.message === "success"
                  ? "Hủy phòng đặt thành công"
                  : data.message,
              showConfirmButton: false,
              timer: 1500,
            }).then((result) => {
              if (data.status === "success") {
                navigate("/trips/all");
              }
            });
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };

  return (
    <ItineraryPageStyles>
      <div className="container">
        <div className="Itinerary">
          <h2 className="title">Cảm ơn bạn đã đến với chúng tôi</h2>
          <div className="group flex items-center">
            <p className="description">
              {" "}
              {contract?.status === 1
                ? "Phòng bạn đặt đã được xác nhận. Chúc bạn có một chuyến đi vui vẻ"
                : ""}
              {contract?.status === 2
                ? "Phòng của bạn đã được đặt. Hãy đợi chủ nhà xác nhận"
                : ""}
              {contract?.status === 3
                ? "Thật đáng tiếc vì phòng đặt đã bị hủy, chúng tôi sẽ hoàn tiền cho bạn trong thời gian sớm nhất"
                : ""}
              {contract?.status === 5
                ? "Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi, nếu bạn có vấn đề gì hãy cho chúng tôi biết"
                : ""}
            </p>
          </div>

          <div className="home flex ">
            <div className="home-info">
              <div className="group flex justify-between items-center">
                <div className="title">{home?.title}</div>
                {contract?.status === 1 ? (
                  <div className="btn-status success">Đã xác nhận</div>
                ) : (
                  ""
                )}
                {contract?.status === 2 ? (
                  <div className="btn-status pending">Chờ xác nhận</div>
                ) : (
                  ""
                )}
                {contract?.status === 3 ? (
                  <div className="btn-status danger">Đã hủy</div>
                ) : (
                  ""
                )}
                {contract?.status === 5 ? (
                  <div className="btn-status primary">Đã trả phòng</div>
                ) : (
                  ""
                )}
              </div>

              <div className="floor-plan">
                {home?.bedroom} phòng ngủ - {home?.bed} giường -{" "}
                {home?.bathroom} phòng tắm
              </div>
              <div className="group flex items-center">
                <div className="info-booking">
                  <div className="group flex justify-between">
                    <div className="info-booking-date">
                      <div className="title">Ngày đặt</div>
                      <div className="desc">
                        {contract ? (
                          <>
                            {format(
                              Date.parse(contract?.checkin),
                              "dd-MM-yyyy"
                            )}{" "}
                            <i className="fa-regular fa-arrow-right-long fa-sm mr-8 ml-8"></i>{" "}
                            {format(
                              Date.parse(contract?.checkout),
                              "dd-MM-yyyy"
                            )}
                          </>
                        ) : null}
                      </div>
                    </div>
                    <div className="info-booking-customer">
                      <div className="title">Khách</div>
                      <div className="desc">
                        {Number(contract?.numberOfAdults) +
                          Number(contract?.numberOfChildrens)}{" "}
                        khách,{" "}
                        {contract?.numberOfInfants
                          ? `${contract?.numberOfInfants} em bé`
                          : ""}
                      </div>
                    </div>
                  </div>

                  <div className="total-money flex items-center justify-between">
                    <div className="title">Phương thức thanh toán</div>
                    <div className="group flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 44 32"
                        aria-label="PayPal"
                        role="img"
                        focusable="false"
                        style={{
                          display: "block",
                          height: "33px",
                          width: "33px",
                        }}
                      >
                        <g fill="none" fillRule="evenodd">
                          <path
                            fill="#0079C1"
                            fillRule="nonzero"
                            d="M35.994 12a.2.2 0 0 1 .197-.175h1.12a.2.2 0 0 1 .197.238l-.985 6.3a.344.344 0 0 1-.332.287h-.997a.2.2 0 0 1-.197-.237L35.994 12zm-1.366 2.1a.2.2 0 0 1 .197.238l-.628 4.025a.344.344 0 0 1-.332.287h-1.047a.2.2 0 0 1-.196-.237l.049-.326s-.566.675-1.6.675c-.603 0-1.108-.175-1.465-.6-.381-.462-.541-1.112-.43-1.812.209-1.388 1.304-2.363 2.584-2.363.554 0 1.12.126 1.366.488l.086.125.05-.325a.2.2 0 0 1 .197-.175H34.627zm-1.625 2.287c.05-.325-.025-.625-.197-.837-.172-.213-.443-.325-.775-.325-.665 0-1.194.463-1.293 1.138-.049.325.013.625.185.825.172.212.443.312.776.312.664 0 1.193-.45 1.304-1.125v.012zm-5.612-4.575c.812 0 1.415.213 1.76.626.308.374.418.912.308 1.587-.247 1.55-1.157 2.338-2.757 2.338h-.764a.344.344 0 0 0-.332.287l-.283 1.788a.23.23 0 0 1-.234.2h-1.243a.2.2 0 0 1-.197-.238l.973-6.3a.344.344 0 0 1 .332-.287h2.437zm.27 2.3c.05-.312.013-.537-.123-.687-.209-.25-.627-.25-1.058-.25h-.172a.2.2 0 0 0-.197.175L25.852 15h.37c.64 0 1.304 0 1.44-.887z"
                          ></path>
                          <path
                            fill="#00457C"
                            fillRule="nonzero"
                            d="M23.538 14.1c.16 0 .259.188.16.325L19.822 20.1a.356.356 0 0 1-.27.15h-1.17c-.16 0-.258-.188-.16-.325l1.207-1.725-1.28-3.825a.204.204 0 0 1 .197-.275h1.144c.148 0 .283.1.32.238l.677 2.312 1.613-2.4c.061-.1.172-.15.282-.15h1.17-.012zm-6.153 0a.2.2 0 0 1 .196.238l-.627 4.025a.344.344 0 0 1-.332.287h-1.047a.2.2 0 0 1-.196-.237l.049-.326s-.567.675-1.6.675c-.603 0-1.108-.175-1.465-.6-.381-.462-.541-1.112-.43-1.812.209-1.388 1.304-2.363 2.584-2.363.554 0 1.12.126 1.366.488l.086.125.05-.325a.2.2 0 0 1 .196-.175h1.17zm-1.625 2.287c.05-.325-.025-.625-.197-.837-.172-.213-.443-.325-.775-.325-.665 0-1.194.463-1.293 1.138-.049.325.013.625.185.825.172.212.443.312.775.312.665 0 1.194-.45 1.305-1.125v.012zm-5.612-4.575c.812 0 1.415.213 1.76.626.307.374.418.912.307 1.587-.246 1.55-1.156 2.338-2.757 2.338h-.763a.344.344 0 0 0-.332.287l-.258 1.7a.344.344 0 0 1-.333.287H6.615a.2.2 0 0 1-.197-.237l.973-6.3a.344.344 0 0 1 .332-.287h2.425zm.283 2.3c.049-.312.012-.537-.123-.687-.21-.25-.628-.25-1.059-.25h-.172a.2.2 0 0 0-.197.175L8.622 15h.369c.64 0 1.304 0 1.44-.887z"
                          ></path>
                          <path
                            fill="#B0B0B0"
                            d="M2.036 1C1.468 1 1 1.466 1 2.05v27.9c0 .584.468 1.05 1.036 1.05h39.928c.568 0 1.036-.466 1.036-1.05V2.05C43 1.466 42.532 1 41.964 1H2.036zM0 2.05C0 .922.907 0 2.036 0h39.928C43.093 0 44 .922 44 2.05v27.9c0 1.128-.907 2.05-2.036 2.05H2.036A2.043 2.043 0 0 1 0 29.95V2.05z"
                          ></path>
                        </g>
                      </svg>
                      <div className="payment-method__item--title ml-5">
                        PayPal
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="title">Tổng tiền</div>
                    {fommatCurrency("vi-VN", "VND").format(
                      contract?.total_money
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="title">Đã trả</div>
                    {contract?.status_payment === 3
                      ? fommatCurrency("vi-VN", "VND").format(0)
                      : ""}
                    {contract?.status_payment === 2
                      ? fommatCurrency("vi-VN", "VND").format(
                          Number(contract?.total_money) / 2
                        )
                      : ""}
                    {contract?.status_payment === 1
                      ? fommatCurrency("vi-VN", "VND").format(
                          Number(contract?.total_money)
                        )
                      : ""}
                  </div>
                </div>
              </div>
            </div>

            <div className="home-thumb">
              <img src={home?.image_main} alt="" />
            </div>
          </div>
          {contract?.status === 5 && contract?.status_review === 2 ? (
            <p>Bạn chưa đánh giá, hãy đánh giá cho chúng tôi</p>
          ) : (
            ""
          )}
          <div className="group flex mt-10">
            <button
              className="btn-default primary"
              onClick={() => navigate(-1)}
            >
              Quay lại
            </button>
            {contract?.status !== 3 &&
            contract?.status !== 5 &&
            new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).getTime() <
              Date.parse(contract?.checkin) ? (
              <button
                className="btn-default danger ml-10"
                onClick={handleDecline}
              >
                Hủy phòng đặt
              </button>
            ) : (
              ""
            )}

            {contract?.status === 5 && contract?.status_review === 2 ? (
              <button className="btn-default danger ml-10" onClick={() => setToggle(true)}>
                Đánh giá ngay
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      <Modal
          title="Đánh giá"
          toggle={toggle}
          closeFn={(event) => closeModal(event)}
        >
          <Review></Review>
        </Modal>
    </ItineraryPageStyles>
  );
};

export default ItineraryPage;
