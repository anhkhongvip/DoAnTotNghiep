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

const findRoomsAsync = createAsyncThunk(
  "room/findRoomsAsync",
  async (data: any) => {
    let query: string = "";
    for (const element in data) {
      if (query) {
        query += `&${element}=${data[element]}`;
      } else {
        query += `${element}=${data[element]}`;
      }
    }
    const res = await axios.get(
      `${process.env.REACT_APP_URL}/api/find-home?${query}`
    );
    return res.data;
  }
);

const findRoomByHostAsync = createAsyncThunk(
  "room/findRoomByHostAsync",
  async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_URL}/api/find-home-by-host`,
      {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      }
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
);

const findImageByHomeId = createAsyncThunk(
  "room/findImageByHomeIdAsync",
  async (room_id: string) => {
    const res = await axios.get(
      `${process.env.REACT_APP_URL}/api/find-image/${room_id}`
    );
    return res.data;
  }
);

const findHomeByQuery = createAsyncThunk(
  "room/findHomeByQueryAsync",
  async (query: string) => {
    const res = await axios.get(
      `${process.env.REACT_APP_URL}/api/search/${query}`
    );
    return res.data;
  }
);

const getAmountHomeByCategory = createAsyncThunk(
  "room/getAmountHomeByCategory",
  async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_URL}/api/amount-home-by-category`
    );
    return res.data;
  }
);

export {
  createRoomAsync,
  updateRoomAsync,
  findRoomByIdAsync,
  findServiceByHomeId,
  findImageByHomeId,
  findRoomByHostAsync,
  findRoomsAsync,
  findHomeByQuery,
  getAmountHomeByCategory,
};
