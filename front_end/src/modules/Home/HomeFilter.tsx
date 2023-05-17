import React, { useEffect, useState } from "react";
import styled from "styled-components";
import HomeHeaderRouter from "./HomeHeaderRouter";
import { Link, useLocation } from "react-router-dom";
import HomeItem from "./HomeItem";
import SidebarSearch from "../../components/sidebar/SidebarSearch";
import { findHomeByQuery } from "../../services/room.service";
import { useAppDispatch } from "../../app/hooks";
const HomeFilterStyles = styled.div`
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
const HomeFilter = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  console.log(location);
  const [homes, setHomes] = useState<any>([]);
  useEffect(() => {
    dispatch(findHomeByQuery(location.search))
      .then((res) => {
        const { homes } = res.payload.data;
        if (homes) {
          setHomes(homes);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [location.search]);
  return (
    <HomeFilterStyles>
      <div className="container">
        <HomeHeaderRouter>
          <Link to="/">Trang chủ {">"}</Link> <span>Danh sách các căn nhà</span>
        </HomeHeaderRouter>
        <div className="home-body">
          <div className="home-sidebar-search">
            <SidebarSearch></SidebarSearch>
          </div>
          <div className="home-list">
            {homes.map((item: any, index: number) => (
              <HomeItem item={item} key={item?.id}></HomeItem>
            ))}
          </div>
        </div>
      </div>
    </HomeFilterStyles>
  );
};

export default HomeFilter;
