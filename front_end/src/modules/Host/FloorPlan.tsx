import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useAppDispatch } from "../../app/hooks";
import { setStep } from "../../features/room/roomSlice";
import { useParams } from "react-router-dom";
import { useData } from "../../pages/layout/Host/HostLayout";
import { useCheck } from "../../contexts/checkContext";
import { CheckContextType } from "../../@types/check";
import { findRoomByIdAsync } from "../../services/room.service";
const FloorPlanStyles = styled.div`
  .title {
    display: inline-block;
    margin-top: 5rem;
    font-weight: bold;
    font-size: 3rem;
    margin-bottom: 2rem;
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

  .description {
    color: gray;
    font-weight: bold;
    margin-bottom: 5rem;
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
  }
  .btn-down:hover,
  .btn-up:hover {
    transition: 0.2s linear;
    border-color: black;
    color: black;
  }
  .floor-plan {
    max-width: 60rem;
  }
  .item {
    &-group {
      width: 100%;

      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 5rem;
    }
    &-title {
      color: #404040;
      font-weight: bold;
    }
    &-count {
      display: flex;
      align-items: center;
      .amount {
        padding: 0 1.5rem;
      }
    }
  }
`;

type NameObject = "max_passenger" | "bed" | "bathroom";

type Props = {
  step: number;
};

const FloorPlan = ({ step }: Props) => {
  const dispatch = useAppDispatch();
  const { room_id } = useParams();
  const { data, setData } = useData();
  const { setCheck } = useCheck() as CheckContextType;

  useEffect(() => {
    dispatch(findRoomByIdAsync(room_id!))
      .then((res) => {
        if (res.payload.data) {
          const { max_passenger, bathroom, bed } = res.payload.data.home;
          if (max_passenger && bathroom && bed) {
            setData({
              max_passenger,
              bed,
              bathroom,
              nextPage: `/become-a-host/${room_id}/stand-out`,
              backPage: `/become-a-host/${room_id}/location`,
            });
          } else {
            setData({
              max_passenger: 4,
              bed: 1,
              bathroom: 1,
              nextPage: `/become-a-host/${room_id}/stand-out`,
              backPage: `/become-a-host/${room_id}/location`,
            });
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });

    setCheck(true);
    dispatch(setStep(step));
  }, [step, dispatch]);

  const handleClickUp = (name: NameObject) => {
    setData({ ...data, [name]: data[name] + 1 });
  };
  const handleClickDown = (name: NameObject) => {
    if (data[name] > 1) {
      setData({ ...data, [name]: data[name] - 1 });
    }
  };
  return (
    <FloorPlanStyles>
      <div className="container-sm floor-plan">
        <h2 className="title">
          Chia sẻ một số thông tin cơ bản về chỗ ở của bạn
        </h2>
        <p className="description">
          Sau này, bạn sẽ bổ sung những thông tin khác, như loại giường chẳng
          hạn.
        </p>

        <div className="content mt-5">
          <div className="item-group">
            <div className="item-title">Khách</div>
            <div className="item-count">
              {data?.max_passenger > 1 && (
                <button
                  className="btn-down"
                  onClick={() => handleClickDown("max_passenger")}
                >
                  <i className="fa-regular fa-minus"></i>
                </button>
              )}

              <span className="amount">{data?.max_passenger}</span>
              <button
                className="btn-up"
                onClick={() => handleClickUp("max_passenger")}
              >
                <i className="fa-regular fa-plus"></i>
              </button>
            </div>
          </div>
          <div className="item-group">
            <div className="item-title">Giường</div>
            <div className="item-count">
              {data?.bed > 1 && (
                <button
                  className="btn-down"
                  onClick={() => handleClickDown("bed")}
                >
                  <i className="fa-regular fa-minus"></i>
                </button>
              )}

              <span className="amount">{data?.bed}</span>
              <button className="btn-up" onClick={() => handleClickUp("bed")}>
                <i className="fa-regular fa-plus"></i>
              </button>
            </div>
          </div>
          <div className="item-group">
            <div className="item-title">Phòng tắm</div>
            <div className="item-count">
              {data?.bathroom > 1 && (
                <button
                  className="btn-down"
                  onClick={() => handleClickDown("bathroom")}
                >
                  <i className="fa-regular fa-minus"></i>
                </button>
              )}

              <span className="amount">{data?.bathroom}</span>
              <button
                className="btn-up"
                onClick={() => handleClickUp("bathroom")}
              >
                <i className="fa-regular fa-plus"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </FloorPlanStyles>
  );
};

export default FloorPlan;
