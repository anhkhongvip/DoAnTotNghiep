import React from "react";
import styled from "styled-components";
import { LoadingSpinner } from "../loading";

const ImageUploadAvatarStyles = styled.div`
  .label-upload,
  .image-avatar {
    width: 30rem;
    height: 30rem;
  }
  .label-upload {
    position: relative;
    z-index: 2;
    &:hover .image-btn {
      opacity: 1;
      visibility: visible;
    }
  }
  .image {
    &-avatar {
      position: relative;
      z-index: 1;
      &:after {
        content: "";
        position: absolute;
        inset: 0;
      }
    }
    &-mask {
      position: absolute;
      z-index: 2;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      -webkit-mask-image: -webkit-radial-gradient(center, white, black);
    }
    &-layer {
      position: absolute;
      inset: 0;
      z-index: 1;
      &::after {
        content: "";
        inset: 0;
        width: 100%;
        height: 100%;
        background-color: #00000078;
        position: absolute;
      }
    }

    &-btn {
      position: absolute;
      z-index: 3;
      top: 50%;
      left: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      transform: translate(-50%, -50%);
      opacity: 0;
      visibility: hidden;
      &.btn-delete-image {
        border-radius: 50%;
        color: #f04344;
        width: 6.4rem;
        height: 6.4rem;
        background-color: #ffff;
      }
    }
  }
`;

type Props = {
  image?: string;
  imageOrigin?: string;
  isLoading?: boolean;
  classname?: string;
  deleteImage?: () => void;
  uploadImage?: (event: React.ChangeEvent) => void;
};

const ImageUploadAvatar = ({
  image,
  imageOrigin,
  classname,
  deleteImage = () => {},
  uploadImage = () => {},
}: Props) => {
  return (
    <ImageUploadAvatarStyles>
      <label htmlFor="avatar" className="label-upload cursor-pointer">
        <input
          type="file"
          id="avatar"
          name="avatar"
          className="hidden-input"
          onChange={uploadImage}
        />
        <div className="image-avatar">
          <div className="image-mask">
            <img src={image ? image : imageOrigin} alt="img-avatar" />
          </div>
          <div className="image-layer">
            <img src={image ? image : imageOrigin} alt="img-avatar" />
          </div>
        </div>
        {image ? (
          <button
            type="button"
            className="image-btn btn-delete-image transition-all"
            onClick={deleteImage}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        ) : (
          <div className="image-btn transition-all">
            <img
              src="/img-upload.png"
              alt="upload-img"
              className="max-w-[80px]"
            />
          </div>
        )}
      </label>
    </ImageUploadAvatarStyles>
  );
};

export default ImageUploadAvatar;
