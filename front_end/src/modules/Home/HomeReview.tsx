import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useAppDispatch } from "../../app/hooks";
import { getReviewAsync } from "../../services/review.service";
const HomeReviewStyles = styled.div`
  margin-top: 5rem;
  .rate-title {
    font-size: 2rem;
    font-weight: bold;
  }
  .rate-list {
    &-review {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      justify-content: space-between;
    }
    &-item {
      width: calc(50% - 10rem);
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 2rem;
      &__name {
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .rate-bar {
        width: 50%;
        margin-right: 10px;
        &-bg {
          width: 100%;
          height: 4px;
          background: #dddddd;
          position: relative;
        }
        &-value {
          position: absolute;
          z-index: 2;
          top: 0;
          left: 0;
          height: inherit;
          background-color: #222222;
        }
      }
    }
    &-feedback {
      margin-top: 5rem;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .item-feedback {
        width: calc(50% - 10rem);
        margin-bottom: 5rem;
        .item-author {
          &-img {
            width: 4rem;
            height: 4rem;
            border-radius: 50%;
            overflow: hidden;
          }
          &-name {
            font-size: 1.8rem;
            font-weight: bold;
          }
        }
        .item-date-review {
          color: #717171;
        }
        .feedback-content {
          margin-top: 2rem;
          font-weight: 500;
        }
      }
    }
  }
`;
type Props = {
  home_id: string;
  setReviewData: (reviewData: any) => void;
};
const HomeReview = ({ home_id, setReviewData }: Props) => {
  const dispatch = useAppDispatch();
  const [reviews, setReviews] = useState<any>([]);
  const [totalReview, setTotalReview] = useState<any>({
    cleanliness_rating: 0,
    communication_rating: 0,
    check_in_rating: 0,
    accuracy_rating: 0,
    overall_rating: 0,
  });
  useEffect(() => {
    dispatch(getReviewAsync({ home_id }))
      .then((res) => {
        const { reviews } = res.payload.data;
        setReviews(reviews);
        let sizeReview = reviews.length;
        let cleanliness_rating = 0;
        let communication_rating = 0;
        let check_in_rating = 0;
        let accuracy_rating = 0;
        let overall_rating = 0;

        if (reviews.length > 0) {
          reviews.forEach((item: any, index: number) => {
            cleanliness_rating += item.cleanliness_rating;
            communication_rating += item.communication_rating;
            check_in_rating += item.check_in_rating;
            accuracy_rating += item.accuracy_rating;
            overall_rating += item.overall_rating;
          });

          setTotalReview({
            cleanliness_rating: cleanliness_rating / sizeReview,
            communication_rating: communication_rating / sizeReview,
            check_in_rating: check_in_rating / sizeReview,
            accuracy_rating: accuracy_rating / sizeReview,
            overall_rating: overall_rating / sizeReview,
          });

          setReviewData({
            countReview: sizeReview,
            overallReview: overall_rating / sizeReview,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [home_id]);
  return (
    <HomeReviewStyles>
      <div className="home-review">
        <div className="group flex items-center">
          <i className="fa-solid fa-star"></i>{" "}
          <span className="rate-title ml-5">
            {reviews.length > 0 ? (
              <>
                {totalReview?.overall_rating.toFixed(1)} · {reviews.length} đánh giá
              </>
            ) : (
              "Mới"
            )}
          </span>
        </div>

        <div className="rate-list-review">
          <div className="rate-list-item">
            <div className="rate-list-item__name">Mức độ sạch sẽ</div>
            <div className="rate-bar">
              <div className="rate-bar-bg">
                <span
                  className="rate-bar-value"
                  style={{
                    width: `${(totalReview?.cleanliness_rating / 5) * 100}%`,
                  }}
                ></span>
              </div>
            </div>
            <div className="rate-value">{totalReview?.cleanliness_rating.toFixed(1)}</div>
          </div>
          <div className="rate-list-item">
            <div className="rate-list-item__name">Độ chính xác</div>
            <div className="rate-bar">
              <div className="rate-bar-bg">
                <span
                  className="rate-bar-value"
                  style={{
                    width: `${(totalReview?.accuracy_rating / 5) * 100}%`,
                  }}
                ></span>
              </div>
            </div>
            <div className="rate-value">{totalReview?.accuracy_rating.toFixed(1)}</div>
          </div>
          <div className="rate-list-item">
            <div className="rate-list-item__name">Giao tiếp</div>
            <div className="rate-bar">
              <div className="rate-bar-bg">
                <span
                  className="rate-bar-value"
                  style={{
                    width: `${(totalReview?.communication_rating / 5) * 100}%`,
                  }}
                ></span>
              </div>
            </div>
            <div className="rate-value">
              {totalReview?.communication_rating.toFixed(1)}
            </div>
          </div>
          <div className="rate-list-item">
            <div className="rate-list-item__name">Nhận phòng</div>
            <div className="rate-bar">
              <div className="rate-bar-bg">
                <span
                  className="rate-bar-value"
                  style={{
                    width: `${(totalReview?.check_in_rating / 5) * 100}%`,
                  }}
                ></span>
              </div>
            </div>
            <div className="rate-value">{totalReview?.check_in_rating.toFixed(1)}</div>
          </div>
        </div>
        <div className="rate-list-feedback">
          {reviews.length > 0 && reviews.map((item: any, index: number) => (
            <div className="item-feedback" key={index}>
              <div className="item-author flex items-center">
                <div className="item-author-img mr-5">
                  <img
                    src={item?.avatar}
                    alt="img-avatar"
                    className="author-avatar"
                  />
                </div>
                <div className="group">
                  <div className="item-author-name">{item?.username}</div>
                  {item?.updated_at ? (<div className="item-date-review">tháng {new Date(item?.updated_at).getMonth() + 1} năm {new Date(item?.updated_at).getFullYear()}</div>) : ''}
                </div>
              </div>
              <div className="feedback-content">
                {item?.feedback}
              </div>
            </div>
          ))}
        </div>
      </div>
    </HomeReviewStyles>
  );
};

export default HomeReview;
