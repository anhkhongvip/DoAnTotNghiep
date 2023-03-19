import React, { Fragment } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

const HomeLayout = () => {
  return (
    <Fragment>
      <header className="header">
        <Header></Header>
      </header>
      <main className="main">
        <Outlet></Outlet>
      </main>
      <footer className="footer"></footer>
    </Fragment>
  );
};

export default HomeLayout;
