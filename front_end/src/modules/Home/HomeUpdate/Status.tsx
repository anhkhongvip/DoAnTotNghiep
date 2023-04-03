import React, { useState, ChangeEvent } from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectRoom, setRoom } from "../../../features/room/roomSlice";
import { updateRoomAsync } from "../../../services/room.service";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
const StatusStyles = styled.div`
  border: 1px solid #8080804f;
  border-radius: 0.8rem;
  margin-bottom: 2rem;

  .homeUpdate {
    &__status {
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
    &__desc {
      font-size: 1.2rem;
      font-weight: 600;
      color: gray;
      margin-bottom: 2rem;
    }
    &__info {
      max-width: 67rem;
    }
    &__close {
      font-size: 1.4rem;
      line-height: 1;
    }
    &__title {
      font-weight: 700;
    }
  }

  .btn-not-allow {
    background-color: #ddd !important;
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

  .input-status {
    display: none;
    &:checked + .label-status > .radio-box {
      background-color: black;
    }
  }
  .status-item {
    margin-top: 2rem;
    .label-status {
      cursor: pointer;
      & .radio-box {
        width: 2.5rem;
        height: 2.5rem;
        border: 1px solid gray;
        border-radius: 2rem;
        flex-shrink: 0;
        margin-right: 2rem;
        cursor: pointer;
        position: relative;
        &::before {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border-radius: 1rem;
          width: 1rem;
          height: 1rem;
          background-color: white;
        }
      }
    }
    &__desc {
      font-size: 1.5rem;
      font-weight: 500;
      color: #717171;
    }
  }
`;
type Props = {
  statusData: number;
  toogleUpdate: any;
  setToogleUpdate: (toogleUpdate: any) => void;
};
const Status = ({ statusData, setToogleUpdate, toogleUpdate }: Props) => {
  const [check, setCheck] = useState<boolean>(false);
  const { room_id } = useParams();
  const roomSelector = useAppSelector(selectRoom);
  const [status, setStatus] = useState<number>(statusData);
  const dispatch = useAppDispatch();
  const handleClose = () => {
    setToogleUpdate({ ...toogleUpdate, statusToggle: false });
  };
  const handleChange = (event: ChangeEvent) => {
    const { value } = event.target as HTMLInputElement;
    if (Number(value) === statusData) {
      setCheck(false);
    } else {
      setCheck(true);
    }
    setStatus(Number(value));
  };

  const handleSave = async () => {
    try {
      let res = await dispatch(updateRoomAsync({ status, room_id }));
      let { status: statusRes } = res.payload.data;
      if (statusRes) {
        Swal.fire({
          position: "center",
          icon: statusRes,
          title: "Cập nhật trạng thái nhà/phòng thành công",
          showConfirmButton: false,
          timer: 1500,
        }).then((result) => {
          if (statusRes === "success") {
            dispatch(setRoom({ ...roomSelector.room, status }));
            setToogleUpdate({ ...toogleUpdate, statusToggle: false });
          }
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <StatusStyles>
      <div className="homeUpdate__status--main">
        <div className="homeUpdate__info">
          <h2 className="homeUpdate__title">Trạng thái nhà/phòng cho thuê</h2>
          <div className="group status-item">
            <input
              type="radio"
              id="status-1"
              name="demo"
              value={1}
              className="input-status"
              defaultChecked={statusData === 1}
              onChange={handleChange}
            />
            <label htmlFor="status-1" className="label-status flex">
              <div className="radio-box"></div>
              <div className="radio-info">
                <div className="radio-group flex items-center">
                  <span className="home-success mr-3"></span> Đã đăng
                </div>
                <p className="status-item__desc">
                  Khách có thể tìm thấy nhà/phòng cho thuê của bạn trong kết quả
                  tìm kiếm và yêu cầu thông tin về tình trạng còn phòng hoặc đặt
                  phòng vào những ngày còn trống.
                </p>
              </div>
            </label>
          </div>
          <div className="group status-item">
            <input
              type="radio"
              id="status-2"
              name="demo"
              value={2}
              className="input-status"
              defaultChecked={statusData === 2}
              onChange={handleChange}
            />
            <label htmlFor="status-2" className="label-status flex">
              <div className="radio-box"></div>
              <div className="radio-info">
                <div className="radio-group flex items-center">
                  <span className="home-danger mr-3"></span> Đã hủy đăng
                </div>
                <p className="status-item__desc">
                  Khách không thể đặt phòng hoặc tìm thấy nhà/phòng cho thuê của
                  bạn trong kết quả tìm kiếm.
                </p>
              </div>
            </label>
          </div>
        </div>
        <button className="homeUpdate__close" onClick={handleClose}>
          <i className="fa-regular fa-x"></i>
        </button>
      </div>
      <div className="homeUpdate__status--footer">
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
    </StatusStyles>
  );
};

export default Status;
