import React from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
const TransactionHistoryPageStyles = styled.div`
  .title {
    font-size: 3.5rem;
    font-weight: 700;
  }
  .transaction-menu {
    display: flex;
    margin-top: 2rem;
    margin-left: -3rem;
    & .menu-item {
      margin-left: 3rem;
      font-weight: bold;
      padding-bottom: 1rem;
      cursor: pointer;
      border-bottom-width: 2px;
      &.active {
        color: #008489;
        border-bottom-color: #008489;
      }
    }
  }
`;
const TransactionHistoryPage = () => {
  const navigate = useNavigate();
  const { transaction_type } = useParams();
  return (
    <TransactionHistoryPageStyles>
      <div className="container-sm">
        <h2 className="title">Lịch sử giao dịch</h2>
        <ul className="transaction-menu">
          <li
            className={`menu-item ${
              transaction_type === "completed-transactions" ? "active" : ""
            }`}
            onClick={() =>
              navigate("/hosting/transaction_history/completed-transactions")
            }
          >
            Các khoản thanh toán đã hoàn tất
          </li>
          <li
            className={`menu-item ${
              transaction_type === "future-transactions" ? "active" : ""
            }`}
            onClick={() =>
              navigate("/hosting/transaction_history/future-transactions")
            }
          >
            Các khoản thanh toán sắp tới
          </li>
          <li
            className={`menu-item ${
              transaction_type === "gross-earnings" ? "active" : ""
            }`}
            onClick={() =>
              navigate("/hosting/transaction_history/gross-earnings")
            }
          >
            Doanh thu
          </li>
        </ul>
        <Outlet></Outlet>
      </div>
    </TransactionHistoryPageStyles>
  );
};

export default TransactionHistoryPage;
