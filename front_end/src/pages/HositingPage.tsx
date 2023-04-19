import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Table from "../components/table/Table";
import { useAppDispatch } from "../app/hooks";
import { findRoomByHostAsync } from "../services/room.service";
const HositingPageStyles = styled.div`
  max-width: 153.6rem;
  margin: 0 auto;
  margin-top: 5rem;
  padding: 0 3rem;
  .host-listings {
    &-header {
      display: flex;
      justify-content: space-between;
      .title {
        font-weight: bold;
        font-size: 2rem;
      }
      .btn-create-rent {
        padding: 0 1.6rem;
        height: 4rem;
        border: 1px solid #222222;
        border-radius: 0.8rem;
        font-weight: bold;
        i {
          margin-right: 1rem;
        }
      }
    }
    &-search {
      display: flex;
      align-items: center;
      width: 32.5rem;
      border: 1px solid black;
      border-radius: 30rem;
      & i {
        padding: 0.8rem 0.8rem;
      }
      & input {
        width: calc(100% - 5rem);
      }
    }
  }

  .table {
    .img-item {
      height: 4rem;
      width: 5.6rem;
      margin-right: 2rem;
      background-color: #b0b0b0;
      border-radius: 0.4rem;
      overflow: hidden;
    }
    /* .td-address {
      max-width: 40rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    } */
  }
  .home-status {
    width: 1rem;
    height: 1rem;
    border-radius: 2rem;
    margin-right: 1rem;
    display: inline-block;
    &.success {
      background-color: green;
    }
    &.danger {
      background-color: #c13515;
    }
  }
  .btn-work-to-do {
    padding: 0.7rem 0;
    font-weight: 700;
    font-size: 1.4rem;
    text-align: center;
    border-radius: 0.8rem;
    border: 1px solid black;
    cursor: pointer;
  }
`;
const HositingPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [listHome, setListHome] = useState<any>([]);
  useEffect(() => {
    dispatch(findRoomByHostAsync())
      .then((res) => {
        console.log(res);
        const { homes } = res.payload.data;
        setListHome(homes);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleComplete = (step: string, room_id: string) => {
    switch (String(step)) {
      case "1":
        navigate(`/become-a-host/${room_id}/about-your-place`);
        break;
      case "2":
        navigate(`/become-a-host/${room_id}/structure`);
        break;
      case "3":
        navigate(`/become-a-host/${room_id}/location`);
        break;
      case "4":
        navigate(`/become-a-host/${room_id}/floor-plan`);
        break;
      case "5":
        navigate(`/become-a-host/${room_id}/stand-out`);
        break;
      case "6":
        navigate(`/become-a-host/${room_id}/amenities`);
        break;
      case "7":
        navigate(`/become-a-host/${room_id}/photos`);
        break;
      case "8":
        navigate(`/become-a-host/${room_id}/title`);
        break;
      case "9":
        navigate(`/become-a-host/${room_id}/description`);
        break;
      case "10":
        navigate(`/become-a-host/${room_id}/finish-setup`);
        break;
      case "11":
        navigate(`/become-a-host/${room_id}/price`);
        break;
      case "12":
        navigate(`/become-a-host/${room_id}/receipt`);
        break;
    }
  };
  return (
    <HositingPageStyles>
      <div className="host-listings-header">
        <div className="title">{listHome.length} nhà / phòng cho thuê</div>
        <button
          className="btn btn-create-rent"
          onClick={() => navigate("/become-a-host/overview")}
        >
          <i className="fa-regular fa-plus"></i>Tạo mục cho thuê
        </button>
      </div>
      <div className="host-listings-filter">
        <div className="host-listings-search">
          <i className="fa-regular fa-magnifying-glass"></i>
          <input
            type="text"
            className="host-listings-query"
            autoComplete="off"
            placeholder="Tìm kiếm nhà/phòng cho thuê"
          />
        </div>
      </div>
      <div className="table">
        <Table>
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">Nhà/Phòng cho thuê</th>
              <th scope="col">Trạng Thái</th>
              <th scope="col">Việc Cần Làm</th>
              <th scope="col">Số khách tối đa</th>
              <th scope="col">Giường</th>
              <th scope="col">Phòng Tắm</th>
              <th scope="col">Vị Trí</th>
            </tr>
          </thead>
          <tbody>
            {listHome.map((item: any, index: number) => (
              <tr key={item.id}>
                <th scope="row">{index + 1}</th>
                <td className="title flex items-center">
                  <div className="img-item flex items-center justify-center">
                    {item.image_main ? (
                      <img src={item.image_main} alt="image_main" />
                    ) : (
                      <div className="image_default ">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M8.602 1.147l.093.08 7.153 6.914-.696.718L14 7.745V14.5a.5.5 0 0 1-.41.492L13.5 15H10V9.5a.5.5 0 0 0-.41-.492L9.5 9h-3a.5.5 0 0 0-.492.41L6 9.5V15H2.5a.5.5 0 0 1-.492-.41L2 14.5V7.745L.847 8.86l-.696-.718 7.153-6.915a1 1 0 0 1 1.297-.08z"
                            fill="#ffffff"
                          ></path>
                        </svg>
                      </div>
                    )}
                  </div>{" "}
                  {item.title
                    ? item.title
                    : `Room_${new Date(item.created_at).getTime()}`}
                </td>
                <td>
                  {item.status === 1 ? (
                    <>
                      <span className="home-status success"></span>
                      Đã đăng
                    </>
                  ) : item.status === 2 ? (
                    <>
                      <span className="home-status danger"></span>
                      Đã hủy
                    </>
                  ) : (
                    <>
                      <i className="fa-regular fa-hourglass-start mr-3"></i>{" "}
                      Đang tiến hành
                    </>
                  )}
                </td>
                <td>
                  <div
                    className="btn-work-to-do"
                    onClick={
                      item.stepProgress === 12
                        ? () =>
                            navigate(`/manage-your-space/${item.id}/details`)
                        : () => handleComplete(item.stepProgress, item.id)
                    }
                  >
                    {item.stepProgress === 12 ? "Cập nhật" : "Hoàn tất"}
                  </div>{" "}
                </td>
                <td>{item.max_passenger}</td>
                <td>{item.bed}</td>
                <td>{item.bathroom}</td>
                <td>{item.address}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </HositingPageStyles>
  );
};

export default HositingPage;
