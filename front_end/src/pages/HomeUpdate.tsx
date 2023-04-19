import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useNavigate, useParams } from "react-router-dom";
import { findImageByHomeId, findRoomByIdAsync } from "../services/room.service";
import Title from "../modules/Home/HomeUpdate/Title";
import Description from "../modules/Home/HomeUpdate/Description";
import Status from "../modules/Home/HomeUpdate/Status";
import Location from "../modules/Home/HomeUpdate/Location";
import Structure from "../modules/Home/HomeUpdate/Structure";
import FloorPlan from "../modules/Home/HomeUpdate/FloorPlan";
import Price from "../modules/Home/HomeUpdate/Price";
import { selectRoom } from "../features/room/roomSlice";
import { getCategoriesAsync } from "../services/category.service";
import TripTime from "../modules/Home/HomeUpdate/TripTime";
const HomeUpdateStyles = styled.div`
  .home-update {
    &__name {
      font-size: 3rem;
      font-weight: bold;
      margin-bottom: 3rem;
    }
    &-title {
      font-weight: 600;
    }
    &__title {
      font-size: 2rem;
      font-weight: bold;
      margin-bottom: 1rem;
    }
    .title {
      font-size: 1.8rem;
      font-weight: bold;
      margin-bottom: 2rem;
    }
    &-photos {
      &__list {
        display: flex;
        justify-content: space-between;
        margin-bottom: 5rem;
      }
      &__item {
        width: calc(100% / 4 - 1rem);
        height: 12rem;
        border-radius: 0.8rem;
        overflow: hidden;
      }
    }
    .btn-edit {
      font-size: 1.6rem;
      font-weight: 600;
      cursor: pointer;
      text-decoration: underline;
      flex-shrink: 0;
    }

    &-desc {
      font-size: 1.5rem;
      color: gray;
    }
    &-group {
      margin-bottom: 4rem;
    }
  }
`;
const HomeUpdate = () => {
  const dispatch = useAppDispatch();
  const { room_id } = useParams();
  const [listImage, setListImage] = useState<Array<any>>([]);
  const roomSelector = useAppSelector(selectRoom);
  const navigate = useNavigate();
  const [categoryName, setCategoryName] = useState<string>("");
  const [categories, setCategories] = useState([]);
  const [toogleUpdate, setToogleUpdate] = useState<any>({
    titleToggle: false,
    descriptionToggle: false,
    statusToggle: false,
    locationToggle: false,
    categoryToggle: false,
    priceToggle: false,
    floorPlanToggle: false,
    minimumTime: false,
    maximumTime: false,
  });
  useEffect(() => {
    dispatch(findRoomByIdAsync(room_id!))
      .then((res) => {
        const { home } = res.payload.data;
        setListImage((prevState) => [
          ...prevState,
          { url: home.image_main, public_id: home.public_id },
        ]);
      })
      .catch((err) => {
        console.log(err);
      });

    dispatch(findImageByHomeId(room_id!))
      .then((res) => {
        let imageListClone: any = [];
        const { images } = res.payload.data;
        images.forEach((item: any) => {
          imageListClone = [
            ...imageListClone,
            { url: item.url, public_id: item.public_id },
          ];
        });
        setListImage((prevState) => [...prevState, ...imageListClone]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    dispatch(getCategoriesAsync())
      .then((res) => {
        let { categories } = res.payload.data;
        let category = categories.find(
          (item: any) => item.id === roomSelector.room.category_id
        );
        setCategories(categories);
        setCategoryName(category?.name);
      })
      .catch((err) => console.log(err));
  }, [roomSelector.room.category_id]);
  console.log(roomSelector);

  return (
    <HomeUpdateStyles>
      <div className="container-md">
        <div className="home-update">
          <h2 className="home-update__title">Chi tiết nhà/phòng cho thuê</h2>
          <h3 className="home-update__name">{roomSelector.room?.title}</h3>

          <div className="home-update-photos">
            <div className="group flex justify-between mb-5">
              <h3 className="title">Ảnh</h3>
              <div
                className="btn-edit"
                onClick={() =>
                  navigate(`/manage-your-space/${room_id}/details/photos`)
                }
              >
                Chỉnh sửa{" >"}
              </div>
            </div>

            <div className="home-update-photos__list">
              {listImage.map((item: any, index: number) => (
                <div className="home-update-photos__item" key={index}>
                  <img src={item.url} alt="" />
                </div>
              ))}
            </div>
            <div className="home-update-info">
              <h3 className="title">Thông tin cơ bản về nhà/phòng cho thuê</h3>
              {toogleUpdate.titleToggle ? (
                <Title
                  title={roomSelector.room?.title}
                  setToogleUpdate={setToogleUpdate}
                  toogleUpdate={toogleUpdate}
                ></Title>
              ) : (
                <div className="home-update-group flex items-center justify-between">
                  <div className="group">
                    <h4 className="home-update-title">
                      Tiêu đề nhà/phòng cho thuê
                    </h4>
                    <div className="home-update-desc">
                      {roomSelector.room?.title}
                    </div>
                  </div>
                  <div
                    className="btn-edit"
                    onClick={() =>
                      setToogleUpdate({ ...toogleUpdate, titleToggle: true })
                    }
                  >
                    Chỉnh sửa
                  </div>
                </div>
              )}

              {toogleUpdate.descriptionToggle ? (
                <Description
                  description={roomSelector.room?.description}
                  setToogleUpdate={setToogleUpdate}
                  toogleUpdate={toogleUpdate}
                ></Description>
              ) : (
                <div className="home-update-group flex justify-between">
                  <div className="group">
                    <h4 className="home-update-title">
                      Mô tả nhà/phòng cho thuê
                    </h4>
                    <div className="home-update-desc">
                      Kết nối lại với những người thân yêu tại địa điểm phù hợp
                      cho gia đình này.
                    </div>
                  </div>
                  <div
                    className="btn-edit"
                    onClick={() =>
                      setToogleUpdate({
                        ...toogleUpdate,
                        descriptionToggle: true,
                      })
                    }
                  >
                    Chỉnh sửa
                  </div>
                </div>
              )}

              {toogleUpdate.statusToggle ? (
                <Status
                  statusData={roomSelector.room?.status}
                  setToogleUpdate={setToogleUpdate}
                  toogleUpdate={toogleUpdate}
                ></Status>
              ) : (
                <div className="home-update-group flex justify-between">
                  <div className="group">
                    <h4 className="home-update-title">
                      Trạng thái nhà/phòng cho thuê
                    </h4>
                    <div className="home-update-desc pr-10">
                      {roomSelector.room?.status === 1 ? (
                        <>
                          <span className="home-success"></span> Đã đăng - Khách
                          có thể tìm thấy nhà/phòng cho thuê của bạn trong kết
                          quả tìm kiếm và yêu cầu thông tin về tình trạng còn
                          phòng hoặc đặt phòng vào những ngày còn trống
                        </>
                      ) : (
                        <>
                          <span className="home-danger"></span> Đã hủy đăng -
                          Khách không thể đặt phòng hoặc tìm thấy nhà/phòng cho
                          thuê của bạn trong kết quả tìm kiếm.
                        </>
                      )}
                    </div>
                  </div>
                  <div
                    className="btn-edit"
                    onClick={() =>
                      setToogleUpdate({ ...toogleUpdate, statusToggle: true })
                    }
                  >
                    Chỉnh sửa
                  </div>
                </div>
              )}

              <div className="group flex justify-between mt-28 mb-20">
                <h3 className="title">Tiện nghi</h3>
                <div
                  className="btn-edit"
                  onClick={() =>
                    navigate(`/manage-your-space/${room_id}/details/amenities`)
                  }
                >
                  Chỉnh sửa {">"}
                </div>
              </div>

              {toogleUpdate.priceToggle ? (
                <Price
                  priceData={roomSelector.room?.price}
                  setToogleUpdate={setToogleUpdate}
                  toogleUpdate={toogleUpdate}
                ></Price>
              ) : (
                <div className="home-update-group flex justify-between">
                  <div className="group">
                    <h4 className="home-update-title">Giá phòng/nhà</h4>
                    <div className="home-update-desc">
                      ₫ {roomSelector.room?.price}
                    </div>
                  </div>
                  <div
                    className="btn-edit"
                    onClick={() =>
                      setToogleUpdate({
                        ...setToogleUpdate,
                        priceToggle: true,
                      })
                    }
                  >
                    Chỉnh sửa
                  </div>
                </div>
              )}

              <h3 className="title">Thời gian chuyến đi</h3>

              {toogleUpdate.minimumTime ? (
                <TripTime
                  setToogleUpdate={setToogleUpdate}
                  toogleUpdate={toogleUpdate}
                  type="minimum"
                  countTime={roomSelector.room?.minimumTime}
                  minimumTime={roomSelector.room?.minimumTime}
                  maximumTime={roomSelector.room?.maximumTime}
                ></TripTime>
              ) : (
                <div className="home-update-group flex justify-between">
                  <div className="group">
                    <h4 className="home-update-title">Thời gian ở tối thiểu</h4>
                    <div className="home-update-desc">
                      {roomSelector.room?.minimumTime} đêm
                    </div>
                  </div>
                  <div
                    className="btn-edit"
                    onClick={() =>
                      setToogleUpdate({
                        ...setToogleUpdate,
                        minimumTime: true,
                      })
                    }
                  >
                    Chỉnh sửa
                  </div>
                </div>
              )}

              {toogleUpdate.maximumTime ? (
                <TripTime
                  setToogleUpdate={setToogleUpdate}
                  toogleUpdate={toogleUpdate}
                  type="maximum"
                  countTime={roomSelector.room?.maximumTime}
                  minimumTime={roomSelector.room?.minimumTime}
                  maximumTime={roomSelector.room?.maximumTime}
                ></TripTime>
              ) : (
                <div className="home-update-group flex justify-between">
                  <div className="group">
                    <h4 className="home-update-title">Thời gian ở tối đa</h4>
                    <div className="home-update-desc">
                      {roomSelector.room?.maximumTime} đêm
                    </div>
                  </div>
                  <div
                    className="btn-edit"
                    onClick={() =>
                      setToogleUpdate({
                        ...setToogleUpdate,
                        maximumTime: true,
                      })
                    }
                  >
                    Chỉnh sửa
                  </div>
                </div>
              )}

              <h3 className="title">Vị trí</h3>

              {toogleUpdate.locationToggle ? (
                <Location
                  setToogleUpdate={setToogleUpdate}
                  toogleUpdate={toogleUpdate}
                ></Location>
              ) : (
                <div className="home-update-group flex justify-between">
                  <div className="group">
                    <h4 className="home-update-title">Địa chỉ</h4>
                    <div className="home-update-desc">
                      {roomSelector.room?.address}
                    </div>
                  </div>
                  <div
                    className="btn-edit"
                    onClick={() =>
                      setToogleUpdate({
                        ...setToogleUpdate,
                        locationToggle: true,
                      })
                    }
                  >
                    Chỉnh sửa
                  </div>
                </div>
              )}

              <h3 className="title">Chỗ ở và phòng</h3>

              {toogleUpdate.categoryToggle ? (
                <Structure
                  categoryNameData={categoryName}
                  categoriesData={categories}
                  setToogleUpdate={setToogleUpdate}
                  toogleUpdate={toogleUpdate}
                ></Structure>
              ) : (
                <div className="home-update-group flex justify-between">
                  <div className="group">
                    <h4 className="home-update-title">Loại chỗ ở</h4>
                    <div className="home-update-desc">{categoryName}</div>
                  </div>
                  <div
                    className="btn-edit"
                    onClick={() =>
                      setToogleUpdate({
                        ...setToogleUpdate,
                        categoryToggle: true,
                      })
                    }
                  >
                    Chỉnh sửa
                  </div>
                </div>
              )}

              {toogleUpdate.floorPlanToggle ? (
                <FloorPlan
                  home={roomSelector.room}
                  setToogleUpdate={setToogleUpdate}
                  toogleUpdate={toogleUpdate}
                ></FloorPlan>
              ) : (
                <div className="home-update-group flex justify-between">
                  <div className="group">
                    <h4 className="home-update-title">
                      Phòng và không gian khác
                    </h4>
                    <div className="home-update-desc">
                      Phòng ngủ: {roomSelector.room?.bedroom} <br />
                      Giường: {roomSelector.room?.bed} <br />
                      Số lượng khách: {roomSelector.room?.max_passenger} <br />
                      Phòng tắm: {roomSelector.room?.bathroom} <br />
                    </div>
                  </div>
                  <div
                    className="btn-edit"
                    onClick={() =>
                      setToogleUpdate({
                        ...toogleUpdate,
                        floorPlanToggle: true,
                      })
                    }
                  >
                    Chỉnh sửa
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </HomeUpdateStyles>
  );
};

export default HomeUpdate;
