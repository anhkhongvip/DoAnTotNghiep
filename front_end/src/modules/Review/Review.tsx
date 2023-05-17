import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TextareaAutoResize from "../../components/textarea/TextareaAutoResize";
import Rating from "../../components/review/Rating";
import { useAppDispatch } from "../../app/hooks";
import { updateReviewAsync } from "../../services/review.service";
import { updateContractAsync } from "../../services/contract.service";
import Swal from "sweetalert2";
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

  .btn-not-allow {
    background-color: #ddd !important;
    color: #c4bbbbb5 !important;
  }

  .error-message-entered {
    display: flex;
    align-items: center;
    font-size: 1.4rem;
    color: #c13515;
    margin-top: 1rem;
  }
`;

type Props = {
  review_id: string;
  contract: any;
  setContract: (contract: any) => void;
  setToggle: (toggle: boolean) => void;
};

const Review = ({ review_id, contract, setContract, setToggle }: Props) => {
  const [feedback, setFeedback] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);
  const [check, setCheck] = useState<boolean>(false);
  const [data, setData] = useState<any>({
    cleanliness_rating: 0,
    communication_rating: 0,
    check_in_rating: 0,
    accuracy_rating: 0,
  });

  const dispatch = useAppDispatch();

  const handleReview = () => {
    let {
      cleanliness_rating,
      communication_rating,
      check_in_rating,
      accuracy_rating,
    } = data;
    let overall_rating =
      (Number(cleanliness_rating) +
        Number(communication_rating) +
        Number(check_in_rating) +
        Number(accuracy_rating)) /
      4;

    dispatch(
      updateReviewAsync({ ...data, feedback, overall_rating, review_id })
    ).then(async (res) => {
      const { status } = res.payload.data;
      await dispatch(
        updateContractAsync({ contract_id: contract.id, status_review: 1 })
      );
      Swal.fire({
        position: "center",
        icon: status,
        title: `${status === "success" ? "Đánh giá phòng thành công" : " "}`,
        showConfirmButton: false,
        timer: 1500,
      }).then((result) => {
        if (status === "success") {
          setToggle(false);
          setContract({ ...contract, status_review: 1 });
        }
      });
    });
  };

  useEffect(() => {
    if (feedback.length > 500) {
      setIsError(true);
    } else {
      setIsError(false);
    }

    if (
      !data.cleanliness_rating ||
      !data.communication_rating ||
      !data.check_in_rating ||
      !data.accuracy_rating ||
      feedback.length === 0 ||
      feedback.length > 500
    ) {
      setCheck(false);
    } else {
      setCheck(true);
    }
  }, [
    feedback,
    data.cleanliness_rating,
    data.communication_rating,
    data.check_in_rating,
    data.accuracy_rating,
  ]);

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
              error={isError}
              placeholder="Hãy mô tả cho chúng tôi về trải nghiệm của bạn"
            ></TextareaAutoResize>

            {isError ? (
              <div className="error-message-entered">
                <svg
                  viewBox="0 0 16 16"
                  width={16}
                  fill="#c13515"
                  height={16}
                  xmlns="http://www.w3.org/2000/svg"
                  aria-label="Lỗi"
                  role="img"
                  focusable="false"
                >
                  <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zm0 10.2a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm.8-6.6H7.2v5.2h1.6z"></path>
                </svg>
                <span className="ml-2">
                  {feedback.length !== 0
                    ? "Số ký tự tối đa cho phép là 500"
                    : "Đây là trường bắt buộc vui lòng nhập một giá trị"}
                </span>
              </div>
            ) : null}

            <div className="content-length">{feedback?.length}/500</div>
          </div>

          <div className="group mt-5">
            <label htmlFor="feedback" className="field-title flex items-center">
              Mức độ sạch sẽ
            </label>
            <p className="field-desc mb-7">
              Mức độ sạch sẽ khi bạn đến nhận phòng thế nào?
            </p>
            <Rating
              name="cleanliness_rating"
              data={data}
              setData={setData}
              totalStars={5}
            ></Rating>
          </div>
          <div className="group mt-5">
            <label htmlFor="feedback" className="field-title flex items-center">
              Mức độ giao tiếp
            </label>
            <p className="field-desc mb-7">
              Mức độ giao tiếp của nhân viên hay chủ nhà khi bạn đến nhận phòng
              thế nào?
            </p>
            <Rating
              name="communication_rating"
              data={data}
              setData={setData}
              totalStars={5}
            ></Rating>
          </div>
          <div className="group mt-5">
            <label htmlFor="feedback" className="field-title flex items-center">
              Mức độ thuận tiện nhận phòng
            </label>
            <p className="field-desc mb-7">
              Quá trình nhận phòng bạn thấy thế nào?
            </p>
            <Rating
              name="check_in_rating"
              data={data}
              setData={setData}
              totalStars={5}
            ></Rating>
          </div>
          <div className="group mt-5">
            <label htmlFor="feedback" className="field-title flex items-center">
              Mức độ chính xác của phòng
            </label>
            <p className="field-desc mb-7">
              Thông tin phòng của bạn được chủ nhà cung cấp có chính xác không?
            </p>
            <Rating
              name="accuracy_rating"
              data={data}
              setData={setData}
              totalStars={5}
            ></Rating>
          </div>
          <div className="text-center mt-10 mb-5">
            <button
              className={`btn-review inline-block ${
                !check ? "btn-not-allow" : ""
              }`}
              onClick={handleReview}
              disabled={!check}
            >
              Gửi đánh giá
            </button>
          </div>
        </div>
      </div>
    </ReviewStyles>
  );
};

export default Review;
