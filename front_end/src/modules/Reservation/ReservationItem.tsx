import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const ReservationItemStyles = styled.div``;

const ReservationItem = () => {
  const { booking_type } = useParams();
  return <ReservationItemStyles></ReservationItemStyles>;
};

export default ReservationItem;
