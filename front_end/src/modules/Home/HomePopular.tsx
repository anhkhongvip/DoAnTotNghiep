import React from "react";
import styled from "styled-components";
const HomePopularStyles = styled.div`
  margin-top: 10rem;
  .home-popular {
    &__header {
      .title {
        font-size: 3rem;
        font-weight: bold;
      }
    }
    &__content {
      margin-top: 5rem;
      height: 71rem;
      .content__left {
        width: calc(70% - 1.5rem);
        height: 100%;
      }
      .content__right {
        width: 30%;
        height: auto;
      }
      .img-content {
        border-radius: 1rem;
        overflow: hidden;
        position: relative;
        &::after {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 10;
          background-color: #00000042;
        }
        &-4 {
          height: 40%;
        }
        &-6 {
          height: calc(60% - 1.5rem);
        }
        .home-popular__info {
          position: absolute;
          color: white;
          z-index: 90;
          font-weight: bold;
        }
      }
    }
  }
`;
const HomePopular = () => {
  return (
    <HomePopularStyles>
      <div className="home-popular">
        <div className="home-popular__header text-center">
          <h2 className="title">Khu vực phổ biến</h2>
          <p className="content">
            Những địa điểm lưu trú phổ biến được nhiều khách du lịch quan tâm và
            thường xuyên ghé thăm.
          </p>
        </div>
        <div className="home-popular__content flex justify-between">
          <div className="content__left flex flex-col justify-between">
            <div className="image-full img-content img-content-4">
              <img
                src="https://images.unsplash.com/photo-1589291432463-fbddbfd10bbd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                alt=""
              />
              <div className="home-popular__info bottom-10 left-14">
                <h3 className="title text-5xl">Tỉnh Quảng Ninh</h3>
              </div>
            </div>
            <div className="flex justify-between img-content-6">
              <div className="image-half img-content">
                <img
                  src="https://cdn.asahiluxstay.com//uploads/medium/media/2022/0506/0239-e0f2d20657fbf7e-gioi-thieu-doi-net-ve-ho-hoan-kiem-ho-guom-o-ha-noi-3-2.jpg?s=aHR0cHM6Ly9jZG4uYXNhaGlsdXhzdGF5LmNvbS9tZWRpYS8yMDIyLzA1MDYvMDIzOS1lMGYyZDIwNjU3ZmJmN2UtZ2lvaS10aGlldS1kb2ktbmV0LXZlLWhvLWhvYW4ta2llbS1oby1ndW9tLW8taGEtbm9pLTMtMi5qcGc="
                  alt=""
                />
                <div className="home-popular__info bottom-7 left-12">
                  <h3 className="title text-3xl">Thành phố Hà Nội</h3>
                </div>
              </div>
              <div className="image-half img-content">
                <img
                  src="https://cdn.asahiluxstay.com//uploads/medium/media/2022/0506/0232-670fec15668554a-di-sapa-can-chuan-bi-nhung-gi-de-chuyen-di-duoc-tr-10-760x367.jpg?s=aHR0cHM6Ly9jZG4uYXNhaGlsdXhzdGF5LmNvbS9tZWRpYS8yMDIyLzA1MDYvMDIzMi02NzBmZWMxNTY2ODU1NGEtZGktc2FwYS1jYW4tY2h1YW4tYmktbmh1bmctZ2ktZGUtY2h1eWVuLWRpLWR1b2MtdHItMTAtNzYweDM2Ny5qcGc="
                  alt=""
                />
                <div className="home-popular__info bottom-7 left-12">
                  <h3 className="title text-3xl">Tỉnh Lào Cai</h3>
                </div>
              </div>
            </div>
          </div>
          <div className="content__right flex flex-col justify-between">
            <div className="image-third img-content">
              <img
                src="https://cdn.asahiluxstay.com//uploads/medium/media/2021/1222/0937-9c3046ca53d5fe5-7-du-1634353732500.jpg?s=aHR0cHM6Ly9jZG4uZHhtYi52bi9tZWRpYS8yMDIxLzEyMjIvMDkzNy05YzMwNDZjYTUzZDVmZTUtNy1kdS0xNjM0MzUzNzMyNTAwLmpwZw=="
                alt=""
              />
              <div className="home-popular__info bottom-7 left-12">
                <h3 className="title text-3xl">Thành phố Đà Nẵng</h3>
              </div>
            </div>
            <div className="image-third img-content">
              <img
                src="https://images.unsplash.com/photo-1556225496-ff493e20d9a0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                alt=""
              />
              <div className="home-popular__info bottom-7 left-12">
                <h3 className="title text-3xl">Tỉnh Ninh Bình</h3>
              </div>
            </div>
            <div className="image-third img-content">
              <img
                src="https://cdn.asahiluxstay.com//uploads/medium/media/2022/0405/0453-915b7014e87be83-ben-thanh-market-2.jpg?s=aHR0cHM6Ly9jZG4uYXNhaGlsdXhzdGF5LmNvbS9tZWRpYS8yMDIyLzA0MDUvMDQ1My05MTViNzAxNGU4N2JlODMtYmVuLXRoYW5oLW1hcmtldC0yLmpwZw=="
                alt=""
              />
              <div className="home-popular__info bottom-7 left-12">
                <h3 className="title text-3xl">Thành phố Hồ Chí Minh</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </HomePopularStyles>
  );
};

export default HomePopular;
