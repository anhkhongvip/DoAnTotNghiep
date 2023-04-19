import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const TripStyles = styled.div``;

const Trip = () => {
  const { booking_type } = useParams();
  return <TripStyles></TripStyles>;
};

export default Trip;