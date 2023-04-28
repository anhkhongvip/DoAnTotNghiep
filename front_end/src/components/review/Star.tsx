import React from "react";
import styled from "styled-components";
const StarStyles = styled.div`
  .star {
    cursor: pointer;
    fill: #ccc;
    stroke: #333;
    stroke-width: 1px;
    transition: fill 0.2s;
    width: 2.4rem;
    height: 2.4rem;
  }

  .star.selected {
    fill: #ffd700;
  }

  .star.selected ~ .star {
    fill: #ccc;
  }
`;
type Props = {
  selected: boolean;
  onSelect: () => void;
  onMouseLeave: () => void;
};
const Star = ({ selected, onSelect, onMouseLeave }: Props) => (
  <StarStyles>
    <div
      className={selected ? "star selected" : "star"}
      onClick={onSelect}
      onMouseLeave={onMouseLeave}
    >
      <svg viewBox="0 0 24 24">
        <path d="M12 .3l3.09 7.63h8.02l-6.47 4.7 2.45 7.6L12 17.88l-6.09 4.45 2.45-7.6-6.47-4.7h8.02L12 .3z" />
      </svg>
    </div>
  </StarStyles>
);

export default Star;
