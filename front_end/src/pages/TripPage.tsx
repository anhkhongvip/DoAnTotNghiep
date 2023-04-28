import React from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
const TripPageStyles = styled.div`
  padding: 2rem;
  margin-top: 2rem;
  .title {
    font-weight: 700;
    font-size: 3.5rem;
  }
  .menu {
    &-booking {
      display: flex;
      margin-top: 2rem;
      position: relative;
    }
    &-item {
      margin-right: 2rem;
      font-weight: 700;
      color: #7c7c7c;
      padding-bottom: 2rem;
      border-bottom: 3px solid transparent;
      cursor: pointer;
      &.active {
        color: black;
        border-color: black;
      }
    }
  }
`;
const TripPage = () => {
  const { booking_type } = useParams();
  const navigate = useNavigate();
  return <TripPageStyles>
    <h2 className="title">Chuyến đi</h2>
      <ul className="menu-booking">
        <li className={`menu-item ${booking_type === 'upcoming' ? 'active' : ''}`} onClick={() => navigate('/trips/upcoming')}>Sắp tới</li>
        <li className={`menu-item ${booking_type === 'confirmed' ? 'active' : ''}`} onClick={() => navigate('/trips/confirmed')}>Đã xác nhận</li>
        <li className={`menu-item ${booking_type === 'cancelled' ? 'active' : ''}`} onClick={() => navigate('/trips/cancelled')}>Đã hủy</li>
        <li className={`menu-item ${booking_type === 'all' ? 'active' : ''}`} onClick={() => navigate('/trips/all')}>Tất cả</li>
      </ul>
      <Outlet></Outlet>
  </TripPageStyles>;
};

export default TripPage;
