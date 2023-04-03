import React from "react";
import styled from "styled-components";
const TableStyles = styled.div`
  background-color: white;
  max-width: 100vw;
  width: 100%;
  overflow-x: auto;
  &::-webkit-scrollbar-track {
    border-radius: 1rem;
    background-color: #f5f5f5;
  }
  &::-webkit-scrollbar {
    width: 0.7rem;
    height: 0.7rem;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 1rem;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #55555559;
  }
  table {
    width: 100%;
    border-spacing: 0;
  }
  th,
  td {
    vertical-align: middle;
    white-space: nowrap;
  }
  th {
    padding: 20px 30px;
    font-weight: 600;
    text-align: left;
  }
  td {
    padding: 15px 30px;
  }
  tbody {
  }
`;

type Props = {
  children?: React.ReactNode;
};
const Table = ({ children, ...props }: Props) => {
  return (
    <TableStyles>
      <table>{children}</table>
    </TableStyles>
  );
};

export default Table;
