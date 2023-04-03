import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Swal from "sweetalert2";
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
  const navigate = useNavigate();
  const handleSaveAndExit = () => {
    Swal.fire({
      title: "Bạn có chắc chắn muốn thoát không?",
      text: "Tiến trình của bạn đến thời điểm này đã được lưu.",
      // icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ff4757",
      cancelButtonColor:"#222222",
      confirmButtonText: "Thoát",
      cancelButtonText: "Tiếp tục thực hiện"
    }).then(async (result) => {
      if (result.isConfirmed) {
        navigate('/hosting/listings')
      }
    });
  };
  return (
    <HeaderStyles>
      <nav className="navbar">
        <Link to="/" className="navbar-brand">
          <div className="navbar-logo">
            <img src="/logo-main.png" alt="" />
          </div>
          <h3 className="navbar-brand__title">TripGuide</h3>
        </Link>
        <button className="btn-save-and-exit" onClick={handleSaveAndExit}>Lưu và thoát</button>
      </nav>
    </HeaderStyles>
  );
};

export default Header;
