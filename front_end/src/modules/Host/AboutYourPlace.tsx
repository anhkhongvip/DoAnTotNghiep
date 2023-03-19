import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
interface styleProps {
  readonly width?: string;
  readonly height?: string;
}
const AboutYourPlaceStyles = styled.div`
  margin-bottom: 4rem;
  .banner {
    margin-top: 5rem;
    display: flex;
    align-items: center;
    &-content {
      padding: 0 6rem;
      max-width: 65rem;
      .step {
        font-weight: bold;
        font-size: 2rem;
        margin-bottom: 2rem;
      }
      .title {
        font-weight: bold;
        font-size: 4.5rem;
        line-height: 6rem;
        margin-bottom: 2.5rem;
      }
      .description {
        font-weight: 600;
      }
    }
    &-video {
      max-width: 53rem;
      height: 100%;
      width: 100%;
      overflow: hidden;
      position: relative;
      video {
        object-fit: cover;
        display: block;
        height: 100%;
        width: 100%;
      }
    }
  }
`;
const AboutYourPlace = () => {
  const param = useParams();

  return (
    <AboutYourPlaceStyles>
      <div className="container">
        <div className="banner">
          <div className="banner-content">
            <h3 className="step">Bước 1</h3>
            <h2 className="title">
              Chia sẻ thông tin về chỗ ở của bạn cho chúng tôi
            </h2>
            <p className="description">
              Trong bước này, chúng tôi sẽ hỏi xem bạn cho thuê loại chỗ ở nào
              và bạn muốn cho khách đặt toàn bộ nhà hay chỉ một phòng cụ thể.
              Sau đó, hãy cho chúng tôi biết vị trí và số lượng khách có thể ở
              tại đó.
            </p>
          </div>
          <div className="banner-video">
            <video
              className="video-auto"
              autoPlay
              crossOrigin="anonymous"
              muted
              playsInline
              preload="auto"
            >
              <source src="https://stream.media.muscache.com/zFaydEaihX6LP01x8TSCl76WHblb01Z01RrFELxyCXoNek.mp4?v_q=high" />
            </video>
          </div>
        </div>
      </div>
    </AboutYourPlaceStyles>
  );
};

export default AboutYourPlace;
