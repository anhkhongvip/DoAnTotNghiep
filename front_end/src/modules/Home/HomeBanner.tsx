import React from "react";
import styled from "styled-components";

const HomeBannerStyles = styled.div`
  .home_banner {
    width: 100%;
    min-height: 732px;
    background-size: cover;
    position: relative;
    z-index: 99;
    .image-cover {
      min-height: 655px;
      background-size: cover;
      background-position: center;
      background-image: url("https://images.unsplash.com/photo-1528127269322-539801943592?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80");
    }
    .search-bar {
      box-shadow: rgb(0 0 0 / 24%) 0px 3px 8px;
      background-color: #fff;
      position: absolute;
      bottom: 20%;
      left: 50%;
      border-radius: 3rem;
      transform: translate(-50%);
      padding: 0 2rem;
    }
    .bigsearch-query {
      cursor: pointer;
      background-clip: padding-box;
      padding: 1.4rem 3.2rem;
      display: inline-block;

      & input {
        font-size: 1.6rem;
        width: 40rem;
        padding: 1rem 0 ;
      }
    }

    .title-input {
      font-weight: 600;
    }

    .btn-search {
      flex-shrink: 0;
      width: 4.8rem;
      height: 4.8rem;
      border-radius: 50%;
      background-color: #ff385c;
      color: #ffff;
    }
  }
`;

const HomeBanner = () => {
  return (
    <HomeBannerStyles>
      <div className="home_banner">
        <div className="image-cover"></div>
        <div className="search-bar flex items-center">
          <label
            className="bigsearch-query"
            htmlFor="bigsearch-query-location-input"
          >
            <div className="title-input">Tìm kiếm</div>
            <input
              type="text"
              autoComplete="off"
              placeholder="Tìm kiếm điểm đến hoặc tên phòng bạn cần tìm"
              name="query"
              id="bigsearch-query-location-input"
            />
          </label>
          <button className="btn-search">
            <i className="fa-regular fa-magnifying-glass"></i>
          </button>
        </div>
      </div>
    </HomeBannerStyles>
  );
};

export default HomeBanner;
