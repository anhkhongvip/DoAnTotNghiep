import React, { Fragment, useEffect } from "react";
import styled from "styled-components";
import ReactDOM from "react-dom";
const ModalStyles = styled.div`
  .modal {
    position: fixed;
    z-index: 151;
    top: 50%;
    left: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: 0.3s all linear;
    transform: translate(-50%, -50%) scale(0);
    &.show {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }
    &-content {
      padding: 4rem 0;
      background-color: #fff;
      border-radius: 2rem;
      position: relative;
    }
    &-body {
      padding: 0 5rem;
      max-height: 50rem;
      overflow-y: auto;
      &::-webkit-scrollbar {
        display: none;
      }
    }
    &-title {
      font-size: 4rem;
      font-weight: 700;
      padding: 0 2rem;
    }
    .btn-close-modal {
      position: absolute;
      top: -3%;
      right: 0%;
      transform: translateX(50%);
      background-color: #ffff;
      width: 4rem;
      height: 4rem;
      border-radius: 2rem;
    }

    &-avatar {
      width: 72rem;
      height: 40rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;

type Props = {
  children?: React.ReactNode;
  toggle: boolean;
  title: string;
  closeFn: (event: React.MouseEvent<HTMLElement>) => void;
};

const Modal = ({
  children,
  toggle = false,
  title,
  closeFn = () => null,
  ...props
}: Props) => {
  useEffect(() => {
    if (toggle) {
      document.querySelector("body")!.style.overflowY = "hidden";
    } else {
      document.querySelector("body")!.style.overflowY = "auto";
    }
  }, [toggle]);
  if (typeof document === "undefined") return null;
  return ReactDOM.createPortal(
    <ModalStyles>
      <div
        className={`overlay ${toggle ? "block" : "hidden"}`}
        onClick={closeFn}
      ></div>
      <div className={`modal ${toggle ? "show" : ""}`}>
        <div className="modal-content">
          <div className="modal-header">
            <button
              type="button"
              className="btn btn-close-modal"
              onClick={closeFn}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.225 7L13.7375 1.4875C14.0875 1.1375 14.0875 0.6125 13.7375 0.2625C13.3875 -0.0875 12.8625 -0.0875 12.5125 0.2625L7 5.775L1.4875 0.2625C1.1375 -0.0875 0.6125 -0.0875 0.2625 0.2625C-0.0874998 0.6125 -0.0874998 1.1375 0.2625 1.4875L5.775 7L0.2625 12.5125C0.0875002 12.6875 0 12.8625 0 13.125C0 13.65 0.35 14 0.875 14C1.1375 14 1.3125 13.9125 1.4875 13.7375L7 8.225L12.5125 13.7375C12.6875 13.9125 12.8625 14 13.125 14C13.3875 14 13.5625 13.9125 13.7375 13.7375C14.0875 13.3875 14.0875 12.8625 13.7375 12.5125L8.225 7Z"
                  fill="#84878B"
                />
              </svg>
            </button>
            <h4 className="modal-title text-center mb-7">{title}</h4>
          </div>
          <div className="modal-body">{children}</div>
          <div className="modal-footer"></div>
        </div>
      </div>
    </ModalStyles>,
    document.querySelector("body")!
  );
};

export default Modal;
