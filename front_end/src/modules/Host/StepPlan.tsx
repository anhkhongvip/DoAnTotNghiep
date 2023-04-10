import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setStep } from "../../features/room/roomSlice";
import { useData } from "../../pages/layout/Host/HostLayout";
import { useCheck } from "../../contexts/checkContext";
import { CheckContextType } from "../../@types/check";
import { findRoomByIdAsync } from "../../services/room.service";
interface styleProps {
  readonly width?: string;
  readonly height?: string;
}
const StepPlanStyles = styled.div`
  margin-bottom: 4rem;
  .banner {
    margin-top: 5rem;
    display: flex;
    align-items: center;
    &-content {
      padding: 0 6rem;
      max-width: 65rem;
      .step {
        font-weight: bold;
        font-size: 2rem;
        margin-bottom: 2rem;
      }
      .title {
        font-weight: bold;
        font-size: 4.5rem;
        line-height: 6rem;
        margin-bottom: 2.5rem;
      }
      .description {
        font-weight: 600;
        font-size: 1.8rem;
        line-height: 1.8;
      }
    }
    &-video {
      max-width: 53rem;
      height: 100%;
      width: 100%;
      overflow: hidden;
      position: relative;
      video {
        object-fit: cover;
        display: block;
        height: 100%;
        width: 100%;
      }
    }
  }
`;

type Props = {
  step: number;
  stepTitle: number;
  title: string;
  description: string;
  src: string;
};

const StepPlan = ({ title, description, src, step, stepTitle }: Props) => {
  const dispatch = useAppDispatch();
  const { room_id } = useParams();
  const { setData } = useData();
  const { setCheck } = useCheck() as CheckContextType;

  useEffect(() => {
    dispatch(setStep(step));
    dispatch(findRoomByIdAsync(room_id!))
      .then((res) => {
        let { home } = res.payload.data;
        if (step > home.stepProgress) {
          if (step === 1) {
            setData({
              stepProgress: step,
              nextPage: `/become-a-host/${room_id}/structure`,
              backPage: `/become-a-host/overview`,
            });
          } else if (step === 5) {
            setData({
              stepProgress: step,
              nextPage: `/become-a-host/${room_id}/amenities`,
              backPage: `/become-a-host/${room_id}/floor-plan`,
            });
          } else {
            setData({
              stepProgress: step,
              nextPage: `/become-a-host/${room_id}/price`,
              backPage: `/become-a-host/${room_id}/description`,
            });
          }
        }
        else {
          if (step === 1) {
            setData({
              nextPage: `/become-a-host/${room_id}/structure`,
              backPage: `/become-a-host/overview`,
            });
          } else if (step === 5) {
            setData({
              nextPage: `/become-a-host/${room_id}/amenities`,
              backPage: `/become-a-host/${room_id}/floor-plan`,
            });
          } else {
            setData({
              nextPage: `/become-a-host/${room_id}/price`,
              backPage: `/become-a-host/${room_id}/description`,
            });
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
    setCheck(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <StepPlanStyles>
      <div className="container">
        <div className="banner">
          <div className="banner-content">
            <h3 className="step">Bước {stepTitle}</h3>
            <h2 className="title">{title}</h2>
            <p className="description">{description}</p>
          </div>
          <div className="banner-video">
            <video
              className="video-auto"
              autoPlay
              crossOrigin="anonymous"
              muted
              playsInline
              preload="auto"
            >
              <source src={src} />
            </video>
          </div>
        </div>
      </div>
    </StepPlanStyles>
  );
};

export default StepPlan;
