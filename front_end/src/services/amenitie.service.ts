import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getServiceAsync = createAsyncThunk(
  "amenitie/getServiceAsync",
  async () => {
    try {
      const res: any = await axios.get(
        `${process.env.REACT_APP_URL}/api/services`);
      return res.data;
    } catch (error: any) {
      return error.response.data;
    }
  }
);


export { getServiceAsync };