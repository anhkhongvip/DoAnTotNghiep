import React, { useState, ChangeEvent, useEffect } from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useParams } from "react-router-dom";
import { updateRoomAsync } from "../../../services/room.service";
import Swal from "sweetalert2";
import { selectRoom, setRoom } from "../../../features/room/roomSlice";

const TitleStyles = styled.div`
  border: 1px solid #8080804f;
  border-radius: 0.8rem;
  margin-bottom: 2rem;

  .homeUpdate {
    &__title {
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
      max-width: 60rem;
    }
    &__close {
      font-size: 1.4rem;
      line-height: 1;
    }
    &__title {
      font-weight: 700;
    }
  }
  .input {
    &-wrapper {
      display: inline-block;
      max-width: 60rem;
      width: 60rem;
      border: 2px solid gray;
      border-radius: 0.8rem;
      margin-bottom: 0.5rem;
      padding: 1.2rem 1.2rem;
      transition: border 0.2s ease;
      input::-webkit-outer-spin-button,
      input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
    }
    &-title {
      font-size: 1.2rem;
    }
    &-group {
      position: relative;
    }
    &-data {
      width: 100%;
      &-text {
        position: absolute;
        top: 0;
        left: 0;
      }
    }
  }
  .content-length {
    font-size: 1.4rem;
    font-weight: 700;
    color: gray;
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

  .focus-visible {
    border-color: black;
  }
  .not-allow {
    border-color: #c13515 !important;
  }

  .btn-not-allow {
    background-color: #ddd !important;
  }

  .error-message-entered {
    display: flex;
    align-items: center;
    font-size: 1.4rem;
    color: #c13515;
    margin-top: 1rem;
  }
`;

type Props = {
  toogleUpdate: any;
  setToogleUpdate: (toogleUpdate: any) => void;
  type: string;
  countTime?: string;
  minimumTime?: number;
  maximumTime?: number;
};

const TripTime = ({
  setToogleUpdate,
  toogleUpdate,
  type,
  countTime,
  minimumTime,
  maximumTime,
}: Props) => {
  const { room_id } = useParams();
  const roomSelector = useAppSelector(selectRoom);
  const [content, setContent] = useState<string>(countTime!);
  const [check, setCheck] = useState<boolean>(false);
  const [isError, setIsError] = useState<string>("");
  const [focus, setFocus] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const handleChange = (event: ChangeEvent) => {
    const { value } = event.target as HTMLInputElement;
    let newValue = Number(value);

    if (type === "maximum" && newValue < minimumTime!) {
      setIsError(
        "Thời gian ở tối đa phải lớn hơn hoặc bằng thời gian ở tối thiểu"
      );
    } else if (type === "maximum" && newValue > 1125!) {
      setIsError("Thời gian lưu trú tối đa phải nhỏ hơn hoặc bằng 1125");
    } else if (type === "minimum" && newValue > maximumTime!) {
      setIsError(
        "Thời gian ở tối thiểu phải lớn hơn hoặc bằng thời gian ở tối đa"
      );
      setCheck(false);
    } else if (countTime === value || newValue === 0) {
      setCheck(false);
      setIsError("");
    } else {
      setIsError("");
      setCheck(true);
    }

    setContent(newValue.toString());
  };
  const handleClose = () => {
    if (type === "maximum") {
      setToogleUpdate({ ...toogleUpdate, maximumTime: false });
    } else {
      setToogleUpdate({ ...toogleUpdate, minimumTime: false });
    }
  };
  const handleSave = async () => {
    try {
      let res;
      if (type === "maximum") {
        res = await dispatch(
          updateRoomAsync({ maximumTime: content, room_id })
        );
      } else {
        res = await dispatch(
          updateRoomAsync({ minimumTime: content, room_id })
        );
      }

      let { status } = res.payload.data;
      if (status) {
        Swal.fire({
          position: "center",
          icon: status,
          title: "Cập nhật thời gian chuyến đi thành công",
          showConfirmButton: false,
          timer: 1500,
        }).then((result) => {
          if (status === "success") {
            if (type === "maximum") {
              dispatch(setRoom({ ...roomSelector.room, maximumTime: content }));
              setToogleUpdate({ ...toogleUpdate, maximumTime: false });
            } else {
              dispatch(setRoom({ ...roomSelector.room, minimumTime: content }));
              setToogleUpdate({ ...toogleUpdate, minimumTime: false });
            }
          }
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <TitleStyles>
      <div className="homeUpdate__title--main">
        <div className="homeUpdate__info">
          <h2 className="homeUpdate__title mb-4">{`Thời gian ở ${
            type === "minimum" ? "tối thiểu" : "tối đa"
          }`}</h2>
          <label
            htmlFor={`input-${type}`}
            className={`input-wrapper ${focus ? "focus-visible" : ""} ${
              isError ? "not-allow" : ""
            }`}
          >
            <div className="input-title">{`Số đêm ${
              type === "minimum" ? "tối thiểu" : "tối đa"
            }`}</div>
            <div className="group input-group">
              <input
                type="number"
                className="input-data"
                value={content}
                id={`input-${type}`}
                onChange={handleChange}
                onBlur={() => setFocus(false)}
                onFocus={() => setFocus(true)}
              />
              <div className="input-data-text">{`${content}`} đêm</div>
            </div>
          </label>

          {isError ? (
            <div className="error-message-entered">
              <svg
                viewBox="0 0 16 16"
                width={16}
                fill="#c13515"
                height={16}
                xmlns="http://www.w3.org/2000/svg"
                aria-label="Lỗi"
                role="img"
                focusable="false"
              >
                <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zm0 10.2a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm.8-6.6H7.2v5.2h1.6z"></path>
              </svg>
              <span className="ml-2">{isError}</span>
            </div>
          ) : null}
        </div>
        <button className="homeUpdate__close" onClick={handleClose}>
          <i className="fa-regular fa-x"></i>
        </button>
      </div>
      <div className="homeUpdate__title--footer">
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
    </TitleStyles>
  );
};

export default TripTime;
