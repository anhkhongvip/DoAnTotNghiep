import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const getHomeDayByHomeIdAsync = createAsyncThunk(
  "category/getHomeDayByHomeIdAsync",
  async (home_id: string) => {
    try {
      const res: any = await axios.get(
        `${process.env.REACT_APP_URL}/api/home-days/${home_id}`
      );
      return res.data;
    } catch (error: any) {
      return error.response.data;
    }
  }
);

export { getHomeDayByHomeIdAsync };