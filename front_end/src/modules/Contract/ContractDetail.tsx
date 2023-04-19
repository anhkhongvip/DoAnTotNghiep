import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import {
  Eventcalendar,
  getJson,
  setOptions,
  localeVi,
} from "@mobiscroll/react";
import { useAppDispatch } from "../../app/hooks";
import { updateContractAsync } from "../../services/contract.service";
const ContractDetailStyles = styled.div`
  .contract {
    margin-top: 5rem;
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

    .btn-approval,
    .btn-decline {
      padding: 1rem 2rem;
      border-radius: 0.8rem;
      display: flex;
      cursor: pointer;
      color: #fff;
      font-weight: 700;
      align-items: center;
    }

    .btn-approval {
      background-color: #5599ff;
    }

    .btn-decline {
      background-color: #ff5a5f;
    }
  }
`;
const ContractDetail = () => {
  const [openCalendar, setOpenCalendar] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const now = new Date();
  const myData = [
    {
      title: "Fixed event",
      start: new Date(now.getFullYear(), now.getMonth(), 18),
      end: new Date(now.getFullYear(), now.getMonth(), 19),
      color: "#9e9e9e",
      editable: false,
    },
    {
      title: "Drag me",
      start: new Date(now.getFullYear(), now.getMonth(), 3),
      end: new Date(now.getFullYear(), now.getMonth(), 5),
      color: "#cc9900",
    },
    {
      title: "Resize me",
      start: new Date(now.getFullYear(), now.getMonth(), 24),
      end: new Date(now.getFullYear(), now.getMonth(), 29),
      color: "#ca4747",
    },
    {
      title: "Move me around",
      start: new Date(now.getFullYear(), now.getMonth(), 11),
      end: new Date(now.getFullYear(), now.getMonth(), 14),
      color: "#339966",
    },
  ];
  const view = React.useMemo(() => {
    return {
      calendar: { labels: true },
    };
  }, []);
  const { contract_id } = useParams();

  const handleApprove = () => {
    dispatch(updateContractAsync({ status: 1, contract_id }))
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
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
                    data={myData}
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
                  <div className="home-title">Nhà đặc biệt</div>
                </div>

                <div className="group flex justify-between items-center mt-16">
                  <div className="group checkin">
                    <div className="label">Ngày đặt</div>
                    <div className="">12-10-2023</div>
                  </div>
                  <i className="fa-regular fa-arrow-right"></i>
                  <div className="group checkout">
                    <div className="label">Ngày trả</div>
                    <div className="desc">12-10-2023</div>
                  </div>
                </div>

                <div className="group flex justify-between  mt-16">
                  <div className="label">Khách :</div>
                  <div className="desc">2 người lớn, 2 trẻ em, 2 em bé</div>
                </div>

                <div className="group flex justify-between  mt-16">
                  <div className="label">Tổng tiền :</div>
                  <div className="desc">1000000 vnđ</div>
                </div>

                <div className="group flex justify-between mt-16">
                  <div className="label">Đã trả :</div>
                  <div className="desc">500000 vnđ</div>
                </div>
              </div>
              <div className="group flex mt-10 status-confirm">
                <div className="btn-approval mr-10" onClick={handleApprove}>Chấp nhận</div>
                <div className="btn-decline">Từ chối</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ContractDetailStyles>
  );
};

export default ContractDetail;
