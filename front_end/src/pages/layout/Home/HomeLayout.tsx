import React, { Fragment, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";

const HomeLayout = () => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location]);
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
