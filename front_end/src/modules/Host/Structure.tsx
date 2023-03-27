import React, { useEffect, ChangeEvent } from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setStep } from "../../features/room/roomSlice";
import { useParams } from "react-router-dom";
import { useData } from "../../pages/layout/Host/HostLayout";
import { useCheck } from "../../contexts/checkContext";
import { CheckContextType } from "../../@types/check";
import { getCategoriesAsync } from "../../services/category.service";
import {
  ICategory,
  selectCategory,
} from "../../features/category/categorySlice";
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
      }
    }
  }
`;

type Props = {
  step: number;
};

const Structure = ({ step }: Props) => {
  const dispatch = useAppDispatch();
  const { room_id } = useParams();
  const { data, setData } = useData();
  const { setCheck } = useCheck() as CheckContextType;
  const categorySelector = useAppSelector(selectCategory);
  const handleChange = (event: ChangeEvent) => {
    let { value } = event.target as HTMLInputElement;
    setData({ ...data, categoryId: value });
    setCheck(true);
  };

  useEffect(() => {
    setCheck(false);
    dispatch(setStep(step));
    dispatch(getCategoriesAsync());
    setData({
      nextPage: `/become-a-host/${room_id}/location`,
      backPage: `/become-a-host/${room_id}/about-your-place`,
    });
  }, [step, dispatch]);
  return (
    <StructureStyles>
      <div className="container-md">
        <h2 className="structure-title">
          Điều nào sau đây mô tả chính xác nhất về chỗ ở của bạn?
        </h2>
        <div className="structure-content">
          {categorySelector &&
            categorySelector.categories.map(
              (item: ICategory, index: number) => (
                <div className="structure-group" key={index}>
                  <input
                    id={`category-${item.id}`}
                    type="radio"
                    name="categories"
                    className="radio-input"
                    value={item.id}
                    onChange={handleChange}
                  />
                  <label
                    htmlFor={`category-${item.id}`}
                    className="category-item"
                  >
                    <img src={item.image} alt="img-categories" />

                    <h3 className="category-item-title">{item.name}</h3>
                  </label>
                </div>
              )
            )}
        </div>
      </div>
    </StructureStyles>
  );
};

export default Structure;
