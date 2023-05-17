import React, { useRef, useState } from "react";
import styled from "styled-components";
import useOnClickOutside from "../../hooks/useClickOutside";
const DropdownStyles = styled.div`
  position: relative;
  
  .dropdown {
    &__heading {
      border-radius: 1rem;
      border: 1px solid black;
      background: white;
      display: flex;
      align-items: center;
      justify-content: space-between;
      min-height: 5.6rem;
      padding: 0 2rem;
      &--left {
        display: flex;
        flex-direction: column;
        font-size: 1.4rem;
        .label-header {
          font-weight: 600;
        }
      }
    }

    &__content {
      position: absolute;
      top: 105%;
      left: 0;
      width: 100%;
      border-radius: 1rem;
      border: 1px solid gray;
      background-color: #ffff;
      opacity: 0;
      visibility: hidden;
      transition: 0.2s all linear;
      z-index: 10;
      &.show {
        opacity: 1;
        visibility: visible;
      }
      &--item-style-1 {
        cursor: pointer;
        transition: 0.2s all linear;

        &:hover {
          background-color: #8080806b;
        }
      }
      &--item-style-2 {
        padding: 1rem 2rem;
        transition: 0.2s all linear;
        & .dropdown-info {
          .btn-tool {
            border: 1px solid gray;
            color: gray;
            border-radius: 2rem;
            transition: 0.2s all linear;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 3.2rem;
            height: 3.2rem;
            &:hover {
              border-color: black;
              color: black;
            }
            &.not-allow {
              cursor: not-allowed;
              color: transparent !important;
              border-color: transparent !important;
              &:hover {
                color: transparent !important;
                border-color: transparent !important;
              }
            }
          }
          .quantity {
            margin: 0 1.5rem;
          }
        }
      }
    }
  }
`;

type Props = {
  labelHeader: string;
  labelName?: string;
  children?: React.ReactNode;
};
const Dropdown = ({ labelHeader, labelName, children }: Props) => {
  const [show, setShow] = useState(false);
  const nodeRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(nodeRef, () => setShow(false));
  return (
    <DropdownStyles ref={nodeRef}>
      <div className="dropdown__heading" onClick={() => setShow(!show)}>
        <div className="dropdown__heading--left">
          <span className="label-header">{labelHeader}</span>
          <span className="label-name">{labelName}</span>
        </div>

        {show ? (
          <i className="fa-regular fa-chevron-down"></i>
        ) : (
          <i className="fa-regular fa-chevron-up"></i>
        )}
      </div>
      <div className={`dropdown__content ${show ? "show" : ""}`}>
        {children}
      </div>
    </DropdownStyles>
  );
};

export default Dropdown;
