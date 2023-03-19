import React from "react";
import styled from "styled-components";

const ProgressBarStyles = styled.div`
  width: 100%;
  .container-bar {
    height: 0.6rem;
    width: 100%;
    background-color: #dddddd;
  }
  .filter-bar {
    transition: width 2s ease-in-out;
    height: 100%;
    width: 50%;
    background-color: #000000;
  }
`;

type Props = {
  className?: string;
};

const ProgressBar = ({ className, ...props }: Props) => {
  return (
    <ProgressBarStyles className={className}>
      <div className="container-bar">
        <div className="filter-bar"></div>
      </div>
    </ProgressBarStyles>
  );
};

export default ProgressBar;
