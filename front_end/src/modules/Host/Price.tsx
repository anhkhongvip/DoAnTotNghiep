import React, { ChangeEvent, useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { useCheck } from "../../contexts/checkContext";
import { CheckContextType } from "../../@types/check";
import { useAppDispatch } from "../../app/hooks";
import { setStep } from "../../features/room/roomSlice";
import { useData } from "../../pages/layout/Host/HostLayout";
import { useParams } from "react-router-dom";
import { findRoomByIdAsync } from "../../services/room.service";
const PriceStyles = styled.div`
  .price-page {
    max-width: 60rem;
    margin-top: 10rem;
    .title {
      font-size: 2.9rem;
      font-weight: bold;
    }
    .description {
      font-size: 1.7rem;
      margin: 2rem 0;
      color: gray;
      font-weight: bold;
    }
    .price-content {
      border: 1px solid gray;
      padding: 3.2rem;
      border-radius: 0.8rem;
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
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
      justify-content: center;
      align-items: center;
      font-size: 1.4rem;
      color: #c13515;
      font-weight: 500;
      margin-top: 1rem;
    }
  }
`;
type Props = {
  step: number;
};

const Price = ({ step }: Props) => {
  const dispatch = useAppDispatch();
  const { room_id } = useParams();
  const { data, setData } = useData();
  const [price, setPrice] = useState<number>(150000);
  const { check, setCheck } = useCheck() as CheckContextType;
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    dispatch(setStep(step));
    dispatch(findRoomByIdAsync(room_id!))
      .then((res) => {
        let { home } = res.payload.data;
        if (home.price) {
          setPrice(home.price);
        } else {
          setPrice(150000);
        }
        if (step > home.stepProgress) {
          setData({
            stepProgress: step,
            price,
            nextPage: `/become-a-host/${room_id}/receipt`,
            backPage: `/become-a-host/${room_id}/finish-setup`,
          });
        } else {
          setData({
            price,
            nextPage: `/become-a-host/${room_id}/receipt`,
            backPage: `/become-a-host/${room_id}/finish-setup`,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [step, dispatch]);

  useEffect(() => {
    if (price > 50000000 || price < 100000) {
      setCheck(false);
    } else {
      setData({
        ...data,
        price,
      });
      setCheck(true);
    }
  }, [price]);

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

  return (
    <PriceStyles>
      <div className="container-sm price-page">
        <h2 className="title">Bây giờ, hãy đặt mức giá mà bạn muốn</h2>
        <p className="description">
          Bạn có thể thay đổi giá này bất cứ lúc nào.
        </p>
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
                Vui lòng nhập giá cơ sở trong khoảng từ ₫100.000 đến
                ₫50.000.000.
              </span>
            </div>
          ) : null}
        </div>
      </div>
    </PriceStyles>
  );
};

export default Price;
