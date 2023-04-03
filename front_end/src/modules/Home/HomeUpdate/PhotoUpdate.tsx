import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Swal from "sweetalert2";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  findImageByHomeId,
  findRoomByIdAsync,
  updateRoomAsync,
} from "../../../services/room.service";
import {
  deleteImageAsync,
  uploadImageAsync,
} from "../../../services/image.service";
import { selectImage } from "../../../features/image/imageSlice";
import { log } from "console";

const PhotoStyles = styled.div`
  .home-update {
    &__name {
      font-size: 3rem;
      font-weight: bold;
      margin-bottom: 3rem;
    }
    &__title {
      font-size: 2rem;
      font-weight: bold;
      margin-bottom: 1rem;
    }
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

  .photo {
    max-width: 70rem;
    margin-bottom: 12rem;
  }
  .image-banner {
    border: 1px dotted gray;
    width: 100%;
    &-content {
      padding: 8rem 0;
      &__title {
        margin-top: 1rem;
        font-weight: bold;
        font-size: 2rem;
      }
    }
  }
  .label-image-main {
    display: inline-block;
    margin-top: 1rem;
    font-weight: bold;
    cursor: pointer;
    text-decoration: underline;
  }

  .image-thumb {
    width: 70rem;
    height: 47rem;
    position: relative;
    &-header {
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      width: 100%;
      justify-content: space-between;
      align-items: center;
      padding: 2rem 2rem;
    }
    &-title {
      background-color: white;
      padding: 0.7rem 1.5rem;
      font-weight: bold;
      border-radius: 0.8rem;
      font-size: 1.4rem;
    }
  }

  .btn-delete {
    background-color: white;
    width: 4rem;
    height: 4rem;
    border-radius: 3.5rem;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    font-size: 1.4rem;
    transform: scale(0.96);
    transition: transform 0.2s ease;
    &:hover {
      transform: scale(1);
    }
  }

  .loading-skeleton {
    width: 70rem;
    height: 47rem;
    &-small {
      width: calc(100% / 2 - 2rem);
      margin-left: 2rem;
      height: 23rem;
      margin-bottom: 2rem;
    }
  }
  .list-images {
    margin-left: -2rem;
    margin-top: 2rem;
    display: flex;
    flex-wrap: wrap;
    .image-add,
    .image-item {
      width: calc(100% / 2 - 2rem);
      margin-left: 2rem;
      height: 23rem;
      margin-bottom: 2rem;
      position: relative;
    }
    .image-add {
      border: 1px dotted gray;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: gray;
      cursor: pointer;
      & i {
        font-size: 4rem;
        margin-bottom: 0.5rem;
      }
    }

    .btn-image-item {
      position: absolute;
      top: 1rem;
      right: 1rem;
    }

    .error-message-entered {
      display: flex;
      align-items: center;
      font-size: 1.4rem;
      color: #c13515;
      margin-top: 1rem;
    }
  }

  .btn-not-allow {
    background-color: #ddd !important;
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

interface Image {
  public_id: string | null;
  url: string | null;
}

const PhotoUpdate = () => {
  const [bannerThumb, setBannerThumb] = useState<Image>({
    public_id: null,
    url: null,
  });
  const { room_id } = useParams();
  const [check, setCheck] = useState<boolean>(false);
  const [imageList, setImageList] = useState<Array<Image>>([]);
  const [nameLoading, setNameLoading] = useState<string>("");
  const [home, setHome] = useState<any>();
  const [data, setData] = useState<any>();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(findRoomByIdAsync(room_id!))
      .then((res) => {
        let { home } = res.payload.data;
        setHome(home);
        setBannerThumb({ public_id: home.public_id, url: home.image_main });
      })
      .catch((err) => {
        console.log(err);
      });
    dispatch(findImageByHomeId(room_id!))
      .then((res) => {
        let { images } = res.payload.data;
        let cloneArray: Array<Image> = [];
        images.forEach((item: any) => {
          cloneArray = [
            ...cloneArray,
            { url: item.url, public_id: item.public_id },
          ];
        });
        setImageList(cloneArray);
      })
      .catch((err) => {
        console.log(err);
      });
    setCheck(false);
  }, [dispatch]);
  const imageSelector = useAppSelector(selectImage);

  useEffect(() => {
    if (bannerThumb.url && imageList.length === 3) {
      setCheck(true);
    } else {
      setCheck(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bannerThumb, imageList.length]);

  const uploadImage = async (event: React.ChangeEvent, nameUpdate: string) => {
    try {
      let files = (event.target as HTMLInputElement).files!;
      const formData = new FormData();
      formData.append("image", files[0]);
      setNameLoading(nameUpdate);
      let {
        payload: { data },
      }: any = await dispatch(uploadImageAsync(formData));
      setNameLoading("");
      if (data) {
        if (nameUpdate === "image-main") {
          setBannerThumb({
            ...bannerThumb,
            url: data.secure_url,
            public_id: data.public_id,
          });
        } else {
          setImageList([
            ...imageList,
            { url: data.secure_url, public_id: data.public_id },
          ]);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteImage = (publicId: string, nameUpdate?: string) => {
    Swal.fire({
      title: "Bạn muốn xóa ảnh này?",
      text: "Sau khi xóa ảnh, bạn sẽ không thể khôi phục ảnh đó",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#222222",
      confirmButtonText: "Xóa ảnh",
      cancelButtonText: "Hủy",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          let {
            payload: { data },
          }: any = await dispatch(deleteImageAsync(publicId));
          if (data) {
            if (nameUpdate === "image-main") {
              setBannerThumb({
                url: null,
                public_id: null,
              });
            } else {
              const imageListClone: Array<Image> = [...imageList];
              let index = imageListClone.findIndex(
                (item) => item.public_id === publicId
              );
              imageListClone.splice(index, 1);
              setImageList(imageListClone);
            }
          }
        } catch (err) {
          console.log(err);
        }
      }
    });
  };

  const handleSave = async () => {
    try {
      let res = await dispatch(
        updateRoomAsync({ bannerThumb, imageList, room_id })
      );
      let { status } = res.payload.data;
      if (status) {
        Swal.fire({
          position: "center",
          icon: status,
          title: 'Cập nhật ảnh phòng/nhà thành công',
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
    <PhotoStyles>
      <div className="container-md photo">
        <div className="home-update">
          <h2 className="home-update__title">
            Thay đổi ảnh nhà/phòng cho thuê
          </h2>
          <h3 className="home-update__name">{home?.title}</h3>
        </div>
        <div className="content">
          {imageSelector.loading && nameLoading === "image-main" ? (
            <div className="loading-skeleton skeleton"></div>
          ) : !bannerThumb.url ? (
            <div className="image-banner">
              <input
                type="file"
                id="image-main"
                name="image-main"
                className="hidden-input"
                onChange={(e) => uploadImage(e, "image-main")}
              />
              <div className="image-banner-content text-center">
                <svg
                  viewBox="0 0 64 64"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  role="presentation"
                  focusable="false"
                  width={64}
                  style={{ display: "inline-block" }}
                >
                  <path
                    d="M41.636 8.404l1.017 7.237 17.579 4.71a5 5 0 0 1 3.587 5.914l-.051.21-6.73 25.114A5.002 5.002 0 0 1 53 55.233V56a5 5 0 0 1-4.783 4.995L48 61H16a5 5 0 0 1-4.995-4.783L11 56V44.013l-1.69.239a5 5 0 0 1-5.612-4.042l-.034-.214L.045 14.25a5 5 0 0 1 4.041-5.612l.215-.035 31.688-4.454a5 5 0 0 1 5.647 4.256zm-20.49 39.373l-.14.131L13 55.914V56a3 3 0 0 0 2.824 2.995L16 59h21.42L25.149 47.812a3 3 0 0 0-4.004-.035zm16.501-9.903l-.139.136-9.417 9.778L40.387 59H48a3 3 0 0 0 2.995-2.824L51 56v-9.561l-9.3-8.556a3 3 0 0 0-4.053-.009zM53 34.614V53.19a3.003 3.003 0 0 0 2.054-1.944l.052-.174 2.475-9.235L53 34.614zM48 27H31.991c-.283.031-.571.032-.862 0H16a3 3 0 0 0-2.995 2.824L13 30v23.084l6.592-6.59a5 5 0 0 1 6.722-.318l.182.159.117.105 9.455-9.817a5 5 0 0 1 6.802-.374l.184.162L51 43.721V30a3 3 0 0 0-2.824-2.995L48 27zm-37 5.548l-5.363 7.118.007.052a3 3 0 0 0 3.388 2.553L11 41.994v-9.446zM25.18 15.954l-.05.169-2.38 8.876h5.336a4 4 0 1 1 6.955 0L48 25.001a5 5 0 0 1 4.995 4.783L53 30v.88l5.284 8.331 3.552-13.253a3 3 0 0 0-1.953-3.624l-.169-.05L28.804 14a3 3 0 0 0-3.623 1.953zM21 31a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm0 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM36.443 6.11l-.175.019-31.69 4.453a3 3 0 0 0-2.572 3.214l.02.175 3.217 22.894 5.833-7.74a5.002 5.002 0 0 1 4.707-4.12L16 25h4.68l2.519-9.395a5 5 0 0 1 5.913-3.587l.21.051 11.232 3.01-.898-6.397a3 3 0 0 0-3.213-2.573zm-6.811 16.395a2 2 0 0 0 1.64 2.496h.593a2 2 0 1 0-2.233-2.496zM10 13a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm0 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"
                    fill="#222"
                  ></path>
                </svg>
                <h2 className="image-banner-content__title">
                  Chọn ảnh bìa của bạn
                </h2>
                <label htmlFor="image-main" className="label-image-main">
                  Tải lên từ thiết bị của bạn
                </label>
              </div>
            </div>
          ) : (
            <div className="image-thumb">
              <img src={bannerThumb.url!} alt="" />
              <div className="image-thumb-header">
                <h2 className="image-thumb-title">Ảnh bìa</h2>
                <button
                  className="btn btn-delete"
                  onClick={() =>
                    deleteImage(bannerThumb.public_id!, "image-main")
                  }
                >
                  <i className="fa-regular fa-trash-can"></i>
                </button>
              </div>
            </div>
          )}
          <div className="list-images">
            {imageList.map((item, index) => (
              <div className="image-item" key={index}>
                <img src={item.url!} alt="img-item" />
                <button
                  className="btn btn-image-item btn-delete"
                  onClick={() => deleteImage(item.public_id!, "image")}
                >
                  <i className="fa-regular fa-trash-can"></i>
                </button>
              </div>
            ))}
            {imageSelector.loading && nameLoading === "image" ? (
              <div className="loading-skeleton-small skeleton"></div>
            ) : (
              imageList.length < 3 && (
                <label htmlFor="image-add" className="image-add">
                  <input
                    type="file"
                    id="image-add"
                    name="image"
                    className="hidden-input"
                    onChange={(e) => uploadImage(e, "image")}
                  />
                  <i className="fa-light fa-plus"></i>
                  <h3 className="image-add-title">Thêm ảnh</h3>
                </label>
              )
            )}
          </div>
          <div className="homeUpdate--footer flex justify-between">
            <button
              className="btn-close"
              onClick={() => navigate(`/manage-your-space/${room_id}/details`)}
            >
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
      </div>
    </PhotoStyles>
  );
};

export default PhotoUpdate;
