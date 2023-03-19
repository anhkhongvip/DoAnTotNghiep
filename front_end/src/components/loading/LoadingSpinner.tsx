import React from "react";
import styled from "styled-components";

interface styleProps {
  readonly size: string;
  readonly borderSize: string;
  readonly borderColor?: string;
}

const SpinnerStyles = styled.div<styleProps>`
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  border: ${(props) => props.borderSize} solid;
  border-color: ${(props) => props.borderColor};
  border-top: ${(props) => props.borderSize} solid transparent;
  border-bottom: ${(props) => props.borderSize} solid transparent;
  border-radius: 100rem;
  display: inline-block;
  animation: spinner 1s infinite linear;
  @keyframes spinner {
    100% {
      transform: rotate(360deg);
    }
  }
`;
type Props = {
  size?: string;
  borderSize?: string;
  borderColor?: string;
}
const LoadingSpinner = ({
  size = "35px",
  borderSize = "5px",
  borderColor = "white",
}: Props) => {
  return (
    <SpinnerStyles
      size={size}
      borderSize={borderSize}
      borderColor={borderColor}
    ></SpinnerStyles>
  );
};

export default LoadingSpinner;
