import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import DropdownMultiple from "../../components/dropdown/DropdownMultiple";
import { useAppDispatch } from "../../app/hooks";
import { findRoomByHostAsync } from "../../services/room.service";
import { fommatCurrency } from "../../configs/formatCurrency";
import { findContractByQueryAsync } from "../../services/contract.service";
const TransactionStyles = styled.div`
  .form-date {
    width: calc(50% - 1rem);
  }
  .dropdown {
    &-month {
      width: calc(60% - 1rem);
    }
    &-year {
      width: calc(40% - 1rem);
    }
  }
  .paid-out {
    margin: 2rem 0;
    font-size: 2rem;
    font-weight: 600;
    &-value {
    }
  }
  .contract-item {
    border: 1px solid #80808040;
    border-top: none;
    padding: 2rem 2rem;
    &:first-child {
      border-top: 1px solid #80808040;
      border-radius: 0.8rem 0.8rem 0 0;
    }
    &:last-child {
      border-radius: 0 0 0.8rem 0.8rem;
    }
    &:first-child:last-child {
      border-radius: 0.8rem;
    }
    &__date {
      font-weight: 600;
    }
  }
  .status {
    display: flex;
    align-items: center;
    color: white;
    padding: 0 0.5rem;
    font-weight: bold;
    font-size: 1.4rem;
    border-radius: 0.8rem;
    &.primary {
      background-color: #00a8ff;
    }
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
`;
const Transaction = () => {
  const [trigger, setTrigger] = useState<boolean>(false);
  const [show, setShow] = useState({
    typeRoom: false,
    startMonth: false,
    startYear: false,
    endMonth: false,
    endYear: false,
  });
  const [select, setSelect] = useState<any>({
    typeRoom: "all",
    startMonth: 1,
    startYear: 2020,
    endMonth: new Date().getMonth() + 1,
    endYear: new Date().getFullYear(),
  });

  const [labelSelect, setLabelSelect] = useState<any>({
    typeRoom: "Tất cả nhà/phòng cho thuê",
    startMonth: "tháng 1",
    startYear: "2020",
    endMonth: `tháng ${new Date().getMonth() + 1}`,
    endYear: new Date().getFullYear(),
  });

  const [data, setData] = useState({
    homes: [],
    contracts: [],
    totalMoney: 0,
  });
  const { transaction_type } = useParams();
  const dispatch = useAppDispatch();
  const handleClick = (
    name: string,
    data: string | number,
    nameSelect: string
  ) => {
    setLabelSelect({
      ...labelSelect,
      [name]: nameSelect,
    });
    setSelect({
      ...select,
      [name]: data,
    });
    setShow({ ...show, [name]: false });
    setTrigger(!trigger);
  };
  useEffect(() => {
    dispatch(findRoomByHostAsync())
      .then((res) => {
        const { homes } = res.payload.data;
        setData({ ...data, homes });
        console.log(1111111, res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    dispatch(
      findContractByQueryAsync({ ...select, status_payment: transaction_type })
    )
      .then((res) => {
        const { contracts } = res.payload.data;
        let totalMoney = 0;
        contracts.forEach((item: any) => {
          if(item.status_payment === 2 && transaction_type !== 'gross-earnings') {
            totalMoney += item.total_money / 2;
          }
          else {
            totalMoney += item.total_money ;
          }
          
        });
        setData((previousData) => ({ ...previousData, contracts, totalMoney }));
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [trigger, transaction_type]);

  return (
    <TransactionStyles>
      {transaction_type === "completed-transactions" ||
      transaction_type === "future-transactions" ? (
        <DropdownMultiple
          labelHeader="Nhà/phòng cho thuê"
          labelName={labelSelect.typeRoom}
          show={show.typeRoom}
          setShow={setShow}
          typeShow="typeRoom"
          showOriginal={show}
        >
          <div
            className="dropdown__content--item-style-1"
            onClick={() =>
              handleClick("typeRoom", "all", "Tất cả nhà/phòng cho thuê")
            }
          >
            Tất cả nhà/phòng cho thuê
          </div>
          {data?.homes.length > 0 && data?.homes.map((item: any, index: number) => {
            if (item.status === 1) {
              return (
                <div
                  className="dropdown__content--item-style-1"
                  onClick={() => handleClick("typeRoom", item.id, item.title)}
                  key={item.id}
                >
                  {item.title}
                </div>
              );
            } else {
              return null;
            }
          })}
        </DropdownMultiple>
      ) : (
        ""
      )}

      {transaction_type !== "future-transactions" ? (
        <div className="group flex justify-between">
          <div className="form-date flex justify-between">
            <div className="dropdown-month">
              <DropdownMultiple
                labelHeader="Từ tháng"
                labelName={labelSelect.startMonth}
                show={show.startMonth}
                setShow={setShow}
                typeShow="startMonth"
                showOriginal={show}
              >
                {new Array(12).fill(0).map((item, index) => (
                  <div
                    className="dropdown__content--item-style-1"
                    key={index}
                    onClick={() =>
                      handleClick("startMonth", index + 1, `Tháng ${index + 1}`)
                    }
                  >{`Tháng ${index + 1}`}</div>
                ))}
              </DropdownMultiple>
            </div>
            <div className="dropdown-year">
              <DropdownMultiple
                labelHeader="Từ năm"
                labelName={labelSelect.startYear}
                show={show.startYear}
                setShow={setShow}
                typeShow="startYear"
                showOriginal={show}
              >
                {new Array(4).fill(0).map((item, index) => (
                  <div
                    className="dropdown__content--item-style-1"
                    key={index}
                    onClick={() =>
                      handleClick("startYear", 2020 + index, `${2020 + index}`)
                    }
                  >{`${2020 + index}`}</div>
                ))}
              </DropdownMultiple>
            </div>
          </div>
          <div className="form-date flex justify-between">
            <div className="dropdown-month">
              <DropdownMultiple
                labelHeader="Đến tháng"
                labelName={labelSelect.endMonth}
                show={show.endMonth}
                setShow={setShow}
                typeShow="endMonth"
                showOriginal={show}
              >
                {new Array(12).fill(0).map((item, index) => (
                  <div
                    className="dropdown__content--item-style-1"
                    key={index}
                    onClick={() =>
                      handleClick("endMonth", index + 1, `Tháng ${index + 1}`)
                    }
                  >{`Tháng ${index + 1}`}</div>
                ))}
              </DropdownMultiple>
            </div>
            <div className="dropdown-year">
              <DropdownMultiple
                labelHeader="Đến năm"
                labelName={labelSelect.endYear}
                show={show.endYear}
                setShow={setShow}
                typeShow="endYear"
                showOriginal={show}
              >
                {new Array(4).fill(0).map((item, index) => (
                  <div
                    className="dropdown__content--item-style-1"
                    key={index}
                    onClick={() =>
                      handleClick("endYear", 2020 + index, `${2020 + index}`)
                    }
                  >{`${2020 + index}`}</div>
                ))}
              </DropdownMultiple>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      {}

      <div className="paid-out">
        {transaction_type === "completed-transactions" ? 'Đã thanh toán': null}
        {transaction_type === "future-transactions" ? 'Thanh toán đang chờ xử lý': null}
        {transaction_type === "gross-earnings" ? 'Tổng thu nhập': null}
        {transaction_type !== "completed-transactions"  && transaction_type !== "future-transactions" && transaction_type !== "gross-earnings" ? 'Thanh toán': null}
         :{" "}
        <span className="paid-out-value">
          {fommatCurrency("vi-VN", "VND").format(data.totalMoney)}
        </span>
      </div>
      <div className="list-contract">
        {data.contracts.length > 0 && data.contracts.map((item: any, index: number) => (
          <div className="contract-item flex justify-between" key={item?.id}>
            <div className="contract-item__content">
              <div className="group flex">
                <div className="contract-item__date ">
                  Ngày {new Date(item.updated_at).getDate()} tháng{" "}
                  {new Date(item.updated_at).getMonth() + 1} năm{" "}
                  {new Date(item.updated_at).getFullYear()}
                </div>
                {item?.status === 1 ? (
                  <div className={`contract-item__status status success ml-5`}>
                    Đã xác nhận
                  </div>
                ) : (
                  ""
                )}
                {item?.status === 2 ? (
                  <div className={`contract-item__status status pending ml-5`}>
                    Chờ xác nhận
                  </div>
                ) : (
                  ""
                )}
                {item?.status === 3 ? (
                  <div className={`contract-item__status status danger ml-5`}>
                    Đã hủy
                  </div>
                ) : (
                  ""
                )}
                {item?.status === 4 ? (
                  <div className={`contract-item__status status pending ml-5`}>
                    Chờ thanh toán
                  </div>
                ) : (
                  ""
                )}
                {item?.status === 5 ? (
                  <div className={`contract-item__status status primary ml-5`}>
                    Đã trả phòng
                  </div>
                ) : (
                  ""
                )}
              </div>

              <div className="contract-item__info mt-5">
                {item.user_booking}, Ngày {new Date(item.checkin).getDate()}{" "}
                tháng {new Date(item.checkin).getMonth() + 1} - Ngày{" "}
                {new Date(item.checkout).getDate()} tháng{" "}
                {new Date(item.checkout).getMonth() + 1},{" "}
                {new Date(item.checkout).getFullYear()}
              </div>
              <div className="contract-item__home">{item.title}</div>
            </div>
            <div className="contract-item__total-money">
              {item.status_payment === 2 ?  fommatCurrency("vi-VN", "VND").format(item.total_money / 2) : fommatCurrency("vi-VN", "VND").format(item.total_money)}
            </div>
          </div>
        ))}
      </div>
    </TransactionStyles>
  );
};

export default Transaction;
