import React from "react";
import styled from "styled-components";
import HomeBanner from "../modules/Home/HomeBanner";
import HomeDetail from "../modules/Home/HomeDetail";
import HomeDiscovery from "../modules/Home/HomeDiscovery";
import HomeItem from "../modules/Home/HomeItem";
import HomePopular from "../modules/Home/HomePopular";
import HomeRecommend from "../modules/Home/HomeRecommend";
const HomePageStyles = styled.div`
  position: relative;
`;
const HomePage = () => {
  return (
    <HomePageStyles>
      <HomeBanner></HomeBanner>
      <div className="container">
        <HomePopular></HomePopular>
        <HomeDiscovery></HomeDiscovery>
        <HomeRecommend></HomeRecommend>
        {/* <HomeDetail></HomeDetail> */}
      </div>
    </HomePageStyles>
  );
};

export default HomePage;
