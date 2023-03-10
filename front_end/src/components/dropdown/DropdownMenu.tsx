import React from "react";
import styled from "styled-components";
const DropdownMenuStyles = styled.div`
  position: absolute;
  z-index: 99999;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: white;
  border: 1px solid rgb(229 231 235);
  border-radius: 0.8rem;
  display: flex;
  flex-direction: column;
  opacity: 0;
  visibility: hidden;
  .dropdownMenu-item {
    padding: 2rem 2rem;
    font-size: 1.4rem;
    font-weight: 600;
    width: 24rem;
    svg {
      margin-right: 2rem;
    }
  }
  &.showDropDown {
    opacity: 1;
    visibility: visible;
  }
`;

type Props = {
  children?: React.ReactNode;
  coords: DOMRect;
  show: boolean;
};

const DropdownMenu = ({ children, coords, show, ...props }: Props) => {
  if (typeof document === "undefined") return null;
  return (
    <DropdownMenuStyles
      className={`${show ? "showDropDown" : ""}`}
      style={{
        left: coords?.left,
        top: coords
          ? coords?.top + coords?.height + window.scrollY + 10
          : "100%",
        width: coords?.width,
      }}
    >
      {children}
    </DropdownMenuStyles>
  );
};

export default DropdownMenu;
