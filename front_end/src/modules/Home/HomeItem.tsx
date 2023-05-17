import React from "react";
import styled from "styled-components";
import { fommatCurrency } from "../../configs/formatCurrency";
const HomeItemStyles = styled.div`
  display: flex;
  margin-bottom: 3rem;
  .room {
    &-image {
      border-radius: 0.8rem 0 0 0.8rem;
      overflow: hidden;
      width: 37rem;
      height: 30rem;
      flex-shrink: 0;
    }
    &-content {
      padding: 0 2rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      &__title {
        font-size: 2.5rem;
        font-weight: bold;
      }
    }
    &-services {
      margin-top: 3rem;
      &__list {
      }
      &__item {
        margin-top: 1rem;
        display: flex;
        color: #3b3e44;
        &:first-child .room-services__item--icon {
          transform: rotate(45deg);
        }

        &--title {
          margin-left: 1rem;
          font-weight: 600;
        }
      }
    }
    &-booking {
      width: 20rem;
      font-weight: 600;
      &-price {
        font-size: 2rem;
        small {
          color: gray;
        }
      }
      &-btn {
        margin-top: 2rem;
        padding: 1rem 0;
        color: white;
        border-radius: 2rem;
        background-color: #3b71fe;
      }
    }
  }
`;
type Props = {
  item?: any;
};
const HomeItem = ({ item, ...props }: Props) => {
  return (
    <HomeItemStyles>
      <div className="room-image">
        <img src={item?.image_main} alt="" />
      </div>
      <div className="room-content">
        <h2 className="room-content__title">{item?.title}</h2>
        <div className="room_content__rate-star">
          <i className="fa-solid fa-star" style={{ color: "#ffc542" }}></i>{" "}
          {item?.rate_star ? (
            <>
              <span>
                {(
                  Number(item?.rate_star) / Number(item?.amount_reviews)
                ).toFixed(1)}
              </span>{" "}
              ({item?.amount_reviews} đánh giá)
            </>
          ) : (
            "Mới"
          )}
        </div>
        <div className="room-location">
          <svg
            width="17"
            height="20"
            viewBox="0 0 17 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.2522 0C6.13047 0 4.09563 0.842855 2.59534 2.34315C1.09505 3.84344 0.252197 5.87827 0.252197 8C0.252197 13.4 7.3022 19.5 7.6022 19.76C7.78333 19.9149 8.01384 20.0001 8.2522 20.0001C8.49055 20.0001 8.72106 19.9149 8.9022 19.76C9.2522 19.5 16.2522 13.4 16.2522 8C16.2522 5.87827 15.4093 3.84344 13.9091 2.34315C12.4088 0.842855 10.3739 0 8.2522 0ZM8.2522 17.65C6.1222 15.65 2.2522 11.34 2.2522 8C2.2522 6.4087 2.88434 4.88258 4.00956 3.75736C5.13478 2.63214 6.6609 2 8.2522 2C9.8435 2 11.3696 2.63214 12.4948 3.75736C13.6201 4.88258 14.2522 6.4087 14.2522 8C14.2522 11.34 10.3822 15.66 8.2522 17.65ZM8.2522 4C7.46107 4 6.68771 4.2346 6.02992 4.67412C5.37212 5.11365 4.85943 5.73836 4.55668 6.46927C4.25393 7.20017 4.17471 8.00444 4.32906 8.78036C4.4834 9.55628 4.86436 10.269 5.42377 10.8284C5.98318 11.3878 6.69591 11.7688 7.47184 11.9231C8.24776 12.0775 9.05203 11.9983 9.78293 11.6955C10.5138 11.3928 11.1385 10.8801 11.5781 10.2223C12.0176 9.56448 12.2522 8.79113 12.2522 8C12.2522 6.93913 11.8308 5.92172 11.0806 5.17157C10.3305 4.42143 9.31306 4 8.2522 4ZM8.2522 10C7.85663 10 7.46996 9.8827 7.14106 9.66294C6.81216 9.44318 6.55581 9.13082 6.40444 8.76537C6.25306 8.39991 6.21346 7.99778 6.29063 7.60982C6.3678 7.22186 6.55828 6.86549 6.83798 6.58579C7.11769 6.30608 7.47405 6.1156 7.86202 6.03843C8.24998 5.96126 8.65211 6.00087 9.01756 6.15224C9.38302 6.30362 9.69537 6.55996 9.91514 6.88886C10.1349 7.21776 10.2522 7.60444 10.2522 8C10.2522 8.53043 10.0415 9.03914 9.66641 9.41421C9.29134 9.78929 8.78263 10 8.2522 10Z"
              fill="#84878B"
            />
          </svg>
          <h2 className="room-location-title">{item?.address}</h2>
        </div>
        <div className="room-info">
          <div className="room-booking flex flex-col justify-end">
            <span className="room-booking-price text-center">
            {fommatCurrency("vi-VN", "VND").format(item?.price)}<small>/ Đêm</small>
            </span>
            <button className="btn room-booking-btn">Đặt ngay</button>
          </div>
        </div>
      </div>
    </HomeItemStyles>
  );
};

export default HomeItem;
