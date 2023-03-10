import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
const NotFoundPageStyles = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: ${(props) => props.theme.black};
  color: white;
  .page-content {
    max-width: 1000px;
    margin: 0 auto;
    text-align: center;
  }
  .logo {
    display: inline-block;
    margin-bottom: 40px;
  }
  .heading {
    font-size: 60px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  .description {
    max-width: 800px;
    margin: 0 auto 40px;
  }
  .back {
    display: inline-block;
    padding: 15px 30px;
    color: white;
    background-image: linear-gradient(
      to right top,
      ${(props) => props.theme.primary},
      ${(props) => props.theme.secondary}
    );
    border-radius: 8px;
    font-weight: 500;
  }
  .image {
    max-width: 250px;
    margin: 0 auto 40px;
    height: auto;
  }
`;

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <NotFoundPageStyles>
      <div className="page-content">
        <img src="/404.png" alt="notfound" className="image" />
        <h1 className="heading">404 - Không tìm thấy.</h1>
        <p className="description">
          Có thể trang bạn tìm đã từng tồn tại hoặc bạn đã viết sai đường dẫn.
          Vì vậy hay kiểm tra lại?
        </p>
        <button onClick={() => navigate("/")} className="back">
          Quay lại trang trước đó
        </button>
      </div>
    </NotFoundPageStyles>
  );
};

export default NotFoundPage;
