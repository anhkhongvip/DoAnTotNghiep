import React, { Fragment } from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Footer from "./Footer";
import Header from "./Header";
const HostLayoutStyles = styled.div`
  .header {
    position: sticky;
    z-index: 10;
    top: 0;
    left: 0;
  }

  .main {
    height: auto;
    margin-bottom: 12rem;
  }

  .footer {
    position: fixed;
    width: 100%;
    z-index: 10;
    bottom: 0;
    left: 0;
  }
`;
const HostLayout = () => {
  return (
    <HostLayoutStyles>
      <Fragment>
        <header className="header">
          <Header></Header>
        </header>
        <main className="main">
          <Outlet></Outlet>
        </main>
        <footer className="footer">
          <Footer></Footer>
        </footer>
      </Fragment>
    </HostLayoutStyles>
  );
};

export default HostLayout;
