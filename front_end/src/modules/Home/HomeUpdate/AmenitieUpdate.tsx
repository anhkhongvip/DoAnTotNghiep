import React, { ChangeEvent, useState, useEffect } from "react";
import { useAppDispatch } from "../../../app/hooks";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { getServiceAsync } from "../../../services/amenitie.service";
import {
  findRoomByIdAsync,
  findServiceByHomeId,
  updateRoomAsync,
} from "../../../services/room.service";
import Swal from "sweetalert2";
const AmenitieStyles = styled.div`
  margin-bottom: 2rem;
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

  .btn-close {
    font-weight: 700;
  }
  .btn-save {
    background-color: black;
    color: white;
    padding: 0.5rem 1.5rem;
    border-radius: 0.8rem;
    font-weight: 700;
  }
`;
const AmenitieUpdate = () => {
  const dispatch = useAppDispatch();
  const { room_id } = useParams();
  const [listService, setListService] = useState([]);
  const [listServiceSelect, setListServiceSelect] = useState<Array<number>>([]);
  const [check, setCheck] = useState<boolean>(false);
  const [data, setData] = useState<any>([]);
  const navigate = useNavigate();
  useEffect(() => {
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
  }, []);
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

  const handleClose = () => {
    navigate(`/manage-your-space/${room_id}/details/`);
  };

  const handleSave = async () => {
    try {
      let res = await dispatch(updateRoomAsync({...data, room_id}));
      let { status } = res.payload.data;
      if (status) {
        Swal.fire({
          position: "center",
          icon: status,
          title: "Cập nhật dịch vụ nhà/phòng thành công",
          showConfirmButton: false,
          timer: 1500,
        }).then((result) => {
          if (status === "success") {
            navigate(`/manage-your-space/${room_id}/details`);
          }
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AmenitieStyles>
      <div className="container-sm amenitie">
        <h2 className="title-list-service">Phổ biến</h2>
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
        <h2 className="title-list-service">Nổi bật</h2>
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
        <h2 className="title-list-service">An toàn</h2>
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
        <div className="footer flex justify-between">
          <button onClick={handleClose} className="btn-close">
            Quay lại
          </button>
          <button
            onClick={handleSave}
            className={`btn-save ${!check ? "btn-not-allow" : ""}`}
            disabled={!check}
          >
            Lưu
          </button>
        </div>
      </div>
    </AmenitieStyles>
  );
};

export default AmenitieUpdate;
