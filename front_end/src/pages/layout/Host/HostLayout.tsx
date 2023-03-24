import React, { Fragment, useState } from "react";
import { Outlet, useOutletContext } from "react-router-dom";
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

type ContextType = {
  setData: (data: any) => void;
  data: any;
};

const HostLayout = () => {
  const [data, setData] = useState<any>();
  const handleNext = () => {
    console.log(data);
  };
  return (
    <HostLayoutStyles>
      <Fragment>
        <header className="header">
          <Header></Header>
        </header>
        <main className="main">
          <Outlet context={{ setData }}></Outlet>
        </main>
        <footer className="footer">
          <Footer handleNext={handleNext}></Footer>
        </footer>
      </Fragment>
    </HostLayoutStyles>
  );
};

export default HostLayout;

export function useData() {
  return useOutletContext<ContextType>();
}
