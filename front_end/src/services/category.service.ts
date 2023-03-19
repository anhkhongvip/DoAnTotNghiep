import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const getCategoriesAsync = createAsyncThunk(
  "category/getCategoriesAsync",
  async () => {
    try {
      const res: any = await axios.get(
        `${process.env.REACT_APP_URL}/api/categories`
      );
      return res.data;
    } catch (error: any) {
      return error.response.data;
    }
  }
);

export { getCategoriesAsync };
