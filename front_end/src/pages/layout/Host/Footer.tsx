import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { CheckContextType } from "../../../@types/check";
import { Button } from "../../../components/button";
import { ProgressBar } from "../../../components/progress";
import { useCheck } from "../../../contexts/checkContext";
import { selectRoom } from "../../../features/room/roomSlice";
import { useAppSelector } from "../../../app/hooks";
import { BouceLoading } from "../../../components/loading";
const FooterStyles = styled.div`
  background-color: white;
  margin-top: 2rem;
  .footer-content {
    width: 100%;
    padding: 2rem 4rem;
    display: flex;
    justify-content: space-between;
    .btn-back {
      text-decoration: underline;
    }
    .btn-back,
    .btn-next {
      font-weight: 600;
    }

    .btn-next {
      background-color: #222222;
      width: 15rem;
      height: 5rem;
      color: white;
      border-radius: 0.8rem;
      &:hover {
        background-color: black;
      }
      &-begin {
        margin-left: auto;
        width: 15rem;
        height: 5rem;
        color: white;
        font-weight: 700;
        border-radius: 0.8rem;
        background-image: linear-gradient(
          to right,
          #e61e4d 27.5%,
          #e31c5f 40%,
          #d70466 57.5%,
          #bd1e59 75%,
          #bd1e59 100%
        );
      }
    }
  }

  .btn-next.not-allow {
    cursor: not-allowed;
    background-color: #dddddd;
    &:hover {
      background-color: #dddddd;
    }
  }
`;

type Props = {
  handleNext: () => void;
  handleBack: () => void;
  nextPage: string;
  backPage: string;
  loadingNext: boolean;
  loadingBack: boolean;
};

const Footer = ({
  handleNext,
  handleBack,
  nextPage,
  backPage,
  loadingNext,
  loadingBack,
}: Props) => {
  const { check } = useCheck() as CheckContextType;
  const roomSelector = useAppSelector(selectRoom);
  return (
    <FooterStyles>
      <div className="footer-header flex">
        <ProgressBar
          className="mr-3"
          width={`${
            roomSelector.step < 5 ? `${(roomSelector.step - 1) * 25}%` : "100%"
          }`}
        ></ProgressBar>
        <ProgressBar
          className="mr-3"
          width={`${
            roomSelector.step > 5 && roomSelector.step < 10
              ? `${(roomSelector.step - 5) * 20}%`
              : roomSelector.step > 9
              ? "100%"
              : "0%"
          }`}
        ></ProgressBar>
        <ProgressBar
          width={`${
            roomSelector.step > 9
              ? `${(roomSelector.step - 10) * 33.33}%`
              : roomSelector.step > 12
              ? "100%"
              : "0%"
          }`}
        ></ProgressBar>
      </div>
      <div className="footer-content">
        {backPage ? (
          <button className="btn-back" onClick={handleBack}>
            {loadingBack ? <BouceLoading dotNumber={3} /> : " Quay lại"}
          </button>
        ) : null}
        <button
          className={`${(nextPage === 'begin' || nextPage === 'end') ? 'btn-next-begin' : 'btn-next'}  ${!check ? "not-allow" : ""}`}
          disabled={!check}
          onClick={handleNext}
        >
          {loadingNext ? <BouceLoading dotNumber={3} bgColor="#ffff"/> : (nextPage === 'begin' ? "Bắt đầu" : (nextPage === 'end' ? 'Đăng' : 'Tiếp theo'))}
        </button>
      </div>
    </FooterStyles>
  );
};

export default Footer;
