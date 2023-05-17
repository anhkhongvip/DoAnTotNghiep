import React, { useState } from "react";
import styled from "styled-components";
import Star from "./Star";
const RatingStyles = styled.div`
  .stars {
    display: inline-flex;
  }
`;
type Props = {
  name: string;
  totalStars: number;
  data: any;
  setData: (data: any) => void;
};
const Rating = ({ totalStars, name, data, setData }: Props) => {
  //const [selectedStars, setSelectedStars] = useState<number>(0);
  const [isSelecteStar, setIsSelecteStar] = useState<boolean>(false);
  const stars = Array.from({ length: totalStars }, (_, index) => index + 1);
  const handleSelectedStars = (star: number) => {
    if (star !== data[name]) {
      setIsSelecteStar(true);
    } else {
      setIsSelecteStar(!isSelecteStar);
    }
    setData({ ...data, [name]: star });
    //setSelectedStars(star);
  };

  const handleStarLeave = () => {
    if (!isSelecteStar) {
      setData({ ...data, [name]: 0 });
      // setSelectedStars(0);
    }
  };
  return (
    <RatingStyles>
      <div className="stars">
        {stars.map((star: number) => (
          <Star
            key={star}
            selected={star <= data[name]}
            onSelect={() => handleSelectedStars(star)}
            onMouseLeave={handleStarLeave}
          />
        ))}
      </div>
      <p>{data[name]} / {totalStars} sao</p>
    </RatingStyles>
  );
};

export default Rating;
