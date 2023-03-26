import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { CheckContextType } from "../../../@types/check";
import { Button } from "../../../components/button";
import { ProgressBar } from "../../../components/progress";
import { useCheck } from "../../../contexts/checkContext";
import { selectRoom } from "../../../features/room/roomSlice";
import { useAppSelector } from "../../../app/hooks";
const FooterStyles = styled.div`
  background-color: white;
  margin-top: 2rem;
  .footer-content {
    padding: 3rem 4rem;
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
      padding: 1rem 3rem;
      color: white;
      border-radius: 0.8rem;
      &:hover {
        background-color: black;
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
};



const Footer = ({ handleNext }: Props) => {
  const { check } = useCheck() as CheckContextType;
  const roomSelector = useAppSelector(selectRoom);
  console.log(roomSelector);
  return (
    <FooterStyles>
      <div className="footer-header flex">
        <ProgressBar className="mr-3" width={`${roomSelector.step < 5 ? `${(roomSelector.step - 1) * 33.33}%` : '100%' }`}></ProgressBar>
        <ProgressBar className="mr-3" width={`${roomSelector.step > 5 && roomSelector.step < 10 ? `${(roomSelector.step - 5) * 20}%` : ( roomSelector.step > 9 ? '100%' : '0%') }`}></ProgressBar>
        <ProgressBar width={`${roomSelector.step > 9  ? `${(roomSelector.step - 10) * 33.33}%` : ( roomSelector.step > 12 ? '100%' : '0%') }`}></ProgressBar>
      </div>
      <div className="footer-content">
        <button className="btn-back">Quay lại</button>
        <button
          className={`btn-next ${!check ? "not-allow" : ""}`}
          disabled={!check}
          onClick={handleNext}
        >
          Tiếp theo
        </button>
      </div>
    </FooterStyles>
  );
};

export default Footer;
