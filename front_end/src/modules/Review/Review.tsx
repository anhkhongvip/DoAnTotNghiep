import React, { useState } from "react";
import styled from "styled-components";
import TextareaAutoResize from "../../components/textarea/TextareaAutoResize";
import Rating from "../../components/review/Rating";
const ReviewStyles = styled.div`
  .field-title {
    font-size: 3rem;
    font-weight: 500;
    span {
      font-size: 2rem;
    }
  }
  .field-desc {
    font-size: 1.4rem;
    color: gray;
  }
  .btn-review {
    background-color: #ff5a60;
    color: #fff;
    font-weight: bold;
    padding: 2rem;
    border-radius: 0.8rem;
  }
`;
const Review = () => {
  const [feedback, setFeedback] = useState<string>("");
  return (
    <ReviewStyles>
      <div className="review">
        <p className="mb-5 text-center">
          Đánh giá cho chúng tôi về trải nghiệm của bạn
        </p>
        <div className="review-content">
          <div className="group">
            <label htmlFor="feedback" className="field-title flex items-center">
              Mô tả trải nghiệm của bạn
            </label>
            <p className="field-desc mb-7">
              Đánh giá của bạn sẽ được công khai cho những người khác
            </p>
            <TextareaAutoResize
              content={feedback}
              setContent={setFeedback}
              error={false}
              placeholder="Hãy mô tả cho chúng tôi về trải nghiệm của bạn"
            ></TextareaAutoResize>
          </div>

          <div className="group mt-5">
            <label htmlFor="feedback" className="field-title flex items-center">
              Mức độ sạch sẽ
            </label>
            <p className="field-desc mb-7">
              Mức độ sạch sẽ khi bạn đến nhận phòng thế nào?
            </p>
            <Rating totalStars={5}></Rating>
          </div>
          <div className="group mt-5">
            <label htmlFor="feedback" className="field-title flex items-center">
              Mức độ giao tiếp
            </label>
            <p className="field-desc mb-7">
              Mức độ giao tiếp của nhân viên hay chủ nhà khi bạn đến nhận phòng
              thế nào?
            </p>
            <Rating totalStars={5}></Rating>
          </div>
          <div className="group mt-5">
            <label htmlFor="feedback" className="field-title flex items-center">
              Mức độ thuận tiện nhận phòng
            </label>
            <p className="field-desc mb-7">
              Quá trình nhận phòng bạn thấy thế nào?
            </p>
            <Rating totalStars={5}></Rating>
          </div>
          <div className="group mt-5">
            <label htmlFor="feedback" className="field-title flex items-center">
              Mức độ chính xác của phòng
            </label>
            <p className="field-desc mb-7">
              Thông tin phòng của bạn được chủ nhà cung cấp có chính xác không?
            </p>
            <Rating totalStars={5}></Rating>
          </div>
          <div className="text-center mt-10 mb-5">
            <button className="btn-review inline-block">
              Đánh giá ngay
            </button>
          </div>
        </div>
      </div>
    </ReviewStyles>
  );
};

export default Review;
