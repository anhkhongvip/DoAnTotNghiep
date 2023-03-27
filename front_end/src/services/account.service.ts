import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getAccountAsync = createAsyncThunk(
  "account/getAccountAsync",
  async (token: string) => {
    try {
      const res: any = await axios.get(
        `${process.env.REACT_APP_URL}/api/account`,
        {
          headers: {
            authorization: token,
          },
        }
      );
      return res.data;
    } catch (error: any) {
      return error.response.data;
    }
  }
);

const updateAccountAsync = createAsyncThunk(
  "account/updateAccountAsync",
  async (data: any) => {
    try {
      const { token, ...newData } = data;
      const res: any = await axios.put(
        `${process.env.REACT_APP_URL}/api/account`,
        newData,
        {
          headers: {
            authorization: token,
          },
        }
      );
      return res.data;
    } catch (error: any) {
      return error.response.data;
    }
  }
);

export { getAccountAsync, updateAccountAsync };
