import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { CheckContextType } from "../../@types/check";
import TextareaAutoResize from "../../components/textarea/TextareaAutoResize";
import { useCheck } from "../../contexts/checkContext";
import { useData } from "../../pages/layout/Host/HostLayout";
import { setStep } from "../../features/room/roomSlice";
import { useAppDispatch } from "../../app/hooks";
import { useParams } from "react-router-dom";
const TitleStyles = styled.div`
  margin-top: 7rem;
  .title-page {
    max-width: 60rem;
    .title {
      font-size: 2.9rem;
      font-weight: bold;
    }
    .description {
      font-size: 1.7rem;
      margin: 2rem 0;
      color: gray;
      font-weight: bold;
    }
  }
  .character-entered {
    margin-top: 1rem;
    font-weight: bold;
    color: gray;
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
  step: number;
};

const Title = ({ step }: Props) => {
  const dispatch = useAppDispatch();
  const [content, setContent] = useState<string>("");
  const { check, setCheck } = useCheck() as CheckContextType;
  const { data, setData } = useData();
  const { room_id } = useParams();

  useEffect(() => {
    dispatch(setStep(step));
    setData({
      nextPage: `/become-a-host/${room_id}/description`,
      backPage: `/become-a-host/${room_id}/photos`,
      title: content,
    });
  }, [step, dispatch]);

  useEffect(() => {
    if (content.length > 32 || content.length === 0) {
      setCheck(false);
    } else {
      setCheck(true);
      setData({
        ...data,
        title: content,
      });
    }
  }, [content]);

  return (
    <TitleStyles>
      <div className="container-sm title-page">
        <h2 className="title">
          Bây giờ, hãy đặt tiêu đề cho chỗ ở thuộc danh mục nhà của bạn
        </h2>
        <p className="description">
          Tiêu đề ngắn cho hiệu quả tốt nhất. Đừng lo lắng, bạn luôn có thể thay
          đổi tiêu đề sau.
        </p>
        <TextareaAutoResize
          fontSize="2.2rem"
          content={content}
          setContent={setContent}
          error={!check && content.length !== 0}
        ></TextareaAutoResize>
        <div className="character-entered">{content.length}/32</div>
        <div className="error-message-entered">
          {!check && content.length !== 0 ? (
            <>
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
              <span className="ml-2">Số ký tự tối đa cho phép là 32</span>
            </>
          ) : null}
        </div>
      </div>
    </TitleStyles>
  );
};

export default Title;
