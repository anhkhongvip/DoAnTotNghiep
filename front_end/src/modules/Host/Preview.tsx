import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectAccount } from "../../features/account/accountSlice";
import { findServiceByHomeId } from "../../services/room.service";
const PreviewStyles = styled.div`
  display: flex;
  margin-top: 3rem;
  .preview {
    &-thumb {
      width: 43rem;
      height: 41rem;
      border-radius: 0.8rem;
      overflow: hidden;
    }
    &-content {
      width: 50rem;
      padding: 0 4rem;
      max-height: 41rem;
      overflow-y: auto;
      &::-webkit-scrollbar {
        display: none;
      }
      /* Hide scrollbar for IE, Edge and Firefox */
      & {
        -ms-overflow-style: none; /* IE and Edge */
        scrollbar-width: none; /* Firefox */
      }
      &__title {
        font-size: 3.2rem;
        font-weight: 700;
        margin-bottom: 2rem;
      }
      &__hostname {
        font-size: 2.2rem;
        font-weight: 700;
        margin-bottom: 1rem;
      }
      &__floor-plan {
        font-size: 1.6rem;
        font-weight: 600;
      }
      &__desc {
        margin: 3rem 0;
        font-size: 1.6rem;
        font-weight: 600;
        color: gray;
      }
      &-service {
        &__title {
          font-size: 1.8rem;
          font-weight: 600;
          margin-bottom: 2.4rem;
        }
        &__item {
          margin: 1.6rem 0;
          padding-bottom: 1.6rem;
        }
      }
    }
  }
  .avatar-hostname {
    width: 5.6rem;
    height: 5.6rem;
    border-radius: 5.6rem;
    overflow: hidden;
  }
  .group-info {
    width: 32rem;
  }
  .service-remaining {
    color: gray;
  }
`;

type Props = {
  home: any;
};

const Preview = ({ home }: Props) => {
  const accountSelector = useAppSelector(selectAccount);
  let { account } = accountSelector;
  const dispatch = useAppDispatch();
  const [services, setServices] = useState([]);
  console.log(accountSelector.account);
  useEffect(() => {
    dispatch(findServiceByHomeId(home?.id))
      .then((res) => {
        let { service } = res.payload.data;
        console.log(service);
        
        setServices(service);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <PreviewStyles>
      <div className="preview-thumb">
        <img src={home.image_main} alt="" />
      </div>
      <div className="preview-content">
        <h2 className="preview-content__title">{home.title}</h2>
        <div className="preview-content__infor">
          <div className="flex items-center justify-between">
            <h3 className="preview-content__hostname">
              Chủ nhà {account?.username}
            </h3>
            <div className="avatar-hostname">
              <img src={account?.avatar} alt="" />
            </div>
          </div>
          <div className="preview-content__floor-plan group-info">
            {home.max_passenger} khách · {home.bathroom} phòng tắm chung ·{" "}
            {home.bed} giường
          </div>
          <p className="preview-content__desc">{home.description}</p>
          <div className="preview-content-service">
            <h3 className="preview-content-service__title">Tiện nghi</h3>
            <ul className="preview-content-service__list">
              {services.slice(0, 5).map((item: any, index: number) => (
                <li className="preview-content-service__item flex items-center justify-between" key={item.id}>
                  <div className="preview-content-service__item--title">
                  {item.name}
                  </div>
                  <i className={item.icon_service}></i>
                </li>
              ))}
              <li className="preview-content-service__item service-remaining">
                <div className="preview-content-service__item--title">
                  +{services.length - 5} tiện nghi nữa
                </div>
              </li>
            </ul>
            <h3 className="preview-content-service__title">Vị trí</h3>
            <span className="preview-content-service__location">
              {home.address}
            </span>
          </div>
        </div>
      </div>
    </PreviewStyles>
  );
};

export default Preview;
