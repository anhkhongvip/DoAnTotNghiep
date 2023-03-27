import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useCheck } from "../../contexts/checkContext";
import { CheckContextType } from "../../@types/check";
import { Modal } from "../../components/modal";
import Preview from "./Preview";
import { setStep } from "../../features/room/roomSlice";
import { useAppDispatch } from "../../app/hooks";
import { useData } from "../../pages/layout/Host/HostLayout";
import { useParams } from "react-router-dom";

const ReceiptStyles = styled.div`
  .title {
    font-size: 4.8rem;
    font-weight: bold;
  }
  .description {
    font-size: 1.8rem;
    color: #717171;
    font-weight: 500;
    margin-top: 2rem;
  }
  .room-preview {
    width: calc(100% / 2 - 5rem);
    padding: 1rem 1.5rem;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px,
      rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;
    cursor: pointer;
    &__image {
      width: 100%;
      height: 35rem;
      position: relative;
      border-radius: 0.8rem;
      overflow: hidden;
    }
    &-btn {
      position: absolute;
      top: 0;
      left: 0;
      transform: translate(2rem, 2rem);
      background-color: white;
      padding: 0 1rem;
      border-radius: 0.2rem;
      font-weight: bold;
    }
    &-title {
      font-weight: 700;
      font-size: 1.8rem;
    }
    &-price {
      font-weight: 500;
    }

    &-rate {
      i {
        font-size: 1.3rem;
      }
    }
  }

  .idea-next {
    margin-top: 2rem;
    width: calc(100% / 2);
    &-title {
      font-size: 2.2rem;
      font-weight: bold;
    }
    &-item {
      i {
        font-size: 3.2rem;
      }
      &__info {
        margin-left: 2rem;
        &--title {
          font-size: 2.2rem;
          font-weight: 700;
        }
        &--description {
          font-size: 1.6rem;
          font-weight: 500;
        }
      }
    }
  }
`;

type Props = {
  step: number
}

const Receipt = ({step}: Props) => {
  const { setCheck } = useCheck() as CheckContextType;
  const [toggle, setToggle] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { setData } = useData();
  const { room_id } = useParams();
  useEffect(() => {
    dispatch(setStep(step));
    setCheck(true)
    setData({
      nextPage: 'end',
      backPage: `/become-a-host/${room_id}/price`,
    });
  }, [step, dispatch]);
  
  const closeModal = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setToggle(false);
  };

  return (
    <ReceiptStyles>
      <div className="container-md">
        <h2 className="title">Thật tuyệt! Đã đến lúc đăng cho thuê.</h2>
        <p className="description">
          Dưới đây là những thông tin mà chúng tôi sẽ hiển thị cho khách. Hãy
          đảm bảo bạn đã kiểm tra kỹ thông tin trước khi đăng.
        </p>
        <div className="content flex justify-between mt-16">
          <div className="room-preview" onClick={() => setToggle(true)}>
            <div className="room-preview__image">
              <img
                src="https://images.unsplash.com/photo-1486304873000-235643847519?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80"
                alt=""
              />
              <div className="room-preview-btn">Hiển thị bản xem trước</div>
            </div>
            <div className="room-preview-content">
              <div className="flex justify-between mt-5">
                <div className="group">
                  <h2 className="room-preview-title">Nhà mơ ước</h2>
                  <div className="room-preview-price">
                    <b>₫332.026</b> đêm
                  </div>
                </div>
                <div className="room-preview-rate">
                  Mới <i className="fa-solid fa-star"></i>
                </div>
              </div>
            </div>
          </div>
          <div className="idea-next">
            <h2 className="idea-next-title">Tiếp theo là gì?</h2>
            <ul className="idea-next-list mt-5">
              <li className="idea-next-item flex items-center mb-5">
                <i className="fa-regular fa-calendar-lines-pen fa-beat"></i>
                <div className="idea-next-item__info ">
                  <div className="idea-next-item__info--title">
                    Thiết lập lịch
                  </div>
                  <p className="idea-next-item__info--description">
                    Chọn ngày đón tiếp khách. Sau thời điểm bạn đăng, khách có
                    thể đặt chỗ ở của bạn.
                  </p>
                </div>
              </li>
              <li className="idea-next-item flex items-center mb-5">
                <i className="fa-regular fa-pen fa-bounce"></i>
                <div className="idea-next-item__info ">
                  <div className="idea-next-item__info--title">
                    Điều chỉnh các chế độ cài đặt của bạn
                  </div>
                  <p className="idea-next-item__info--description">
                    Đặt ra nội quy nhà, chọn chính sách hủy, chọn cách thức đặt
                    phòng của khách và nhiều chế độ khác.
                  </p>
                </div>
              </li>
              <li className="idea-next-item flex items-center mb-5">
                <i className="fa-regular fa-person-walking-luggage fa-flip"></i>
                <div className="idea-next-item__info">
                  <div className="idea-next-item__info--title">
                    Chuẩn bị đón vị khách đầu tiên
                  </div>
                  <p className="idea-next-item__info--description">
                    Tìm hiểu các mẹo trong Trung tâm tài nguyên của chúng tôi
                    hoặc nhận sự hướng dẫn trực tiếp từ một Chủ nhà siêu cấp.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Modal
        title="Bản xem trước đầy đủ"
        toggle={toggle}
        closeFn={(event) => closeModal(event)}
      >
        <Preview/>
      </Modal>
    </ReceiptStyles>
  );
};

export default Receipt;
