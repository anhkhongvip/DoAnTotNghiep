import React from "react";
import styled from "styled-components";
import { CheckContextType } from "../../../@types/check";
import { Button } from "../../../components/button";
import { ProgressBar } from "../../../components/progress";
import { useCheck } from "../../../contexts/checkContext";
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
const Footer = () => {
  const { check } = useCheck() as CheckContextType;
  return (
    <FooterStyles>
      <div className="footer-header flex">
        <ProgressBar className="mr-3"></ProgressBar>
        <ProgressBar className="mr-3"></ProgressBar>
        <ProgressBar></ProgressBar>
      </div>
      <div className="footer-content">
        <button className="btn-back">Quay lại</button>
        <button className={`btn-next ${check ? 'not-allow' : ''}`} disabled={check} onClick={() => console.log("tiếp")}>Tiếp theo</button>
      </div>
    </FooterStyles>
  );
};

export default Footer;
