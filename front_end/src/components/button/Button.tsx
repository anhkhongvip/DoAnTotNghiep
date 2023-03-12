import styled from "styled-components";
import React from "react";
import { LoadingSpinner } from "../loading";
interface styleProps {
  readonly width?: string;
  readonly height?: string;
  readonly fontSize?: string;
  readonly color?: string;
}
const ButtonStyles = styled.div<styleProps>`
  .btn {
    &__custom {
      font-size: ${(props) => (props.fontSize ? props.fontSize : "2rem")};
      width: ${(props) => (props.width ? props.width : "auto")};
      height: ${(props) => (props.height ? props.height : "4.8rem")};
      color: ${(props) => (props.color ? props.color : "#ffff")};
    }
    &__default {
    }

    &__submit {
      border-radius: 0.8rem;
      background-color: #316bff;
      font-weight: 700;
      color: white;
      display: block;
      transition: linear 0.1s;
      &:hover {
        background-color: #316bffc2;
      }
    }
    &__cancel {
      font-weight: 700;
    }
  }
`;

type Props = {
  isLoading?: boolean;
  children?: React.ReactNode;
  className?: string;
  width?: string;
  height?: string;
  fontSize?: string;
  color?: string;
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
  color,
  fontSize,
  type = "button",
  ...props
}: Props) => {
  const child = !!isLoading ? <LoadingSpinner></LoadingSpinner> : children;
  return (
    <ButtonStyles
      width={width}
      height={height}
      fontSize={fontSize}
      color={color}
    >
      <button className={className} type={type} {...props}>
        {child}
      </button>
    </ButtonStyles>
  );
};

export default Button;
