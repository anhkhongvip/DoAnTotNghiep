import React, { useState, ChangeEvent, useEffect } from "react";
import styled from "styled-components";
import Dropdown from "../../../components/dropdown/Dropdown";
import { DropdownSelect } from "../../../components/dropdown";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { getCategoriesAsync } from "../../../services/category.service";
import { updateRoomAsync } from "../../../services/room.service";
import Swal from "sweetalert2";
import { selectRoom, setRoom } from "../../../features/room/roomSlice";
import { useParams } from "react-router-dom";

const StructureStyles = styled.div`
  border: 1px solid #8080804f;
  border-radius: 0.8rem;
  margin-bottom: 2rem;

  .homeUpdate {
    &__structure {
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
  .input {
    &-wrapper {
      width: 100%;
      border: 2px solid gray;
      border-radius: 0.8rem;
      margin-bottom: 0.5rem;
      padding: 1.8rem 1.2rem;
      transition: border 0.2s ease;
    }
    &-data {
      width: 100%;
    }
  }
  .content-length {
    font-size: 1.4rem;
    font-weight: 700;
    color: gray;
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

  .focus-visible {
    border-color: black;
  }
  .not-allow {
    border-color: #c13515 !important;
  }

  .btn-not-allow {
    background-color: #ddd !important;
  }

  .error-message-entered {
    display: flex;
    align-items: center;
    font-size: 1.4rem;
    color: #c13515;
    margin-top: 1rem;
  }
  .dropdown__item {
    padding: 1rem 2rem;
    transition: 0.2s all linear;
    border-radius: 0.8rem;
    cursor: pointer;
    &:hover {
      background-color: gray;
    }
  }
`;

type Props = {
  toogleUpdate: any;
  setToogleUpdate: (toogleUpdate: any) => void;
  categoryNameData: string;
  categoriesData: any;
};

const Structure = ({
  categoriesData,
  categoryNameData,
  setToogleUpdate,
  toogleUpdate,
}: Props) => {
  const [check, setCheck] = useState<boolean>(false);
  const [show, setShow] = useState(false);
  const { room_id } = useParams();
  const roomSelector = useAppSelector(selectRoom);
  const dispatch = useAppDispatch();
  const [categoryName, setCategoryName] = useState<string>("");
  const [category_id, setCategoryId] = useState<number>(0);
  const handleClose = () => {
    setToogleUpdate({ ...toogleUpdate, categoryToggle: false });
  };
  const handleClickSelect = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    const { dataset, textContent } = event.target as HTMLDivElement;
    const { value } = dataset;
    setCategoryName(textContent!);
    setCategoryId(Number(value!));
    setCheck(true);
    setShow(false);
  };
  const handleSave = async () => {
    try {
      let res = await dispatch(
        updateRoomAsync({ category_id, room_id })
      );
      let { status } = res.payload.data;
      if (status) {
        Swal.fire({
          position: "center",
          icon: status,
          title: "Cập nhật loại nhà/phòng thành công",
          showConfirmButton: false,
          timer: 1500,
        }).then((result) => {
          if (status === "success") {
            dispatch(setRoom({ ...roomSelector.room, category_id}));
            setToogleUpdate({ ...toogleUpdate, categoryToggle: false });
          }
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    setCheck(false);
    setCategoryName(categoryNameData);
  }, []);
  return (
    <StructureStyles>
      <div className="homeUpdate__structure--main">
        <div className="homeUpdate__info">
          <h2 className="homeUpdate__title">Loại chỗ ở</h2>
          <p className="homeUpdate__desc">
            Chọn một loại chỗ ở phù hợp nhất với nhà/phòng cho thuê của bạn để
            đặt ra kỳ vọng cho khách và giúp nhà/phòng cho thuê của bạn xuất
            hiện phù hợp với tiêu chí tìm kiếm.
          </p>

          <DropdownSelect
            labelHeader="Loại nhà/phòng"
            labelName={categoryName}
            show={show}
            setShow={setShow}
          >
            {categoriesData.map((item: any, index: number) => (
              <div
                key={item.id}
                className="dropdown__item"
                data-value={item.id}
                id={`category-${item.id}`}
                onClick={handleClickSelect}
              >
                {item.name}
              </div>
            ))}
          </DropdownSelect>
        </div>
        <button className="homeUpdate__close" onClick={handleClose}>
          <i className="fa-regular fa-x"></i>
        </button>
      </div>
      <div className="homeUpdate__structure--footer">
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
    </StructureStyles>
  );
};

export default Structure;
