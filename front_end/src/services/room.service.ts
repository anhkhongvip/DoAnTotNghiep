import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const createRoomAsync = createAsyncThunk(
  "auth/createRoomAsync",
  async (data: any) => {
    const res = await axios.post(
      `${process.env.REACT_APP_URL}/api/homes`,
      data,
      {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      }
    );
    return res.data;
  }
);

export { createRoomAsync };
