import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAppDispatch } from "../../app/hooks";
import { findRoomsAsync } from "../../services/room.service";
const HomeRecommendedStyles = styled.div`
  margin-top: 7rem;
  padding: 2rem 0;
  .home-recommend {
    &__header {
      .title {
        font-size: 3rem;
        font-weight: bold;
      }
    }
    &__item {
      border-radius: 0.8rem;
      padding: 1rem 1rem;
      margin-left: 1rem;
      width: calc(100% / 4 - 1rem);
      cursor: pointer;
    }
    &__image {
      width: 100%;
      height: 25rem;
      overflow: hidden;
      border-radius: 0.8rem;
    }
    &__info {
      .rating-amount {
        font-size: 1.5rem;
        color: gray;
      }
      .title {
        width: 80%;
      }
    }
    &__rating {
    }

    &__content {
      margin-left: -1rem;
      flex-wrap: wrap;
      .title {
        font-size: 2rem;
        font-weight: 600;
      }
      .location {
        font-size: 1.5rem;
        &-icon {
          color: #84878b;
          margin-top: auto;
        }
      }
      .price {
        display: block;
        margin-top: 0.5rem;
        font-size: 2rem;
        text-align: right;
      }
    }
  }
`;
const HomeRecommend = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [listHome, setListHome] = useState([]);
  useEffect(() => {
    dispatch(findRoomsAsync({ status: 1 }))
      .then((res) => {
        const { homes } = res.payload.data;
        setListHome(homes);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <HomeRecommendedStyles>
      <div className="home-recommend__header text-center">
        <h2 className="title">Địa điểm khuyến nghị dành cho bạn</h2>
      </div>
      <div className="home-recommend__content flex mt-10">
        {listHome.map((item: any, key: number) => (
          <div
            className="home-recommend__item"
            key={item.id}
            onClick={() => navigate(`rooms/${item.id}`)}
          >
            <div className="home-recommend__image">
              <img src={item.image_main} alt="image_main" />
            </div>
            <div className="home-recommend__body">
              <div className="home-recommend__info">
                <div className="group flex justify-between mt-3">
                  <h3 className="title sp-line">{item.title}</h3>
                  <div className="home-recommend__rating  flex items-center">
                    <svg
                      width="14"
                      height="15"
                      viewBox="0 0 14 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M7 12.4532L3.43074 14.4147C2.91697 14.6971 2.31846 14.2374 2.4171 13.6362L3.09765 9.48853L0.213886 6.5502C-0.203981 6.12442 0.0251203 5.37905 0.600728 5.29162L4.59003 4.68568L6.37322 0.908861C6.6306 0.363713 7.3694 0.363713 7.62678 0.908861L9.40997 4.68568L13.3993 5.29162C13.9749 5.37905 14.204 6.12442 13.7861 6.5502L10.9023 9.48853L11.5829 13.6362C11.6815 14.2374 11.083 14.6971 10.5693 14.4147L7 12.4532Z"
                        fill="#FFD166"
                      />
                    </svg>
                    <div className="rating-number mr-4 ml-4">
                      {item.rate_star ? item.rate_star : "Mới"}
                    </div>
                  </div>
                </div>

                <div className="location sp-line">
                  <div className="location-icon">
                    <svg
                      width="14"
                      height="21"
                      viewBox="0 0 14 21"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-5 inline-block"
                    >
                      <path
                        d="M7 0.507324C5.14348 0.507324 3.36301 1.26589 2.05025 2.61615C0.737498 3.96641 0 5.79775 0 7.7073C0 12.5673 6.16875 18.0573 6.43125 18.2913C6.58974 18.4307 6.79144 18.5073 7 18.5073C7.20856 18.5073 7.41026 18.4307 7.56875 18.2913C7.875 18.0573 14 12.5673 14 7.7073C14 5.79775 13.2625 3.96641 11.9497 2.61615C10.637 1.26589 8.85652 0.507324 7 0.507324ZM7 16.3923C5.13625 14.5923 1.75 10.7133 1.75 7.7073C1.75 6.27514 2.30312 4.90163 3.28769 3.88894C4.27226 2.87624 5.60761 2.30732 7 2.30732C8.39239 2.30732 9.72775 2.87624 10.7123 3.88894C11.6969 4.90163 12.25 6.27514 12.25 7.7073C12.25 10.7133 8.86375 14.6013 7 16.3923ZM7 4.10731C6.30777 4.10731 5.63108 4.31845 5.0555 4.71402C4.47993 5.10959 4.03133 5.67183 3.76642 6.32964C3.50151 6.98746 3.4322 7.71129 3.56725 8.40962C3.7023 9.10795 4.03564 9.74941 4.52513 10.2529C5.01461 10.7563 5.63825 11.0992 6.31718 11.2381C6.99612 11.377 7.69985 11.3057 8.33939 11.0333C8.97893 10.7608 9.52556 10.2994 9.91014 9.70735C10.2947 9.11533 10.5 8.41931 10.5 7.7073C10.5 6.75252 10.1313 5.83685 9.47487 5.16172C8.8185 4.4866 7.92826 4.10731 7 4.10731ZM7 9.50729C6.65388 9.50729 6.31554 9.40173 6.02775 9.20394C5.73997 9.00616 5.51566 8.72503 5.38321 8.39613C5.25076 8.06722 5.2161 7.7053 5.28363 7.35614C5.35115 7.00697 5.51782 6.68625 5.76256 6.43451C6.00731 6.18278 6.31913 6.01135 6.65859 5.94189C6.99806 5.87244 7.34993 5.90809 7.6697 6.04432C7.98947 6.18056 8.26278 6.41127 8.45507 6.70728C8.64736 7.00329 8.75 7.3513 8.75 7.7073C8.75 8.18469 8.56563 8.64252 8.23744 8.98009C7.90925 9.31765 7.46413 9.50729 7 9.50729Z"
                        fill="#B1B5C4"
                      />
                    </svg>
                    {item.address}
                  </div>
                </div>
                <small className="price">
                  <small>từ</small> {item.price} <sup>đ</sup> /đêm
                </small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </HomeRecommendedStyles>
  );
};

export default HomeRecommend;
