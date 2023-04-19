import React, { useState, useEffect, useCallback, ChangeEvent } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
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
import {
  findContractByIdAsync,
  updateContractAsync,
} from "../services/contract.service";
import Dropdown from "../components/dropdown/Dropdown";
import { DropdownSelect } from "../components/dropdown";
import { makeid } from "../configs/makeId";
import Swal from "sweetalert2";

const PaymentPageStyles = styled.div`
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
    &-banner-booking {
      margin-top: 4rem;
      padding: 4rem 0;
      font-size: 1.8rem;
      border-top: 1px solid #80808052;
      border-bottom: 1px solid #80808052;
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
      .trip-info {
        font-size: 1.8rem;
        font-weight: 600;
      }
    }
  }
  .method {
    &-payment {
      margin-top: 2rem;
      border-radius: 0.8rem;
      .title {
        font-weight: 700;
        font-size: 1.8rem;
      }
      .price {
        font-weight: 700;
      }
      .circle-check {
        width: 2.2rem;
        height: 2.2rem;
        border-radius: 2.2rem;
        border: 1px solid gray;
        position: relative;
        &::before {
          content: "";
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          position: absolute;
          background-color: white;
          width: calc(100% / 2.2);
          height: calc(100% / 2.2);
          border-radius: calc(100% / 2);
        }
      }

      label {
        width: 100%;
        display: inline-block;
        cursor: pointer;
        & > input:checked + .method-info {
          border: 2px solid black;
          & .circle-check {
            background-color: black;
          }
        }
      }
    }
    &-info {
      padding: 2rem;
      & .desc {
        font-weight: 600;
        color: #808080e0;
      }
    }
    &-top {
      .method-info {
        border: 2px solid #80808052;
        border-bottom-color: transparent;
        border-radius: 0.8rem 0.8rem 0 0;
      }
    }
    &-bottom {
      .method-info {
        border: 2px solid #80808052;
        border-top-color: transparent;
        border-radius: 0 0 0.8rem 0.8rem;
      }
    }
  }
  .btn-booking {
    color: white;
    background-color: #b0b0b0;
    cursor: not-allowed;
    padding: 2rem;
    font-weight: 700;
    border-radius: 0.8rem;
  }
`;

