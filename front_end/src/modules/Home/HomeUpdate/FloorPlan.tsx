import React, { useState, ChangeEvent, useEffect } from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { updateRoomAsync } from "../../../services/room.service";
import Swal from "sweetalert2";
import { selectRoom, setRoom } from "../../../features/room/roomSlice";
import { useParams } from "react-router-dom";

const FloorPlanStyles = styled.div`
  border: 1px solid #8080804f;
  border-radius: 0.8rem;
  margin-bottom: 2rem;

  .homeUpdate {
    &__floorPlan {
      font-weight: 700;
      &--main {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin: 2rem 2rem;
      }
      &--footer {
        border-top: 1px solid #8080804f;
        display: flex;
        justify-content: space-between;
        padding: 1.5rem 2rem;
      }
    }
    &__desc {
      font-size: 1.2rem;
      font-weight: 600;
      color: gray;
      margin-bottom: 2rem;
    }
    &__info {
      max-width: 60rem;
    }
    &__close {
      font-size: 1.4rem;
      line-height: 1;
    }
    &__title {
      font-weight: 700;
    }
  }

  .btn-down,
  .btn-up {
    width: 3.5rem;
    height: 3.5rem;
    line-height: 3.5rem;
    text-align: center;
    color: gray;
    border: 1px solid gray;
    border-radius: 3.5rem;
  }
  .btn-down:hover,
  .btn-up:hover {
    transition: 0.2s linear;
    border-color: black;
    color: black;
  }
  .floor-plan {
    max-width: 60rem;
  }
  .item {
    &-group {
      width: 100%;

      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 5rem;
    }
    &-title {
      color: #404040;
      font-weight: bold;
    }
    &-count {
      display: flex;
      align-items: center;
      .amount {
        padding: 0 1.5rem;
      }
    }
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

  .not-allow {
    border-color: #c13515 !important;
  }

  .btn-not-allow {
    background-color: #ddd !important;
  }
`;

type Props = {
  home: any;
  toogleUpdate: any;
  setToogleUpdate: (toogleUpdate: any) => void;
};

type NameObject = "max_passenger" | "bed" | "bathroom" | "bedroom";

const FloorPlan = ({ home, setToogleUpdate, toogleUpdate }: Props) => {
  const [check, setCheck] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  const [data, setData] = useState<any>();
  const { room_id } = useParams();
  const roomSelector = useAppSelector(selectRoom);
  const handleClickUp = (name: NameObject) => {
    setData({ ...data, [name]: data[name] + 1 });
  };
  const handleClickDown = (name: NameObject) => {
    if (data[name] > 1) {
      setData({ ...data, [name]: data[name] - 1 });
    }
  };
  const handleClose = () => {
    setToogleUpdate({ ...toogleUpdate, floorPlanToggle: false });
  };

  const handleSave = async () => {
    try {
      let res = await dispatch(updateRoomAsync({ ...data, room_id }));
      let { status } = res.payload.data;
      if (status) {
        Swal.fire({
          position: "center",
          icon: status,
          title: "Cập nhật nhà/phòng thành công",
          showConfirmButton: false,
          timer: 1500,
        }).then((result) => {
          if (status === "success") {
            dispatch(setRoom({ ...roomSelector.room, ...data }));
            setToogleUpdate({ ...toogleUpdate, floorPlanToggle: false });
          }
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setData({
      max_passenger: home.max_passenger,
      bed: home.bed,
      bathroom: home.bathroom,
      bedroom: home.bedroom,
    });
  }, [home]);

  return (
    <FloorPlanStyles>
      <div className="homeUpdate__floorPlan--main">
        <div className="homeUpdate__info">
          <h2 className="homeUpdate__title">Khách / không gian phòng</h2>
          <p className="homeUpdate__desc">
            Căn cứ theo thông tin nhà/phòng bạn cho thuê
          </p>
          <div className="item-group">
            <div className="item-title">Phòng ngủ</div>
            <div className="item-count">
              {data?.bedroom > 1 && (
                <button
                  className="btn-down"
                  onClick={() => handleClickDown("bedroom")}
                >
                  <i className="fa-regular fa-minus"></i>
                </button>
              )}

              <span className="amount">{data?.bedroom}</span>
              <button
                className="btn-up"
                onClick={() => handleClickUp("bedroom")}
              >
                <i className="fa-regular fa-plus"></i>
              </button>
            </div>
          </div>
          <div className="item-group">
            <div className="item-title">Giường</div>
            <div className="item-count">
              {data?.bed > 1 && (
                <button
                  className="btn-down"
                  onClick={() => handleClickDown("bed")}
                >
                  <i className="fa-regular fa-minus"></i>
                </button>
              )}

              <span className="amount">{data?.bed}</span>
              <button className="btn-up" onClick={() => handleClickUp("bed")}>
                <i className="fa-regular fa-plus"></i>
              </button>
            </div>
          </div>
          <div className="item-group">
            <div className="item-title">Khách</div>
            <div className="item-count">
              {data?.max_passenger > 1 && (
                <button
                  className="btn-down"
                  onClick={() => handleClickDown("max_passenger")}
                >
                  <i className="fa-regular fa-minus"></i>
                </button>
              )}

              <span className="amount">{data?.max_passenger}</span>
              <button
                className="btn-up"
                onClick={() => handleClickUp("max_passenger")}
              >
                <i className="fa-regular fa-plus"></i>
              </button>
            </div>
          </div>

          <div className="item-group">
            <div className="item-title">Phòng tắm</div>
            <div className="item-count">
              {data?.bathroom > 1 && (
                <button
                  className="btn-down"
                  onClick={() => handleClickDown("bathroom")}
                >
                  <i className="fa-regular fa-minus"></i>
                </button>
              )}

              <span className="amount">{data?.bathroom}</span>
              <button
                className="btn-up"
                onClick={() => handleClickUp("bathroom")}
              >
                <i className="fa-regular fa-plus"></i>
              </button>
            </div>
          </div>
        </div>
        <button className="homeUpdate__close" onClick={handleClose}>
          <i className="fa-regular fa-x"></i>
        </button>
      </div>
      <div className="homeUpdate__floorPlan--footer">
        <button onClick={handleClose} className="btn-close">
          Hủy
        </button>
        <button
          onClick={handleSave}
          className={`btn-save ${!check ? "btn-not-allow" : ""}`}
          disabled={!check}
        >
          Lưu
        </button>
      </div>
    </FloorPlanStyles>
  );
};

export default FloorPlan;
