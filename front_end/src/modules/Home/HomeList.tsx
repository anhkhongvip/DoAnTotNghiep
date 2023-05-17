import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import HomeHeaderRouter from "./HomeHeaderRouter";
import HomeFilter from "../../components/sidebar/SidebarSearch";
import HomeItem from "./HomeItem";
import { useAppDispatch } from "../../app/hooks";
import { findHomeByQuery } from "../../services/room.service";
const HomeListStyles = styled.div`
  .home {
    &-body {
      display: flex;
      margin-top: 5rem;
    }

    &-sidebar-search {
      width: 35rem;
      max-height: 100vh;
      position: sticky;
      top: 0;
      padding-right: 1rem;
      overflow-y: scroll;
      &::-webkit-scrollbar {
        display: none;
      }
    }

    &-list {
      margin-left: 5rem;
    }
  }
`;
const HomeList = () => {
  
  return (
    <HomeListStyles>
      <div className="container">
        <HomeHeaderRouter>
          <Link to="/">Trang chủ {">"}</Link> <span>Danh sách các căn nhà</span>
        </HomeHeaderRouter>
        <div className="home-body">
          <div className="home-sidebar-search">
            <HomeFilter></HomeFilter>
          </div>
          <div className="home-list">
            <HomeItem></HomeItem>
            <HomeItem></HomeItem>
            <HomeItem></HomeItem>
            <HomeItem></HomeItem>
            <HomeItem></HomeItem>
          </div>
        </div>
      </div>
    </HomeListStyles>
  );
};

export default HomeList;
