import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
const CategoryCardStyles = styled.div`
  .category-card {
    display: inline-block;
    width: 100%;
    height: 40.5rem;
    &__image {
      height: inherit;
      &.img-content {
        border-radius: 1rem;
        overflow: hidden;
        position: relative;
        &::after {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 10;
          background-color: #00000029;
        }
      }
    }
    &__header {
      position: absolute;
      top: 5%;
      left: 10%;
      z-index: 15;
      padding: 0.8rem 2rem;
      font-size: 1.5rem;
      background-color: #00000029;
      color: #fff;
      border-radius: 3rem;
    }
    &__info {
      position: absolute;
      z-index: 15;
      bottom: 5%;
      left: 10%;
      color: #fcfcfd;
      .title {
        font-weight: 600;
        font-size: 3rem;
      }
      .amount {
        font-size: 1.5rem;
      }
    }
  }
`;

interface itemCategory {
  id: number;
  name: string;
  image: string;
}

type Props = {
  item: itemCategory;
  children?: JSX.Element;
};

const CategoryCard = ({ item, children }: Props) => {
  return (
    <CategoryCardStyles>
      <Link to="/" className="category-card">
        <div className="category-card__image img-content">
          <img src={item.image} alt="" />
        </div>
        <div className="category-card__header">
          <h3 className="title">{item.name}</h3>
        </div>
        <div className="category-card__info">
          <h3 className="title">{item.name}</h3>
          <span className="amount">
            {1000} {item.name}
          </span>
        </div>
      </Link>
    </CategoryCardStyles>
  );
};

export default CategoryCard;
