import React, { useState, ChangeEvent, useEffect, useRef } from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useParams } from "react-router-dom";
import { selectRoom, setRoom } from "../../../features/room/roomSlice";
import { updateRoomAsync } from "../../../services/room.service";
import Swal from "sweetalert2";

const PriceStyles = styled.div`
  border: 1px solid #8080804f;
  border-radius: 0.8rem;
  margin-bottom: 2rem;

  .homeUpdate {
    &__price {
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
      width: 100%;
      border: 2px solid gray;
      border-radius: 0.8rem;
      margin-bottom: 0.5rem;
      padding: 1.8rem 1.2rem;
      transition: border 0.2s ease;
    }
    &-data {
      width: 100%;
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

  .focus-visible {
    border-color: black;
  }
  .not-allow {
    border-color: #c13515 !important;
  }

  .btn-not-allow {
    background-color: #ddd !important;
  }

  .price-content {
    border: 1px solid gray;
    padding: 3.2rem;
    border-radius: 0.8rem;
    max-width: 70rem;
    margin: 0 auto;
    margin-bottom: 5rem;
  }

  .price-group {
    display: flex;
    align-items: center;
  }

  .input-price {
    padding: 0.8rem 1.2rem;
    font-size: 4.8rem;
    margin: 0 3.2rem;
    border: 1px solid #b0b0b0;
    border-radius: 0.8rem;
    overflow: hidden;
    background-color: #ffffff;
    width: 100%;
    & input {
      text-align: center;
      width: 100%;
      font-weight: 600;
    }
    &.not-allow {
      border: 1px solid #c13515;
    }
  }

  .btn-up,
  .btn-down {
    border: 1px solid #b0b0b0;
    color: #b0b0b0;
    width: 4.8rem;
    height: 4.8rem;
    line-height: 4.8rem;
    text-align: center;
    border-radius: 4.8rem;
    flex-shrink: 0;
    flex-grow: 0;
    transition: all 0.2s linear;
    &:hover {
      color: #222222 !important;
      border-color: #222222;
    }
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

  .per-day {
    font-size: 1.8rem;
    color: black;
    padding-top: 1.2rem;
    font-weight: 500;
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
  priceData: number;
  toogleUpdate: any;
  setToogleUpdate: (toogleUpdate: any) => void;
};

const Price = ({ priceData, setToogleUpdate, toogleUpdate }: Props) => {
  const { room_id } = useParams();
  const roomSelector = useAppSelector(selectRoom);
  const [check, setCheck] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [price, setPrice] = useState<number>(150000);
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const handleChange = (event: ChangeEvent) => {
    const { value } = event.target as HTMLInputElement;
    let newValue = value;
    if (newValue.includes("₫")) {
      newValue = newValue.substring(1);
    }
    let found = /^[0-9]*$/.test(newValue);
    if (found) {
      setPrice(Number(newValue));
    }
  };

  useEffect(() => {
    if (price > 50000000 || price < 100000) {
      setCheck(false);
    } else {
      setCheck(true);
    }
  }, [price]);

  const handleClick = (name: string) => {
    let newValue: number = price;
    newValue = Number(newValue);
    if (name === "up") {
      newValue += 50000;
      if (newValue > 50000000) {
        setPrice(50000000);
      } else {
        setPrice(newValue);
      }
    } else {
      newValue -= 50000;
      if (newValue < 100000) {
        setPrice(100000);
      } else {
        setPrice(newValue);
      }
    }
  };
  const handleClose = () => {
    setToogleUpdate({ ...toogleUpdate, priceToggle: false });
  };

  const handleSave = async () => {
    try {
      let res = await dispatch(updateRoomAsync({ price, room_id }));
      let { status } = res.payload.data;
      if (status) {
        Swal.fire({
          position: "center",
          icon: status,
          title: "Cập nhật giá tiền nhà/phòng thành công",
          showConfirmButton: false,
          timer: 1500,
        }).then((result) => {
          if (status === "success") {
            dispatch(setRoom({ ...roomSelector.room, price }));
            setToogleUpdate({ ...toogleUpdate, priceToggle: false });
          }
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    setCheck(false);
    setPrice(priceData);
  }, [priceData]);
  return (
    <PriceStyles>
      <div className="homeUpdate__price--main">
        <div className="homeUpdate__info">
          <h2 className="homeUpdate__title">Giá nhà/phòng cho thuê</h2>
          <p className="homeUpdate__desc">
            Giá nằm trong phạm vi bạn đã thiết lập và bạn có thể thay đổi bất kỳ
            lúc nào
          </p>
        </div>
        <button className="homeUpdate__close" onClick={handleClose}>
          <i className="fa-regular fa-x"></i>
        </button>
      </div>
      <div className="price-content text-center">
        <div className="price-group">
          <button
            className={`btn-down ${price <= 100000 ? "not-allow" : ""}`}
            onClick={() => handleClick("down")}
          >
            <i className="fa-regular fa-minus"></i>
          </button>
          <div className={`input-price ${!check ? "not-allow" : ""}`}>
            <input
              type="text"
              autoComplete="off"
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="₫00"
              ref={inputRef}
              value={price ? `₫${price}` : ""}
              onChange={handleChange}
            />
          </div>
          <button
            className={`btn-up ${price >= 50000000 ? "not-allow" : ""}`}
            onClick={() => handleClick("up")}
          >
            <i className="fa-regular fa-plus"></i>
          </button>
        </div>
        <div className="per-day">mỗi đêm</div>
        {!check && price !== 0 ? (
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
            <span className="ml-2">
              Vui lòng nhập giá cơ sở trong khoảng từ ₫100.000 đến ₫50.000.000.
            </span>
          </div>
        ) : null}
      </div>
      <div className="homeUpdate__price--footer">
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
    </PriceStyles>
  );
};

export default Price;
