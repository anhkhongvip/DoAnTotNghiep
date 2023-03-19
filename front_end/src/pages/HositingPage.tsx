import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Table from "../components/table/Table";
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
    .title {
      display: flex;
      align-items: center;
    }
    .img-item {
        height: 4rem;
        width: 5.6rem;
        margin-right: 2rem;
    }
  }
`;
const HositingPage = () => {
  return (
    <HositingPageStyles>
      <div className="host-listings-header">
        <div className="title">0 nhà / phòng cho thuê</div>
        <button className="btn btn-create-rent">
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
              <th scope="col">Phòng ngủ</th>
              <th scope="col">Giường</th>
              <th scope="col">Phòng Tắm</th>
              <th scope="col">Vị Trí</th>
              <th scope="col">Hành động</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <th scope="row" className="title">
                <div className="img-item">
                  <img
                    src="https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHNob3BwaW5nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                    alt=""
                  />
                </div>{" "}
                Buzzcocks
              </th>
              <td>
                <i className="fa-regular fa-hourglass-start mr-3"></i> Đang tiến
                hành
              </td>
              <td><Link to='' className="btn">Hoàn tất</Link> </td>
              <td>1</td>
              <td>1</td>
              <td>9</td>
              <td>Khương Trung, Hà Nội</td>
              <td>Sửa - Xóa</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </HositingPageStyles>
  );
};

export default HositingPage;
