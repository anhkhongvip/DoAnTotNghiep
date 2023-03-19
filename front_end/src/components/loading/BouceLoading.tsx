import React from "react";
import styled from "styled-components";
interface styleProps {
  readonly bgColor?: string;
}
const BouceLoadingStyles = styled.div<styleProps>`
  @keyframes bounce-loader {
    to {
      opacity: 0.1;
      transform: translateY(-1rem);
    }
  }

  .bounce-loading {
    display: flex;
    justify-content: center;
    & > div {
      width: 1rem;
      height: 1rem;
      margin: 0 0.5rem;
      background: ${(props) => (props.bgColor ? props.bgColor : "#8385aa")};
      border-radius: 50%;
      animation: bounce-loader 0.6s infinite alternate;
    }
    & > div:nth-child(2) {
      animation-delay: 0.15s;
    }
    & > div:nth-child(3) {
      animation-delay: 0.3s;
    }
    & > div:last-child {
      animation-delay: 0.45s;
    }
  }
`;
type Props = {
  bgColor?: string;
  dotNumber?: number;
};
const BouceLoading = ({ bgColor, dotNumber = 5 }: Props) => {
  return (
    <BouceLoadingStyles bgColor={bgColor}>
      <div className="bounce-loading">
        {Array(dotNumber)
          .fill(0)
          .map((item, index) => (
            <div key={index}></div>
          ))}
      </div>
    </BouceLoadingStyles>
  );
};

export default BouceLoading;
