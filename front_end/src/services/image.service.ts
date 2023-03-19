import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const uploadImageAsync = createAsyncThunk(
  "image/uploadImageAsync",
  async (data: any) => {
    try {
      const res: any = await axios.post(
        `${process.env.REACT_APP_URL}/api/upload`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return res.data;
    } catch (error: any) {
      return error.response.data;
    }
  }
);

const deleteImageAsync = createAsyncThunk(
    "image/deleteImageAsync",
    async (public_id: string) => {
      try {
        const res: any = await axios.delete(
          `${process.env.REACT_APP_URL}/api/upload/${public_id}`,
        );
        return res.data;
      } catch (error: any) {
        return error.response.data;
      }
    }
  );

export { uploadImageAsync, deleteImageAsync };
