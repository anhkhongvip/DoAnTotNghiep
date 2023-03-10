import styled from "styled-components";
import React from "react";
import { LoadingSpinner } from "../loading";
interface styleProps {
  readonly width?: string;
  readonly height?: string;
}
const ButtonStyles = styled.div<styleProps>`
  .btn {
    &__default {
    }

    &__submit {
      width: ${(props) => (props.width ? props.width : "auto")};
      height: ${(props) => (props.height ? props.height : "4.8rem")};
      border-radius: 0.8rem;
      background-color: #316bff;
      font-size: 2rem;
      font-weight: 700;
      color: white;
      display: block;
    }
  }
`;

type Props = {
  isLoading?: boolean;
  children?: React.ReactNode;
  className?: string;
  width?: string;
  height?: string;
  type: "submit" | "reset" | "button" | undefined;
  disabled?: boolean;
  onClick?: () => void;
};
const Button = ({
  isLoading,
  children,
  className,
  width,
  height,
  type = "button",
  ...props
}: Props) => {
  const child = !!isLoading ? <LoadingSpinner></LoadingSpinner> : children;
  return (
    <ButtonStyles width={width} height={height}>
      <button className={className} type={type} {...props}>
        {child}
      </button>
    </ButtonStyles>
  );
};

export default Button;
