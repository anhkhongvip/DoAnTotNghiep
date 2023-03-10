import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface ILogin {
  email: string;
  password: string;
}

interface IRegister {
  email: string;
  username: string;
  password: string;
}

const loginAsync = createAsyncThunk("auth/loginAsync", async (data: ILogin) => {
  try {
    const res: any = await axios.post(
      `${process.env.REACT_APP_URL}/api/auth/login`,
      data
    );
    return res.data;
  } catch (error: any) {
    return error.response.data;
  }
});

const registerAsync = createAsyncThunk(
  "auth/registerAsync",
  async (data: IRegister) => {
    const res = await axios.post(
      `${process.env.REACT_APP_URL}/api/auth/register`,
      data
    );
    return res;
  }
);

export { loginAsync, registerAsync };
