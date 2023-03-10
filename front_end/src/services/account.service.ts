import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getAccountAsync = createAsyncThunk(
  "user/getUserAsync",
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

export { getAccountAsync };
