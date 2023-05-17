import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { format } from "date-fns";
import {
  Eventcalendar,
  getJson,
  setOptions,
  localeVi,
} from "@mobiscroll/react";
import { useAppDispatch } from "../../app/hooks";
import {
  findContractByIdAsync,
  findContractsAsync,
  updateContractAsync,
} from "../../services/contract.service";
import Swal from "sweetalert2";
import { findRoomByIdAsync } from "../../services/room.service";
import { fommatCurrency } from "../../configs/formatCurrency";
import { getHomeDayByHomeIdAsync } from "../../services/home_day.service";
const ContractDetailStyles = styled.div`
  .contract {
    margin-top: 5rem;
    padding-bottom: 2rem;
    .image-thumb {
      width: 67rem;
      height: 40.3rem;
      border-radius: 2rem;
      overflow: hidden;
    }
    &_info {
      width: calc(100% / 2 - 15rem);
      & .title {
        font-size: 3rem;
        font-weight: 700;
      }
      & .content {
        margin-top: 5.5rem;
        & .label {
          font-weight: 700;
        }
      }
    }
    .btn-check-status {
      width: 67rem;
      border: 1px solid black;
      text-align: center;
      border-radius: 0.8rem;
      padding: 1rem 2rem;
      cursor: pointer;
      font-weight: 700;
      transition: 0.4s ease-in-out;
    }

    .btn-status {
      padding: 1rem 2rem;
      border-radius: 0.8rem;
      display: flex;
      cursor: pointer;
      color: #fff;
      font-weight: 700;
      align-items: center;

      &.status-wait-confirm {
        background-color: #5599ff;
      }

      &.status-decline {
        background-color: #ff5a5f;
      }

      &.status-success {
        background-color: #4cd137;
        cursor: default;
      }
    }
  }
`;
const ContractDetail = () => {
  const [openCalendar, setOpenCalendar] = useState<boolean>(false);
  const { contract_id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [contract, setContract] = useState<any>(null);
  const [home, setHome] = useState<any>(null);
  const [dataCalendar, setDataCalendar] = useState<any>([]);
  useEffect(() => {
    dispatch(findContractByIdAsync(contract_id!))
      .then((res) => {
        const { contract } = res.payload.data;
        console.log(11111, contract);

        setContract(contract[0]);
        dispatch(findRoomByIdAsync(contract[0].home_id))
          .then((res) => {
            const { home } = res.payload.data;
            setHome(home);
          })
          .catch((err) => {
            console.log(err);
          });

        dispatch(
          findContractsAsync({ home_id: contract[0].home_id, status: 1 })
        )
          .then((res) => {
            console.log(res);

            const { contracts } = res.payload.data;
            let dataCalendar = contracts.map((item: any, index: number) => {
              return {
                title: "Booked",
                start: Date.parse(item.checkin),
                end: Date.parse(item.checkout),
                color: "#" + Math.floor(Math.random() * 16777215).toString(16),
                editable: false,
              };
            });
            setDataCalendar(dataCalendar);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const view = React.useMemo(() => {
    return {
      calendar: { labels: true },
    };
  }, []);

  const handleApprove = () => {
    Swal.fire({
      title: "Bạn có chắc muốn xác nhận đơn đặt phòng này chứ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Xác nhận đặt phòng",
      cancelButtonText: "Quay lại",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(updateContractAsync({ status: 1, contract_id }))
          .then((res) => {
            let { data } = res.payload;
            Swal.fire({
              position: "center",
              icon: data.status,
              title: "Xác nhận đặt phòng thành công",
              showConfirmButton: false,
              timer: 1500,
            }).then((result) => {
              if (data.status === "success") {
                navigate("/hosting/reservations/upcoming");
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
              title: "Hủy phòng đặt thành công",
              showConfirmButton: false,
              timer: 1500,
            }).then((result) => {
              if (data.status === "success") {
                navigate("/hosting/reservations/all");
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

  const handleConfirmCheckout = () => {
    Swal.fire({
      title: "Xác nhận trả phòng?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Quay lại",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(updateContractAsync({ status: 5, contract_id, account_id: contract.account_id, home_id: contract.home_id}))
          .then((res: any) => {
            let { data } = res.payload;
            Swal.fire({
              position: "center",
              icon: data.status,
              title: "Đã xác nhận trả phòng",
              showConfirmButton: false,
              timer: 1500,
            }).then((result) => {
              if (data.status === "success") {
                navigate("/hosting/reservations/all");
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
    <ContractDetailStyles>
      <div className="container">
        <div className="contract">
          <div className="group flex justify-between">
            <div className="contract-banner">
              <div className="image-thumb">
                <img
                  src="https://plus.unsplash.com/premium_photo-1661764072587-0050cc57ac17?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                  alt="img-thumb"
                />
              </div>
              <div
                className="btn-check-status mt-10"
                onClick={() => setOpenCalendar(!openCalendar)}
              >
                Kiểm tra tình trạng còn phòng
              </div>

              {openCalendar ? (
                <div className="event-calendar">
                  <Eventcalendar
                    locale={localeVi}
                    theme="ios"
                    themeVariant="light"
                    clickToCreate={false}
                    dragToCreate={false}
                    dragToMove={false}
                    dragToResize={false}
                    eventDelete={false}
                    data={dataCalendar}
                    view={view}
                  />
                </div>
              ) : (
                ""
              )}
            </div>

            <div className="contract_info">
              <h3 className="title">Thông tin đặt phòng</h3>
              <div className="content">
                <div className="group flex justify-between">
                  <div className="label">Tên phòng/nhà cho thuê :</div>
                  <div className="home-title">{home?.title}</div>
                </div>

                <div className="group flex justify-between items-center mt-16">
                  <div className="group checkin">
                    <div className="label">Ngày đặt</div>
                    <div className="">
                      {contract?.checkin
                        ? format(Date.parse(contract?.checkin), "dd-MM-yyyy")
                        : ""}
                    </div>
                  </div>
                  <i className="fa-regular fa-arrow-right"></i>
                  <div className="group checkout">
                    <div className="label">Ngày trả</div>
                    <div className="desc">
                      {contract?.checkout
                        ? format(Date.parse(contract?.checkout), "dd-MM-yyyy")
                        : ""}
                    </div>
                  </div>
                </div>

                <div className="group flex justify-between  mt-16">
                  <div className="label">Khách :</div>
                  <div className="desc">
                    {contract?.numberOfAdults} người lớn
                    {contract?.numberOfChildren
                      ? `, ${contract?.numberOfChildren} trẻ em`
                      : ""}
                    {contract?.numberOfInfants
                      ? `, ${contract?.numberOfInfants} em bé`
                      : ""}
                  </div>
                </div>

                <div className="group flex justify-between  mt-16">
                  <div className="label">Người đặt :</div>
                  <div className="desc">{contract?.username}</div>
                </div>

                <div className="group flex justify-between  mt-16">
                  <div className="label">Email :</div>
                  <div className="desc">{contract?.email}</div>
                </div>

                <div className="group flex justify-between  mt-16">
                  <div className="label">Số điện thoại :</div>
                  <div className="desc">
                    {contract?.phone_number
                      ? contract?.phone_number
                      : "Chưa có"}
                  </div>
                </div>

                <div className="group flex justify-between  mt-16">
                  <div className="label">Tổng tiền :</div>
                  <div className="desc">
                    {fommatCurrency("vi-VN", "VND").format(
                      contract?.total_money
                    )}
                  </div>
                </div>

                <div className="group flex justify-between mt-16">
                  <div className="label">Đã trả :</div>
                  <div className="desc">
                    {contract?.status_payment === 1
                      ? fommatCurrency("vi-VN", "VND").format(
                          contract?.total_money
                        )
                      : fommatCurrency("vi-VN", "VND").format(
                          contract?.total_money / 2
                        )}
                  </div>
                </div>
              </div>
              <div className="group flex mt-10 status-confirm">
                {contract?.status === 1 && (
                  <>
                    {/* {Date.parse(contract?.checkin) > Date.now() ? (
                      <>
                        <div className="group flex">
                          <button
                            className="btn-status status-success mr-10"
                            disabled={true}
                          >
                            Đã xác nhận
                          </button>
                          <div
                            className="btn-status status-decline ml-5"
                            onClick={handleDecline}
                          >
                            Hủy đặt phòng
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <button
                          className="btn-status status-wait-confirm mr-10"
                          onClick={handleConfirmCheckout}
                        >
                          Xác nhận trả phòng
                        </button>
                      </>
                    )} */}
                     <button
                          className="btn-status status-wait-confirm mr-10"
                          onClick={handleConfirmCheckout}
                        >
                          Xác nhận trả phòng
                        </button>
                  </>
                )}
                {contract?.status === 2 && (
                  <>
                    <div
                      className="btn-status status-wait-confirm mr-10"
                      onClick={handleApprove}
                    >
                      Chấp nhận
                    </div>
                    <div
                      className="btn-status status-decline"
                      onClick={handleDecline}
                    >
                      Từ chối
                    </div>
                  </>
                )}

                {contract?.status === 3 && (
                  <>
                    <div
                      className="btn-status status-decline"
                      onClick={handleDecline}
                    >
                      Đã hủy
                    </div>
                  </>
                )}
                {contract?.status === 5 && (
                  <>
                    <div
                      className="btn-status status-wait-confirm cursor-default"
                    >
                      Đã trả phòng
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ContractDetailStyles>
  );
};

export default ContractDetail;
