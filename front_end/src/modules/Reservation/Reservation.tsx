import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Table from "../../components/table/Table";
import { useAppDispatch } from "../../app/hooks";
import { getContractByHostAsync } from "../../services/contract.service";
import { format } from "date-fns";
import { fommatCurrency } from "../../configs/formatCurrency";

const ReservationStyles = styled.div`
  .table {
    .title {
      font-size: 1.6rem;
    }
    .img-item {
      height: 4rem;
      width: 5.6rem;
      margin-right: 2rem;
      background-color: #b0b0b0;
      border-radius: 0.4rem;
      overflow: hidden;
    }
  }
  .status {
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
    &.warning {
      background-color: #fbc531;
    }
    &.pending {
      background-color: #718093;
    }
  }
  .btn-work-to-do {
    padding: 0.7rem 1rem;
    font-weight: 700;
    font-size: 1.4rem;
    text-align: center;
    border-radius: 0.8rem;
    border: 1px solid black;
    cursor: pointer;
    margin-right: 2rem;
  }
`;

const Reservation = () => {
  const { booking_type } = useParams();
  const dispatch = useAppDispatch();
  const [contracts, setContracts] = useState([]);
  useEffect(() => {
    dispatch(getContractByHostAsync())
      .then((res) => {
        const { contracts } = res.payload.data;
        setContracts(contracts);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [booking_type]);
  return (
    <ReservationStyles>
      <div className="table">
        <Table>
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">Nhà/Phòng thuê</th>
              <th scope="col">Địa chỉ</th>
              <th scope="col">Ngày đến</th>
              <th scope="col">Ngày trả</th>
              <th scope="col">Khách</th>
              <th scope="col">Đã trả</th>
              <th scope="col">Tổng tiền</th>
              <th scope="col">Trạng thái</th>
              <th scope="col">Lựa chọn</th>
            </tr>
          </thead>
          <tbody>
            {contracts.map((item: any, index: number) => (
              <tr key={item?.id}>
                <th scope="row">{index + 1}</th>
                <td className="title flex items-center">
                  <div className="img-item flex items-center justify-center">
                    <img src={item?.image_main} alt="image_main" />
                  </div>
                  {item?.title}
                </td>
                <td>{item.address}</td>
                <td>{format(Date.parse(item?.checkin), "dd/MM/yyyy")}</td>
                <td>{format(Date.parse(item?.checkout), "dd/MM/yyyy")}</td>
                <td>
                  <div className="group">
                    <div>{item?.user_booking}</div>
                    <div>
                      {item?.numberOfAdults} người lớn
                      {item?.numberOfChildrens
                        ? `, ${item?.numberOfChildrens} trẻ em`
                        : ""}
                      {item?.numberOfInfants
                        ? `, ${item?.numberOfInfants} em bé`
                        : ""}
                    </div>
                  </div>
                </td>
                <td>
                  {item?.status_payment === 1
                    ? `${fommatCurrency("vi-VN", "VND").format(
                        item?.total_money
                      )}`
                    : `${fommatCurrency("vi-VN", "VND").format(
                        item?.total_money / 2
                      )}`}
                </td>
                <td>
                  {fommatCurrency("vi-VN", "VND").format(item?.total_money)}
                </td>
                <td>
                  {item?.status === 1 ? (
                    <>
                      <span className="status success"></span>
                      Đã xác nhận
                    </>
                  ) : (
                    ""
                  )}
                  {item?.status === 2 ? (
                    <>
                      <span className="status pending"></span>
                      Chờ xác nhận
                    </>
                  ) : (
                    ""
                  )}
                  {item?.status === 3 ? (
                    <>
                      <span className="status danger"></span>
                      Đã hủy
                    </>
                  ) : (
                    ""
                  )}
                  {item?.status === 4 ? (
                    <>
                      <span className="status warning"></span>
                      Chờ thanh toán
                    </>
                  ) : (
                    ""
                  )}
                </td>
                <td>
                  <button className="btn-work-to-do">Đánh giá</button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </ReservationStyles>
  );
};

export default Reservation;
