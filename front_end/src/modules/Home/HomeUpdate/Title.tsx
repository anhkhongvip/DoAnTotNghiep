import React, { useState, ChangeEvent, useEffect } from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useParams } from "react-router-dom";
import { updateRoomAsync } from "../../../services/room.service";
import Swal from "sweetalert2";
import { selectRoom, setRoom } from "../../../features/room/roomSlice";

const TitleStyles = styled.div`
  border: 1px solid #8080804f;
  border-radius: 0.8rem;
  margin-bottom: 2rem;

  .homeUpdate {
    &__title {
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
  .input {
    &-wrapper {
      width: 100%;
      border: 2px solid gray;
      border-radius: 0.8rem;
      margin-bottom: 0.5rem;
      padding: 1.8rem 1.2rem;
      transition: border 0.2s ease;
    }
    &-data {
      width: 100%;
    }
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

  .focus-visible {
    border-color: black;
  }
  .not-allow {
    border-color: #c13515 !important;
  }

  .btn-not-allow {
    background-color: #ddd !important;
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
  title: string;
  toogleUpdate: any;
  setToogleUpdate: (toogleUpdate: any) => void;
};

const Title = ({ title, setToogleUpdate, toogleUpdate }: Props) => {
  const { room_id } = useParams();
  const roomSelector = useAppSelector(selectRoom);
  
  const [content, setContent] = useState<string>("");
  const [check, setCheck] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [focus, setFocus] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const handleChange = (event: ChangeEvent) => {
    const { value } = event.target as HTMLInputElement;
    if (value.length > 32 || value.length === 0) {
      setIsError(true);
      setCheck(false);
    } else if (title.trim() === value) {
      setIsError(false);
      setCheck(false);
    } else {
      setIsError(false);
      setCheck(true);
    }
    setContent(value);
  };
  const handleClose = () => {
    setToogleUpdate({ ...toogleUpdate, titleToggle: false });
  };
  const handleSave = async () => {
    try {
      let res = await dispatch(updateRoomAsync({ title: content, room_id }));
      let { status } = res.payload.data;
      if (status) {
        Swal.fire({
          position: "center",
          icon: status,
          title: "Cập nhật tiêu đề nhà/phòng thành công",
          showConfirmButton: false,
          timer: 1500,
        }).then((result) => {
          if (status === "success") {
            dispatch(setRoom({...roomSelector.room, title: content}))
            setToogleUpdate({ ...toogleUpdate, titleToggle: false });
          }
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    setCheck(false);
    setContent(title.trim());
  }, [title]);
  return (
    <TitleStyles>
      <div className="homeUpdate__title--main">
        <div className="homeUpdate__info">
          <h2 className="homeUpdate__title">Tiêu đề nhà/phòng cho thuê</h2>
          <p className="homeUpdate__desc">
            Tiêu đề nhà/phòng cho thuê của bạn cần nêu bật được những điểm đặc
            biệt của chỗ ở.
          </p>
          <div
            className={`input-wrapper ${focus ? "focus-visible" : ""} ${
              isError ? "not-allow" : ""
            }`}
          >
            <input
              type="text"
              className="input-data"
              value={content}
              onChange={handleChange}
              onBlur={() => setFocus(false)}
              onFocus={() => setFocus(true)}
            />
          </div>

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
                  ? "Số ký tự tối đa cho phép là 32"
                  : "Đây là trường bắt buộc vui lòng nhập một giá trị"}
              </span>
            </div>
          ) : null}

          <div className="content-length">{content?.length}/32</div>
        </div>
        <button className="homeUpdate__close" onClick={handleClose}>
          <i className="fa-regular fa-x"></i>
        </button>
      </div>
      <div className="homeUpdate__title--footer">
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
    </TitleStyles>
  );
};

export default Title;
