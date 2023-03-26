import React, { useEffect, useState } from "react";
import styled from "styled-components";
interface styleProps {
  readonly width?: string
}
const ProgressBarStyles = styled.div<styleProps>`
  width: 100%;
  .container-bar {
    height: 0.6rem;
    width: 100%;
    background-color: #dddddd;
  }
  .filter-bar {
    transition: width 2s ease-in-out;
    height: 100%;
    width: ${props => props.width ? props.width : 'auto'};
    background-color: #000000;
  }
`;

type Props = {
  className?: string;
  width: string;
};

const ProgressBar = ({ className, width, ...props }: Props) => {
  console.log(width);
  
  return (
    <ProgressBarStyles className={className} width={width}>
      <div className="container-bar">
        <div className="filter-bar"></div>
      </div>
    </ProgressBarStyles>
  );
};

export default React.memo(ProgressBar);
