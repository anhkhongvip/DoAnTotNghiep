import React, { useEffect, useState, ChangeEvent } from "react";
import styled from "styled-components";
import { setStep } from "../../features/room/roomSlice";
import { useAppDispatch } from "../../app/hooks";
import { useParams } from "react-router-dom";
import { useData } from "../../pages/layout/Host/HostLayout";
import { useCheck } from "../../contexts/checkContext";
import { CheckContextType } from "../../@types/check";
import { getServiceAsync } from "../../services/amenitie.service";
import {
  findRoomByIdAsync,
  findServiceByHomeId,
} from "../../services/room.service";
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
    margin-bottom: 2rem;
  }
  .label-service {
    display: flex;
    flex-direction: column;
    border: 1px solid #dddddd;
    padding: 2rem 1.5rem;
    height: 12rem;
    border-radius: 0.8rem;
    transition: box-shadow 0.2s ease, transform 0.1s ease;
    cursor: pointer;
    &:hover {
      border-color: transparent;
      box-shadow: 0 0 0 2px #000000;
    }
    &:active {
      transform: scale(0.96);
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
  .title-list-service {
    font-size: 1.8rem;
    font-weight: 700;
    margin: 2rem 0;
  }
`;
type Props = {
  step: number;
};

const Amenitie = ({ step }: Props) => {
  const dispatch = useAppDispatch();
  const { room_id } = useParams();
  const { data, setData } = useData();
  const { setCheck } = useCheck() as CheckContextType;
  const [listService, setListService] = useState([]);
  const [listServiceSelect, setListServiceSelect] = useState<Array<number>>([]);
  useEffect(() => {
    dispatch(setStep(step));
    dispatch(getServiceAsync())
      .then((res) => {
        console.log(res);
        if (res.payload.data) {
          let { services } = res.payload.data;
          setListService(services);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    dispatch(findRoomByIdAsync(room_id!))
      .then((res) => {
        let { home } = res.payload.data;
        if (step > home.stepProgress) {
          setData({
            stepProgress: step,
            nextPage: `/become-a-host/${room_id}/photos`,
            backPage: `/become-a-host/${room_id}/stand-out`,
          });
        } else {
          setData({
            nextPage: `/become-a-host/${room_id}/photos`,
            backPage: `/become-a-host/${room_id}/stand-out`,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [step]);

  useEffect(() => {
    if (listService.length > 0) {
      dispatch(findServiceByHomeId(room_id!))
        .then((res) => {
          let { service } = res.payload.data;
          let cloneArray: Array<number> = [];
          if (service.length > 0) {
            setCheck(true);
            service.forEach((item: any) => {
              cloneArray = [...cloneArray, item.service_id];
              (document.querySelector(
                `#service-${item.service_id}`
              ) as HTMLInputElement)!.checked = true;
            });
          } else {
            setCheck(false);
          }
          setListServiceSelect(cloneArray);
          setData({
            ...data,
            listServiceSelect: cloneArray,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [listService]);

  const handleChange = (event: ChangeEvent) => {
    let { checked, value } = event.target as HTMLInputElement;
    let index: number | null = null;
    let cloneArray: Array<number>;
    console.log(checked, value);
    if (checked === true) {
      cloneArray = [...listServiceSelect, Number(value)];
      setListServiceSelect(cloneArray);
    } else {
      cloneArray = [...listServiceSelect];
      index = cloneArray.findIndex((item: number) => item === Number(value));
      cloneArray.splice(index, 1);
      setListServiceSelect(cloneArray);
    }
    setData({ ...data, listServiceSelect: cloneArray });
    setCheck(true);
  };
  return (
    <AmenitieStyles>
      <div className="container-sm amenitie">
        <h2 className="title">Cho khách biết chỗ ở của bạn có những gì</h2>
        <p className="description">
          Bạn có thể thêm tiện nghi sau khi đăng mục cho thuê.
        </p>
        <div className="list-service">
          {listService.map((item: any, index: number) => {
            if (item.type_service === 1) {
              return (
                <div className="service-item" key={item.id}>
                  <input
                    type="checkbox"
                    id={`service-${item.id}`}
                    className="input-service"
                    value={item.id}
                    onChange={handleChange}
                  />
                  <label
                    htmlFor={`service-${item.id}`}
                    className="label-service"
                  >
                    <i className={item.icon_service}></i>
                    <div className="title-service">{item.name}</div>
                  </label>
                </div>
              );
            } else {
              return null;
            }
          })}
        </div>
        <h2 className="title-list-service">
          Bạn có tiện nghi nào nổi bật không?
        </h2>
        <div className="list-service">
          {listService.map((item: any, index: number) => {
            if (item.type_service === 2) {
              return (
                <div className="service-item" key={item.id}>
                  <input
                    type="checkbox"
                    id={`service-${item.id}`}
                    className="input-service"
                    value={item.id}
                    onChange={handleChange}
                  />
                  <label
                    htmlFor={`service-${item.id}`}
                    className="label-service"
                  >
                    <i className={item.icon_service}></i>
                    <div className="title-service">{item.name}</div>
                  </label>
                </div>
              );
            } else {
              return null;
            }
          })}
        </div>
        <h2 className="title-list-service">
          Bạn có tiện nghi nào trong số những tiện nghi đảm bảo an toàn sau đây
          không?
        </h2>
        <div className="list-service">
          {listService.map((item: any, index: number) => {
            if (item.type_service === 3) {
              return (
                <div className="service-item" key={item.id}>
                  <input
                    type="checkbox"
                    id={`service-${item.id}`}
                    className="input-service"
                    value={item.id}
                    onChange={handleChange}
                  />
                  <label
                    htmlFor={`service-${item.id}`}
                    className="label-service"
                  >
                    <i className={item.icon_service}></i>
                    <div className="title-service">{item.name}</div>
                  </label>
                </div>
              );
            } else {
              return null;
            }
          })}
        </div>
      </div>
    </AmenitieStyles>
  );
};

export default Amenitie;
