import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
const HomeHeaderRouterStyles = styled.div`
  .header-router {
    margin: 2rem 0;
    font-size: 1.4rem;
    font-weight: 600;
    span {
      color: gray;
    }
  }
`;

type Props = {
  children: React.ReactNode;
};
const HomeHeaderRouter = ({ children, ...props }: Props) => {
  return (
    <HomeHeaderRouterStyles>
      <div className="header-router">
        {children}
      </div>
    </HomeHeaderRouterStyles>
  );
};

export default HomeHeaderRouter;
