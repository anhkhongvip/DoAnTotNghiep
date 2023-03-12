import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useFormik, Form, Field, ErrorMessage, Formik, useField } from "formik";
import { Input, InputIcon } from "../../components/input";
import HomeHeaderRouter from "./HomeHeaderRouter";
import ReactQuill, { Quill } from "react-quill";
import { useAuthentication } from "../../contexts/authContext";
import { AuthContextType } from "../../@types/auth";
import { Radio } from "../../components/radio";
import { ModalContextType } from "../../@types/modal";
import { useModal } from "../../contexts/modalContext";
import { Modal } from "../../components/modal";
import ImageUploadAvatar from "../../components/image/ImageUploadAvatar";
import { Button } from "../../components/button";
import {
  deleteImageAsync,
  uploadImageAsync,
} from "../../services/image.service";
import { useAppDispatch } from "../../app/hooks";
const HomeProfileStyles = styled.div`
  .profile {
    display: flex;

    &-small {
      width: 30%;
      padding: 2rem 2rem;
      text-align: center;
      #upload-avatar {
        visibility: hidden;
        opacity: 0;
      }
      &__avatar {
        position: relative;
        display: inline-block;
      }
      &__image {
        width: 17rem;
        height: 17rem;
        border-radius: 50%;
        overflow: hidden;
      }
      &__icon {
        background-color: #f4f5f6;
        /* background-color: red; */
        cursor: pointer;
        width: 4rem;
        height: 4rem;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        position: absolute;
        right: 0;
        bottom: 0;
      }
      &__name {
        margin: 2rem 0;
        font-size: 2.5rem;
        font-weight: 600;
      }
    }
    &-big {
      width: 70%;
      &__title {
        font-size: 4rem;
        font-weight: 600;
      }
    }

    &-form {
      text-align: right;
      .btn-edit-profile {
        display: inline-block;
        font-size: 1.4rem;
        margin-top: 2rem;
        margin-bottom: 2rem;
        padding: 0.8rem 1.6rem;
        border-radius: 1.6rem;
        border: 1px solid #3b3e44;
        font-weight: 600;
        color: #3b3e44;
        transition: 0.4s;
        &:hover {
          color: black;
          border-color: black;
        }
      }
      .btn-update-profile {
        padding: 1.4rem 2rem;
        background-color: #3b71fe;
        border-radius: 2rem;
        color: white;
        font-weight: 600;
      }

      .btn-cancel {
        margin-left: 2rem;
        font-weight: 600;
        color: #84878b;
      }
    }
  }
`;
const HomeProfile = () => {
  const modules = useMemo(
    () => ({
      toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike"],
        ["blockquote"],
        [{ header: 1 }, { header: 2 }], // custom button values
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "image"],
      ],
    }),
    []
  );

  const [content, setContent] = useState("");
  const { account } = useAuthentication() as AuthContextType;
  const initialValues = {
    username: account.username,
    gender: "",
    email: "",
    phone_number: "",
    address: "",
    description: "",
  };
  const { modalOpen, setModalOpen } = useModal() as ModalContextType;
  const openModal = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    const target = event.target as HTMLButtonElement;
    const {
      dataset: { modal },
    } = target;
    if (modal) {
      setModalOpen(modal);
    }
  };
  const closeModal = (event: React.MouseEvent<Element, MouseEvent>): void => {
    event.stopPropagation();
    setModalOpen("");
    setImgUrl("");
    setPublicId("");
    (document.getElementById("avatar") as HTMLInputElement).value = "";
  };

  const [imageUrl, setImgUrl] = useState<string>("");
  const [publicId, setPublicId] = useState<string>("");
  //const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const uploadImage = async (event: React.ChangeEvent) => {
    try {
      let files = (event.target as HTMLInputElement).files!;
      const formData = new FormData();
      formData.append("image", files[0]);
      let {
        payload: { data },
      }: any = await dispatch(uploadImageAsync(formData));
      if (data) {
        setImgUrl(data.secure_url);
        setPublicId(data.public_id);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const deleteImage = async () => {
    try {
      let {
        payload: { data },
      }: any = await dispatch(deleteImageAsync(publicId));
      if (data) {
        setImgUrl("");
        setPublicId("");
        (document.getElementById("avatar") as HTMLInputElement).value = "";
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <HomeProfileStyles>
      <div className="container">
        <HomeHeaderRouter>
          <Link to="/">Trang chủ {">"}</Link> <span>Trang cá nhân</span>
        </HomeHeaderRouter>
        <div className="profile">
          <div className="profile-small">
            <div className="profile-small__avatar">
              <div className="profile-small__image">
                <img src={account.avatar} alt="profile-src-img" />
              </div>
              <button
                className="profile-small__icon"
                type="button"
                onClick={openModal}
                data-modal="modal-upload"
              >
                <i className="fa-solid fa-camera" data-modal="modal-upload"></i>
              </button>
            </div>
            <h2 className="profile-small__name">{account.username}</h2>
          </div>
          <div className="profile-big">
            <h2 className="profile-big__title">Trang cá nhân</h2>
            <Formik
              initialValues={initialValues}
              onSubmit={(values, actions) => {
                console.log({ values, actions });
              }}
            >
              <Form className="profile-form">
                {/* <Input
                  type="file"
                  name="avatar"
                  id="upload-avatar"
                  className="hidden-input"
                /> */}
                <button className="btn btn-edit-profile">
                  <span className="flex items-center">
                    <svg
                      width="10"
                      height="11"
                      viewBox="0 0 10 11"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-3"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M8.34788 3.4453L8.93459 2.8586L7.6414 1.56543L7.05469 2.15213L8.34788 3.4453ZM7.60716 4.18585L6.31397 2.89268L1.47635 7.73022L1.17871 9.32103L2.76954 9.02339L7.60716 4.18585ZM9.70627 2.14944C10.0979 2.54108 10.0979 3.17606 9.70627 3.56769L3.39565 9.87821C3.321 9.95287 3.22551 10.0032 3.12173 10.0226L0.620082 10.4907C0.258333 10.5584 -0.0585009 10.2415 0.00918114 9.87978L0.477232 7.37817C0.496649 7.27439 0.546989 7.1789 0.621646 7.10425L6.93226 0.79373C7.3239 0.40209 7.95889 0.40209 8.35053 0.79373L9.70627 2.14944ZM9.47887 10.5H5.25792C4.56311 10.5 4.56311 9.44738 5.25792 9.44738H9.47887C10.1737 9.44738 10.1737 10.5 9.47887 10.5Z"
                        fill="#3B3E44"
                      />
                    </svg>
                    Sửa thông tin
                  </span>
                </button>
                <div className="grid grid-cols-2">
                  <div className="form-group">
                    <InputIcon
                      type="text"
                      name="username"
                      id="username"
                      className="form-control"
                      placeholder="Nhập tên của bạn"
                      icon_position="before"
                    >
                      <i className="fa-light fa-user text-gray-400"></i>
                    </InputIcon>
                  </div>
                  <div className="form-group ml-3">
                    <InputIcon
                      type="text"
                      name="phone_number"
                      id="phone_number"
                      className="form-control"
                      placeholder="Nhập số điện thoại của bạn"
                      icon_position="before"
                    >
                      <i className="fa-light fa-phone text-gray-400"></i>
                    </InputIcon>
                  </div>
                  <div className="form-group" style={{ display: "flex" }}>
                    <div className="flex items-center">
                      <div className="title-gender ml-5">Giới tính : </div>
                      <div className="ml-20">
                        <Radio id="gender-male" name="gender" value="1">
                          Nam
                        </Radio>
                      </div>
                      <div className="ml-40">
                        <Radio id="gender-female" name="gender" value="2">
                          Nữ
                        </Radio>
                      </div>
                    </div>
                  </div>
                  <div className="form-group ml-3">
                    <InputIcon
                      type="text"
                      name="email"
                      id="email"
                      className="form-control"
                      placeholder="Mời bạn nhập email"
                      icon_position="before"
                    >
                      <svg
                        width="20"
                        height="17"
                        viewBox="0 0 20 17"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M2.72729 0.198486H17.2726C18.7789 0.198486 19.9999 1.46454 19.9999 3.02629V3.42679C20 3.43669 20 3.44658 19.9999 3.45647V13.3949C19.9999 14.9567 18.7789 16.2227 17.2726 16.2227H2.72729C1.22108 16.2227 4.34265e-05 14.9567 4.34265e-05 13.3949V3.45085C-1.44492e-05 3.44471 -1.45017e-05 3.43856 4.34265e-05 3.4324V3.02629C4.34265e-05 1.46454 1.22108 0.198486 2.72729 0.198486ZM1.8184 5.25298V13.395C1.8184 13.9156 2.22541 14.3376 2.72749 14.3376H17.2728C17.7749 14.3376 18.1819 13.9156 18.1819 13.395V5.25275L11.564 10.0561C10.6249 10.7377 9.37507 10.7377 8.43602 10.0561L1.8184 5.25298ZM18.1792 2.95351L10.5213 8.51169C10.2083 8.73888 9.79169 8.73888 9.47867 8.51169L1.82106 2.95372C1.85683 2.46708 2.24898 2.08375 2.72749 2.08375H17.2728C17.7513 2.08375 18.1434 2.46696 18.1792 2.95351Z"
                          fill="#B5B5BE"
                        />
                      </svg>
                    </InputIcon>
                  </div>
                </div>
                <div className="form-group ">
                  <InputIcon
                    type="text"
                    name="address"
                    id="address"
                    className="form-control"
                    placeholder="Nhập địa chỉ của bạn"
                    icon_position="before"
                  >
                    <svg
                      width="20"
                      height="21"
                      viewBox="0 0 20 21"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        y="0.0817871"
                        width="20"
                        height="19.9761"
                        fill="#FAFAFB"
                      />
                      <path
                        d="M17.9981 6.08656L11.9981 0.832843C11.4481 0.341476 10.7361 0.0698242 9.99814 0.0698242C9.26021 0.0698242 8.54816 0.341476 7.99814 0.832843L1.99814 6.08656C1.68051 6.37029 1.42704 6.71836 1.25461 7.10758C1.08219 7.4968 0.994754 7.91825 0.998142 8.34386V17.0734C0.998142 17.8681 1.31421 18.6303 1.87682 19.1922C2.43943 19.7541 3.20249 20.0698 3.99814 20.0698H15.9981C16.7938 20.0698 17.5569 19.7541 18.1195 19.1922C18.6821 18.6303 18.9981 17.8681 18.9981 17.0734V8.33387C19.0001 7.90994 18.912 7.49042 18.7396 7.10302C18.5672 6.71563 18.3145 6.36917 17.9981 6.08656ZM11.9981 18.0722H7.99814V13.0782C7.99814 12.8133 8.1035 12.5592 8.29104 12.3719C8.47857 12.1846 8.73292 12.0794 8.99814 12.0794H10.9981C11.2634 12.0794 11.5177 12.1846 11.7052 12.3719C11.8928 12.5592 11.9981 12.8133 11.9981 13.0782V18.0722ZM16.9981 17.0734C16.9981 17.3383 16.8928 17.5924 16.7052 17.7797C16.5177 17.967 16.2634 18.0722 15.9981 18.0722H13.9981V13.0782C13.9981 12.2835 13.6821 11.5213 13.1195 10.9594C12.5569 10.3975 11.7938 10.0818 10.9981 10.0818H8.99814C8.20249 10.0818 7.43943 10.3975 6.87682 10.9594C6.31421 11.5213 5.99814 12.2835 5.99814 13.0782V18.0722H3.99814C3.73293 18.0722 3.47857 17.967 3.29104 17.7797C3.1035 17.5924 2.99814 17.3383 2.99814 17.0734V8.33387C2.99832 8.19205 3.02873 8.0519 3.08736 7.92274C3.14598 7.79358 3.23147 7.67836 3.33814 7.58476L9.33814 2.34104C9.52063 2.18091 9.75523 2.0926 9.99814 2.0926C10.241 2.0926 10.4757 2.18091 10.6581 2.34104L16.6581 7.58476C16.7648 7.67836 16.8503 7.79358 16.9089 7.92274C16.9675 8.0519 16.998 8.19205 16.9981 8.33387V17.0734Z"
                        fill="#B5B5BE"
                      />
                    </svg>
                  </InputIcon>
                </div>
                <div className="form-group">
                  <div className="w-full entry-content">
                    <ReactQuill
                      modules={modules}
                      theme="snow"
                      value={content}
                      placeholder="Giới thiệu về bản thân của bạn"
                      onChange={setContent}
                    />
                  </div>
                </div>
                <div className="btn-tool-form flex mt-5">
                  <button className="btn btn-update-profile" type="submit">
                    Lưu thông tin
                  </button>
                  <button className="btn btn-cancel">Hủy bỏ</button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
      <Modal
        closeFn={closeModal}
        toggle={modalOpen === "modal-upload"}
        title="Cập nhật ảnh đại diện"
      >
        <div className="modal-avatar">
          <ImageUploadAvatar
            image={imageUrl}
            imageOrigin={account.avatar}
            uploadImage={uploadImage}
            deleteImage={deleteImage}
          ></ImageUploadAvatar>
        </div>
        <div className="modal-tool flex justify-end">
          <Button
            type="button"
            className="btn btn__custom  btn__cancel mr-5"
            fontSize="1.6rem"
            height="3.6rem"
            color="#316bff"
          >
            Hủy
          </Button>
          <Button
            type="button"
            className="btn btn__custom btn__submit"
            fontSize="1.6rem"
            height="3.6rem"
            width="10.5rem"
          >
            Lưu
          </Button>
        </div>
      </Modal>
    </HomeProfileStyles>
  );
};

export default HomeProfile;
