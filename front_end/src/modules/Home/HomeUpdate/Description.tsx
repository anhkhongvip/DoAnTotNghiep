import React, { useState, useEffect } from "react";
import styled from "styled-components";
import TextareaAutoResize from "../../../components/textarea/TextareaAutoResize";
import { updateRoomAsync } from "../../../services/room.service";
import Swal from "sweetalert2";
import { selectRoom, setRoom } from "../../../features/room/roomSlice";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useParams } from "react-router-dom";
const DescriptionStyles = styled.div`
  border: 1px solid #8080804f;
  border-radius: 0.8rem;
  margin-bottom: 2rem;

  .homeUpdate {
    &__desc {
      font-weight: 700;
      &--main {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin: 2rem 2rem;
      }
      &--footer {
        border-top: 1px solid #8080804f;
        display: flex;
        justify-content: space-between;
        padding: 1.5rem 2rem;
      }
    }
    &__desc {
      font-size: 1.2rem;
      font-weight: 600;
      color: gray;
      margin-bottom: 2rem;
    }
    &__info {
      max-width: 60rem;
    }
    &__close {
      font-size: 1.4rem;
      line-height: 1;
    }
    &__title {
      font-weight: 700;
    }
  }

  .btn-not-allow {
    background-color: #ddd !important;
  }

  .content-length {
    font-size: 1.4rem;
    font-weight: 700;
    color: gray;
  }

  .btn-close {
    font-weight: 700;
  }
  .btn-save {
    background-color: black;
    color: white;
    padding: 0.5rem 1.5rem;
    border-radius: 0.8rem;
    font-weight: 700;
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
  description: string;
  toogleUpdate: any;
  setToogleUpdate: (toogleUpdate: any) => void;
};
const Description = ({ description, setToogleUpdate, toogleUpdate }: Props) => {
  const [content, setContent] = useState<string>("");
  const { room_id } = useParams();
  const [check, setCheck] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const roomSelector = useAppSelector(selectRoom);
  const dispatch = useAppDispatch();
  const handleClose = () => {
    setToogleUpdate({ ...toogleUpdate, descriptionToggle: false });
  };
  const handleSave = async () => {
    try {
      let res = await dispatch(
        updateRoomAsync({ description: content, room_id })
      );
      let { status } = res.payload.data;
      if (status) {
        Swal.fire({
          position: "center",
          icon: status,
          title: "Cập nhật mô tả nhà/phòng thành công",
          showConfirmButton: false,
          timer: 1500,
        }).then((result) => {
          if (status === "success") {
            dispatch(setRoom({ ...roomSelector.room, description: content }));
            setToogleUpdate({ ...toogleUpdate, descriptionToggle: false });
          }
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (content.length > 500 || content.length === 0) {
      setCheck(false);
      setIsError(true);
    } else if (description.trim() === content) {
      setCheck(false);
      setIsError(false);
    } else {
      setCheck(true);
      setIsError(false);
    }
  }, [content]);

  useEffect(() => {
    setContent(description.trim());
  }, []);
  return (
    <DescriptionStyles>
      <div className="homeUpdate__desc--main">
        <div className="homeUpdate__info">
          <h2 className="homeUpdate__title">Mô tả nhà/phòng cho thuê</h2>
          <p className="homeUpdate__desc">
            Hãy giúp khách hình dung về cảm giác khi ở chỗ của bạn, bao gồm cả
            lý do tại sao họ sẽ thích ở đó.
          </p>
          <TextareaAutoResize
            fontSize="2rem"
            content={content}
            setContent={setContent}
            height="140px"
            error={isError}
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
                {content.length !== 0
                  ? "Số ký tự tối đa cho phép là 500"
                  : "Đây là trường bắt buộc vui lòng nhập một giá trị"}
              </span>
            </div>
          ) : null}

          <div className="content-length">{content?.length}/500</div>
        </div>
        <button className="homeUpdate__close" onClick={handleClose}>
          <i className="fa-regular fa-x"></i>
        </button>
      </div>
      <div className="homeUpdate__desc--footer">
        <button onClick={handleClose} className="btn-close">
          Hủy
        </button>
        <button
          onClick={handleSave}
          className={`btn-save ${!check ? "btn-not-allow" : ""}`}
          disabled={!check}
        >
          Lưu
        </button>
      </div>
    </DescriptionStyles>
  );
};

export default Description;
