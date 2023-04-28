import React, { useState } from "react";
import styled from "styled-components";
import Star from "./Star";
const RatingStyles = styled.div`
  .stars {
    display: inline-flex;
  }
`;
type Props = {
  totalStars: number;
};
const Rating = ({ totalStars }: Props) => {
  const [selectedStars, setSelectedStars] = useState<number>(0);
  const [isSelecteStar, setIsSelecteStar] = useState<boolean>(false);
  const stars = Array.from({ length: totalStars }, (_, index) => index + 1);
  const handleSelectedStars = (star: number) => {
    if (star !== selectedStars) {
      setIsSelecteStar(true);
    } else {
      setIsSelecteStar(!isSelecteStar);
    }
    setSelectedStars(star);
  };
  
  const handleStarLeave = () => {
    if (!isSelecteStar) {
      setSelectedStars(0);
    }
  };
  return (
    <RatingStyles>
      <div className="stars">
        {stars.map((star: number) => (
          <Star
            key={star}
            selected={star <= selectedStars}
            onSelect={() => handleSelectedStars(star)}
            onMouseLeave={handleStarLeave}
          />
        ))}
      </div>
      <p>
        {selectedStars} / {totalStars} sao
      </p>
    </RatingStyles>
  );
};

export default Rating;
