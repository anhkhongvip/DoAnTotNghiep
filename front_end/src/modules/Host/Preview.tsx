import React from "react";
import styled from "styled-components";
const PreviewStyles = styled.div`
  display: flex;
  margin-top: 3rem;
  .preview {
    &-thumb {
      width: 43rem;
      height: 41rem;
      border-radius: 0.8rem;
      overflow: hidden;
    }
    &-content {
      width: 50rem;
      padding: 0 4rem;
      max-height: 41rem;
      overflow-y: auto;
      &::-webkit-scrollbar {
        display: none;
      }
      /* Hide scrollbar for IE, Edge and Firefox */
      & {
        -ms-overflow-style: none; /* IE and Edge */
        scrollbar-width: none; /* Firefox */
      }
      &__title {
        font-size: 3.2rem;
        font-weight: 700;
        margin-bottom: 2rem;
      }
      &__hostname {
        font-size: 2.2rem;
        font-weight: 700;
        margin-bottom: 1rem;
      }
      &__floor-plan {
        font-size: 1.6rem;
        font-weight: 600;
      }
      &__desc {
        margin: 3rem 0;
        font-size: 1.6rem;
        font-weight: 600;
        color: gray;
      }
      &-service {
        &__title {
          font-size: 1.8rem;
          font-weight: 600;
          margin-bottom: 2.4rem;
        }
        &__item {
          margin: 1.6rem 0;
          padding-bottom: 1.6rem;
        }
      }
    }
  }
  .avatar-hostname {
    width: 5.6rem;
    height: 5.6rem;
    border-radius: 5.6rem;
    overflow: hidden;
  }
  .group-info {
    width: 32rem;
  }
  .service-remaining {
    color: gray;
  }
`;


const Preview = () => {
  return (
    <PreviewStyles>
      <div className="preview-thumb">
        <img
          src="https://images.unsplash.com/photo-1486304873000-235643847519?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80"
          alt=""
        />
      </div>
      <div className="preview-content">
        <h2 className="preview-content__title">nhà mơ ước</h2>
        <div className="preview-content__infor">
          <div className="flex items-center justify-between">
            <h3 className="preview-content__hostname">Chủ nhà Đinh Hưng</h3>
            <div className="avatar-hostname">
              <img
                src="https://res.cloudinary.com/dsrwultki/image/upload/v1678865477/images/eexy0ipahuk1bdvrx2je.png"
                alt=""
              />
            </div>
          </div>
          <div className="preview-content__floor-plan group-info">
            4 khách · 1 phòng ngủ · 1 giường · 1 phòng tắm chung
          </div>
          <p className="preview-content__desc">
            Bạn sẽ có một khoảng thời gian tuyệt vời tại nơi ở thoải mái.
          </p>
          <div className="preview-content-service">
            <h3 className="preview-content-service__title">Tiện nghi</h3>
            <ul className="preview-content-service__list">
              <li className="preview-content-service__item flex items-center justify-between">
                <div className="preview-content-service__item--title">wifi</div>
                <i className="fa-regular fa-wifi"></i>
              </li>
              <li className="preview-content-service__item flex items-center justify-between">
                <div className="preview-content-service__item--title">wifi</div>
                <i className="fa-regular fa-wifi"></i>
              </li>
              <li className="preview-content-service__item flex items-center justify-between">
                <div className="preview-content-service__item--title">wifi</div>
                <i className="fa-regular fa-wifi"></i>
              </li>
              <li className="preview-content-service__item service-remaining">
                <div className="preview-content-service__item--title">+1 tiện nghi nữa</div>
              </li>
            </ul>
            <h3 className="preview-content-service__title">Vị trí</h3>
            <span className="preview-content-service__location">Kim Mã, Ba Đình, Hà Nội 100000, Việt Nam</span>
          </div>
        </div>
      </div>
    </PreviewStyles>
  );
};

export default Preview;