const PaymentPage = () => {
  const { room_id, contract_id } = useParams();

  const [home, setHome] = useState<any>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [contract, setContract] = useState<any>(null);
  const [show, setShow] = useState<boolean>(false);
  const [total, setTotal] = useState<any>({
    totalDay: 0,
    totalGuest: 1,
  });
  const [moneyPay, setMoneyPay] = useState<number>(0);
  const [select, setSelect] = useState<any>({
    payment: "all",
    paymentMethod: "",
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

    dispatch(findContractByIdAsync(contract_id!))
      .then((res) => {
        console.log(res);
        let { contract } = res.payload.data;
        let dayDiff = Math.round(
          Math.abs(
            Date.parse(contract.checkin) - Date.parse(contract.checkout)
          ) /
            (1000 * 60 * 60 * 24)
        );
        setContract(contract);
        setTotal({
          totalDay: dayDiff,
          totalGuest:
            Number(contract.numberOfAdults) +
            Number(contract.numberOfChildrens),
        });
        setMoneyPay(contract.total_money);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSelectPayment = (event: ChangeEvent) => {
    const { value } = event.target as HTMLInputElement;
    if (value === "all") {
      setMoneyPay(Number(home?.price) * total.totalDay);
    } else {
      setMoneyPay((Number(home?.price) * total.totalDay) / 2);
    }
    setSelect({ ...select, payment: value });
  };

  const createOrder = (data: any, actions: any) => {
    console.log(moneyPay);
    return actions.order.create({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            value: (moneyPay * 0.00004265).toFixed(2).toString(),
            currency_code: "USD",
          },
          invoice_id: makeid(contract?.id),
        },
      ],
    });
  };

  const handleApprove = () => {
    dispatch(
      updateContractAsync({
        contract_id: contract?.id,
        status_payment: select.payment === "all" ? 1 : 2,
      })
    )
      .then((res) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Thanh toán thành công",
          showConfirmButton: false,
          timer: 1500,
        }).then((result: any) => {
          navigate(`/thanks/${contract?.id}`);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onApprove = (data: any, actions: any) => {
    return actions.order.capture().then((details: any) => {
      handleApprove();
      return details.status;
    });
  };

  const handleSelectPaymentMethod = (data: string) => {
    setSelect({ ...select, paymentMethod: data });
    setShow(false);
  };

  return (
    <PaymentPageStyles>
      <div className="container">
        <h2 className="homestay-title">
          <button onClick={() => navigate(-1)} className="homestay-back">
            {"<"}
          </button>
          Xác nhận và thanh toán
        </h2>
        <div className="homestay flex justify-between">
          <div className="homestay-info">
            <h4 className="homestay-title-sm">Chọn cách thanh toán</h4>
            <div className="method-payment">
              <label htmlFor="method-all" className="method-top">
                <input
                  type="radio"
                  id="method-all"
                  name="method-status"
                  className="hidden-input"
                  value="all"
                  checked={select.payment === "all"}
                  onChange={handleSelectPayment}
                />
                <div className="method-info">
                  <div className="flex justify-between">
                    <h3 className="title">Trả toàn bộ</h3>
                    <div className="group flex">
                      <div className="price">
                        {" "}
                        {fommatCurrency("vi-VN", "VND").format(
                          contract?.total_money
                        )}
                      </div>
                      <div className="circle-check ml-5"></div>
                    </div>
                  </div>
                  <p className="desc">
                    Thanh toán toàn bộ số tiền ngay bây giờ và bạn đã sẵn sàng.
                  </p>
                </div>
              </label>
              <label htmlFor="method-half" className="method-bottom">
                <input
                  type="radio"
                  id="method-half"
                  name="method-status"
                  className="hidden-input"
                  checked={select.payment === "half"}
                  value="half"
                  onChange={handleSelectPayment}
                />
                <div className="method-info">
                  <div className="flex justify-between">
                    <h3 className="title">
                      Trả ngay một phần, phần còn lại trả sau
                    </h3>
                    <div className="group flex">
                      <div className="price">
                        {" "}
                        {fommatCurrency("vi-VN", "VND").format(
                          contract?.total_money / 2
                        )}
                      </div>
                      <div className="circle-check ml-5"></div>
                    </div>
                  </div>
                  <p className="desc">
                    Thanh toán ngay{" "}
                    {fommatCurrency("vi-VN", "VND").format(
                      contract?.total_money
                    )}{" "}
                    và phần còn lại (
                    {fommatCurrency("vi-VN", "VND").format(
                      contract?.total_money / 2
                    )}
                    ) khi bạn đến nhận phòng. Không phát sinh phụ phí.
                  </p>
                </div>
              </label>
              <DropdownSelect
                labelHeader="Thanh toán bằng"
                labelName={`${
                  select.paymentMethod
                    ? select.paymentMethod
                    : "Chọn phương thức thanh toán"
                }`}
                show={show}
                setShow={setShow}
              >
                <div className="dropdown__content--item-style-2 ">
                  <div
                    className="group flex payment-method__item items-center cursor-pointer"
                    onClick={() => handleSelectPaymentMethod("PayPal")}
                  >
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
              </DropdownSelect>
              <div className="group homestay-banner-booking flex font-bold">
                <div className="homestay-banner-booking__icon">
                  <svg
                    viewBox="0 0 48 48"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    role="presentation"
                    focusable="false"
                    style={{
                      display: "block",
                      height: "48px",
                      width: "48px",
                      fill: "rgb(227, 28, 95)",
                      stroke: "currentcolor",
                    }}
                  >
                    <g>
                      <g stroke="none">
                        <path
                          d="M43 8v21.295L32.295 40l-10.359.001A11.971 11.971 0 0 0 26 31c0-6.627-5.373-12-12-12a12.02 12.02 0 0 0-3.001.378L11 8h32z"
                          fillOpacity=".2"
                        ></path>
                        <path d="M32 42v-8a5 5 0 0 1 4.783-4.995L37 29h8V6H34v2h-2V6H22v2h-2V6H9v14.5H7V6a2 2 0 0 1 1.85-1.995L9 4h11V2h2v2h10V2h2v2h11a2 2 0 0 1 1.995 1.85L47 6v24.953L33.953 44H15v-2h17zm12.123-11H37a3 3 0 0 0-2.995 2.824L34 34v7.122L44.123 31z"></path>
                      </g>
                      <g fill="none" strokeWidth="2">
                        <path d="M14 43c.328 0 .653-.013.974-.039C21.146 42.465 26 37.299 26 31c0-6.627-5.373-12-12-12A11.995 11.995 0 0 0 2 31c0 6.627 5.373 12 12 12z"></path>
                        <path d="M23 31h-9v-9"></path>
                      </g>
                    </g>
                  </svg>
                </div>
                <div className="homestay-banner-booking__desc ml-7">
                  Đặt phòng/đặt chỗ của bạn sẽ không được xác nhận cho đến khi
                  chủ nhà/người tổ chức chấp nhận yêu cầu của bạn
                </div>
              </div>
            </div>

            {select.paymentMethod === "PayPal" ? (
              <PayPalScriptProvider
                options={{
                  "client-id": `${process.env.REACT_APP_PAYPAL_CLIENT_ID}`,
                }}
              >
                <PayPalButtons
                  key={moneyPay}
                  createOrder={createOrder}
                  onApprove={onApprove}
                />
              </PayPalScriptProvider>
            ) : (
              <button className="btn-booking mt-16" disabled={false}>
                Yêu cầu phương thức thanh toán
              </button>
            )}
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
            <div className="group mt-10">
              <div className="flex items-center trip-info ">
                <i className="fa-light fa-users"></i>{" "}
                <span className="ml-5">{total?.totalGuest} khách </span>
              </div>
            </div>
            <div className="group mt-10">
              <div className="flex items-center trip-info ">
                {contract ? (
                  <>
                    {format(Date.parse(contract?.checkin), "dd-MM-yyyy")}{" "}
                    <i className="fa-regular fa-arrow-right-long fa-sm mr-8 ml-8"></i>{" "}
                    {format(Date.parse(contract?.checkout), "dd-MM-yyyy")}
                  </>
                ) : null}
              </div>
            </div>
            <div className="homestay-order__price mt-12">
              <h2 className="title">Chi tiết giá</h2>
              {select.payment === "all" ? (
                <>
                  <div className="group flex justify-between homestay-order__price-info pb-8 pt-6">
                    <span>
                      {fommatCurrency("vi-VN", "VND").format(
                        Number(home?.price)
                      )}{" "}
                      x {total.totalDay} đêm
                    </span>
                    <span>
                      {fommatCurrency("vi-VN", "VND").format(
                        contract?.total_money
                      )}
                    </span>
                  </div>
                  <div className="group flex justify-between font-bold mt-10">
                    <span>Tổng tiền </span>
                    <span>
                      {fommatCurrency("vi-VN", "VND").format(
                        contract?.total_money
                      )}
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <div className="homestay-order__price-info pb-8 pt-6">
                    <div className="group flex justify-between">
                      <span>
                        {fommatCurrency("vi-VN", "VND").format(
                          Number(home?.price)
                        )}{" "}
                        x {total.totalDay} đêm
                      </span>
                      <span>
                        {fommatCurrency("vi-VN", "VND").format(
                          contract?.total_money
                        )}
                      </span>
                    </div>

                    <div className="group flex justify-between font-bold mt-10">
                      <span>Tổng tiền </span>
                      <span>
                        {fommatCurrency("vi-VN", "VND").format(
                          contract?.total_money
                        )}
                      </span>
                    </div>
                  </div>
                  <div className="group flex justify-between font-bold mt-10">
                    <span>Phải trả bây giờ </span>
                    <span>
                      {fommatCurrency("vi-VN", "VND").format(
                        contract?.total_money / 2
                      )}
                    </span>
                  </div>
                  <div className="group flex justify-between mt-10">
                    <span>Phải trả khi vào nhận phòng </span>
                    <span>
                      {fommatCurrency("vi-VN", "VND").format(
                        contract?.total_money / 2
                      )}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </PaymentPageStyles>
  );
};

export default PaymentPage;
