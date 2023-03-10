import React from "react";
import styled from "styled-components";
import HomeBanner from "../modules/Home/HomeBanner";
import HomeDiscovery from "../modules/Home/HomeDiscovery";
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
      </div>
    </HomePageStyles>
  );
};

export default HomePage;
