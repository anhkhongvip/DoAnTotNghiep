import React, { useEffect } from "react";
import styled from "styled-components";
import { setStep } from "../../features/room/roomSlice";
import { useAppDispatch } from "../../app/hooks";
const AmenitieStyles = styled.div`
  .amenitie {
    max-width: 60rem;
  }

  .title {
    display: inline-block;
    margin-top: 2rem;
    font-weight: bold;
    font-size: 3rem;
    margin-bottom: 2rem;
  }

  .description {
    color: gray;
    font-weight: bold;
    margin-bottom: 5rem;
  }

  .input-service {
    display: none;
    &:checked + .label-service {
      border-color: transparent;
      box-shadow: 0 0 0 2px #000000;
    }
  }

  .list-service {
    display: flex;
    flex-wrap: wrap;
    margin-left: -2rem;
  }

  .service-item {
    width: calc(100% / 3 - 2rem);
    margin-left: 2rem;
  }
  .label-service {
    display: flex;
    flex-direction: column;
    border: 1px solid #dddddd;
    padding: 2rem 1.5rem;
    border-radius: 0.8rem;
    transition: box-shadow 0.2s ease, transform 0.1s ease;
    cursor: pointer;
    &:hover {
      border-color: transparent;
      box-shadow: 0 0 0 2px #000000;
    }
    &:active {
        transform:  scale(0.96);
    }
    & i {
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }
    & .title-service {
      font-size: 1.6rem;
      font-weight: bold;
    }
  }
`;
type Props = {
  step: number
}

const Amenitie = ({step}: Props) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setStep(step));
  }, [step, dispatch]);
  return (
    <AmenitieStyles>
      <div className="container-sm amenitie">
        <h2 className="title">Cho khách biết chỗ ở của bạn có những gì</h2>
        <p className="description">
          Bạn có thể thêm tiện nghi sau khi đăng mục cho thuê.
        </p>
        <div className="list-service">
          <div className="service-item">
            <input
              type="checkbox"
              id="demo-service-1"
              className="input-service"
            />
            <label htmlFor="demo-service-1" className="label-service">
              <i className="fa-regular fa-wifi icon-service"></i>
              <div className="title-service">Wifi</div>
            </label>
          </div>
          <div className="service-item">
            <input
              type="checkbox"
              id="demo-service-2"
              className="input-service"
            />
            <label htmlFor="demo-service-2" className="label-service">
              <i className="fa-regular fa-tv"></i>
              <div className="title-service">TV</div>
            </label>
          </div>
          <div className="service-item">
            <input
              type="checkbox"
              id="demo-service-3"
              className="input-service"
            />
            <label htmlFor="demo-service-3" className="label-service">
              <i className="fa-regular fa-wifi icon-service"></i>
              <div className="title-service">Wifi</div>
            </label>
          </div>
        </div>
      </div>
    </AmenitieStyles>
  );
};

export default Amenitie;
