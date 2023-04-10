import React from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
const ReservationPageStyles = styled.div`
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
const ReservationPage = () => {
    const {booking_type} = useParams(); 
    const navigate=  useNavigate();
  return (
    <ReservationPageStyles>
      <h2 className="title">Đặt phòng</h2>
      <ul className="menu-booking">
        <li className={`menu-item ${booking_type === 'upcoming' ? 'active' : ''}`} onClick={() => navigate('/hosting/reservations/upcoming')}>Sắp tới</li>
        <li className={`menu-item ${booking_type === 'completed' ? 'active' : ''}`} onClick={() => navigate('/hosting/reservations/completed')}>Đã hoàn tất</li>
        <li className={`menu-item ${booking_type === 'canceled' ? 'active' : ''}`} onClick={() => navigate('/hosting/reservations/canceled')}>Đã hủy</li>
        <li className={`menu-item ${booking_type === 'all' ? 'active' : ''}`} onClick={() => navigate('/hosting/reservations/all')}>Tất cả</li>
      </ul>
      <Outlet></Outlet>
    </ReservationPageStyles>
  );
};

export default ReservationPage;
