import React from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
const HeaderStyles = styled.div`
  .navbar {
    max-width: 1440px;
    margin: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem 1.5rem;
    background-color: #fff;
    &-brand {
      display: flex;
      align-items: center;
      &__title {
        margin-left: 1rem;
        font-weight: bold;
      }
    }
    &-logo {
      width: 4rem;
      height: 3.8rem;
    }

    &-nav {
      display: flex;
      align-items: center;
    }
  }

  .btn-save-and-exit {
    padding: 1rem 2rem;
    border: 1px solid #80808059;
    border-radius: 30px;
    font-weight: bold;
    transition: 0.1s linear;
    &:hover {
      border-color: black;
    }
  }
`;
const Header = () => {
  const param = useParams();

  return (
    <HeaderStyles>
      <nav className="navbar">
        <Link to="/" className="navbar-brand">
          <div className="navbar-logo">
            <img src="/logo-main.png" alt="" />
          </div>
          <h3 className="navbar-brand__title">TripGuide</h3>
        </Link>
        <button className="btn-save-and-exit">Lưu và thoát</button>
      </nav>
    </HeaderStyles>
  );
};

export default Header;
