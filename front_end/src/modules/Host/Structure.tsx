import React, { useEffect } from "react";
import styled from "styled-components";
import { useAppDispatch } from "../../app/hooks";
import { setStep } from "../../features/room/roomSlice";
const StructureStyles = styled.div`
  .structure {
    &-title {
      font-weight: bold;
      font-size: 3rem;
      margin-bottom: 2rem;
    }

    &-group {
      margin-left: 2rem;
    }

    &-content {
      display: flex;
      flex-wrap: wrap;
      margin-left: -2rem;
      margin-bottom: 2rem;
      .radio-input {
        display: none;
        &:checked + .category-item {
          border-color: black;
        }
        &:checked + .category-item > .category-item-check::before {
          opacity: 1;
          visibility: visible;
        }
      }
      .category-item {
        display: inline-block;
        width: 30rem;
        height: 25rem;
        overflow: hidden;
        border-radius: 1rem;
        position: relative;
        cursor: pointer;
        border: 3px solid transparent;
        transition: all 0.4s ease-in-out;
        &::before {
          content: "";
          position: absolute;
          z-index: 1;
          inset: 0;
          background-color: #00000021;
        }

        &-title {
          position: absolute;
          z-index: 2;
          top: 0;
          left: 0;
          padding: 0.8rem 2rem;
          background-color: #00000052;
          border-radius: 3rem;
          transform: translate(2rem, 2rem);
          color: white;
        }
        &-check {
          position: absolute;
          z-index: 2;
          top: 0;
          right: 0;
          transform: translate(-2rem, 2rem);
          width: 3rem;
          height: 3rem;
          border-radius: 0.8rem;
          background-color: white;
          &:before {
            transition: all 0.4s ease-in-out;
            content: "";
            position: absolute;
            z-index: 3;
            top: 0;
            right: 0;
            width: 2.7rem;
            height: 1.5rem;
            transform: rotate(-45deg) translate(-0.5rem, 0.2rem);
            opacity: 0;
            visibility: hidden;
            border-left: 0.5rem solid #78e08f;
            border-bottom: 0.5rem solid #78e08f;
          }
        }
      }
    }
  }
`;

type Props = {
  step: number;
};

const Structure = ({ step }: Props) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setStep(step));
  }, [step, dispatch]);
  return (
    <StructureStyles>
      <div className="container-md">
        <h2 className="structure-title">
          Điều nào sau đây mô tả chính xác nhất về chỗ ở của bạn?
        </h2>
        <div className="structure-content">
          <div className="structure-group">
            <input
              id="category-demo"
              type="radio"
              name="categories"
              className="radio-input"
              value=""
            />
            <label htmlFor="category-demo" className="category-item">
              <img
                src="https://images.unsplash.com/photo-1518733057094-95b53143d2a7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=365&q=80"
                alt="img-categories"
              />

              <h3 className="category-item-title">Khách sạn</h3>
              <div className="category-item-check"></div>
            </label>
          </div>
          <div className="structure-group">
            <input
              id="category-1"
              type="radio"
              name="categories"
              className="radio-input"
              value=""
            />
            <label htmlFor="category-1" className="category-item">
              <img
                src="https://images.unsplash.com/photo-1518733057094-95b53143d2a7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=365&q=80"
                alt="img-categories"
              />

              <h3 className="category-item-title">Khách sạn</h3>
              <div className="category-item-check"></div>
            </label>
          </div>
        </div>
      </div>
    </StructureStyles>
  );
};

export default Structure;
