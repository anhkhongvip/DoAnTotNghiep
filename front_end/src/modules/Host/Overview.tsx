import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { useAppDispatch } from "../../app/hooks";
import { setStep } from "../../features/room/roomSlice";
import { useData } from "../../pages/layout/Host/HostLayout";
import { useCheck } from "../../contexts/checkContext";
import { CheckContextType } from "../../@types/check";
const OverviewStyles = styled.div`
  .overview {
    width: 100%;
    max-width: calc(1536px - 18rem);
    margin: 0 auto;
    padding-top: 3rem;
    display: flex;
    align-items: center;
    &-title,
    &-content {
      width: calc(100% / 2);
    }
    &-title {
      font-size: 4.8rem;
      font-weight: bold;
      & .title {
        max-width: 55rem;
      }
    }
    &-content {
      &-item {
        display: flex;
        padding-bottom: 3.2rem;
        & .step {
          display: flex;
          padding-right: 1.6rem;
          font-weight: bold;
          font-size: 2.2rem;
          margin-top: -0.5rem;
        }
      }
      &-info {
        margin-right: 1.6rem;
        max-width: 448px;
      }
      &-thumb {
        width: 12rem;
        height: 12rem;
        flex-shrink: 0;
      }
      &-title {
        font-size: 2.2rem;
        line-height: 2.6rem;
        font-weight: bold;
        margin-bottom: 1rem;
      }
      &-desc {
        font-size: 1.8rem;
        line-height: 2.4rem;
        color: #717171;
        font-weight: 600;
      }
    }
  }
`;
type Props = {
  step: number;
};
const Overview = ({ step }: Props) => {
  const { room_id } = useParams();
  const navigate = useNavigate();
  const { setData } = useData();
  const { setCheck } = useCheck() as CheckContextType;
  console.log(room_id);

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (room_id !== "overview") {
      navigate("/notfound");
    }
    setData({
      nextPage: "begin",
      backPage: "",
    });
    setCheck(true);
    dispatch(setStep(step));
  }, []);
  return (
    <OverviewStyles>
      <div className="overview">
        <h2 className="overview-title">
          <h2 className="title">Bắt đầu trên TripGuide thật dễ dàng</h2>
        </h2>
        <div className="overview-content">
          <div className="overview-content-item">
            <div className="step">1</div>
            <div className="overview-content-info">
              <h3 className="overview-content-title">
                Chia sẻ thông tin về chỗ ở của bạn cho chúng tôi
              </h3>
              <p className="overview-content-desc">
                Chia sẻ một số thông tin cơ bản, như vị trí của nhà/phòng cho
                thuê và số lượng khách có thể ở tại đó.
              </p>
            </div>
            <div className="overview-content-thumb">
              <img
                src="https://a0.muscache.com/4ea/air/v2/pictures/da2e1a40-a92b-449e-8575-d8208cc5d409.jpg"
                alt=""
              />
            </div>
          </div>
          <div className="overview-content-item">
            <div className="step">2</div>
            <div className="overview-content-info">
              <h3 className="overview-content-title">
                Làm cho nhà/phòng cho thuê trở nên nổi bật
              </h3>
              <p className="overview-content-desc">
                Thêm từ 4 ảnh cùng với tiêu đề và nội dung mô tả – chúng tôi sẽ
                giúp bạn thực hiện.
              </p>
            </div>
            <div className="overview-content-thumb">
              <img
                src="https://a0.muscache.com/4ea/air/v2/pictures/bfc0bc89-58cb-4525-a26e-7b23b750ee00.jpg"
                alt=""
              />
            </div>
          </div>
          <div className="overview-content-item">
            <div className="step">3</div>
            <div className="overview-content-info">
              <h3 className="overview-content-title">
                Hoàn thiện và đăng mục cho thuê
              </h3>
              <p className="overview-content-desc">
                Lựa chọn xem bạn muốn bắt đầu với việc đón tiếp khách có kinh
                nghiệm, chọn giá khởi điểm hay đăng mục cho thuê.
              </p>
            </div>
            <div className="overview-content-thumb">
              <img
                src="https://a0.muscache.com/4ea/air/v2/pictures/c0634c73-9109-4710-8968-3e927df1191c.jpg"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </OverviewStyles>
  );
};

export default Overview;
