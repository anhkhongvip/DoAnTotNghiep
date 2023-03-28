import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const createRoomAsync = createAsyncThunk(
  "room/createRoomAsync",
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

const updateRoomAsync = createAsyncThunk(
  "room/updateRoomAsync",
  async (data: any) => {
    const { room_id, ...restData } = data;
    console.log(data);

    const res = await axios.put(
      `${process.env.REACT_APP_URL}/api/homes/${room_id}`,
      restData,
      {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      }
    );
    return res.data;
  }
);

const findRoomByIdAsync = createAsyncThunk(
  "room/findRoomByIdAsync",
  async (room_id: string) => {
    const res = await axios.get(
      `${process.env.REACT_APP_URL}/api/homes/${room_id}`
    );
    return res.data;
  }
);

const findServiceByHomeId = createAsyncThunk(
  "room/findServiceByIdAsync",
  async (room_id: string) => {
    const res = await axios.get(
      `${process.env.REACT_APP_URL}/api/find-service/${room_id}`
    );
    return res.data;
  }
)

const findImageByHomeId = createAsyncThunk(
  "room/findImageByHomeIdAsync",
  async (room_id: string) => {
    const res = await axios.get(
      `${process.env.REACT_APP_URL}/api/find-image/${room_id}`
    );
    return res.data;
  }
)

export { createRoomAsync, updateRoomAsync, findRoomByIdAsync, findServiceByHomeId, findImageByHomeId };
