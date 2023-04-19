import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const createContractAsync = createAsyncThunk(
  "contract/createContractAsync",
  async (data: any) => {
    try {
      const res: any = await axios.post(
        `${process.env.REACT_APP_URL}/api/contracts`,
        data,
        {
          headers: {
            authorization: localStorage.getItem("token"),
          },
        }
      );
      return res.data;
    } catch (error: any) {
      return error.response.data;
    }
  }
);

const findContractByIdAsync = createAsyncThunk(
  "contract/findContractByIdAsync",
  async (contract_id: string) => {
    const res = await axios.get(
      `${process.env.REACT_APP_URL}/api/contracts/${contract_id}`,
      {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      }
    );
    return res.data;
  }
);

const updateContractAsync = createAsyncThunk(
  "contract/updateContractAsync",
  async (data: any) => {
    try {
      const { contract_id, ...newData } = data;
      const res: any = await axios.put(
        `${process.env.REACT_APP_URL}/api/contracts/${contract_id}`,
        newData,
        {
          headers: {
            authorization: localStorage.getItem("token"),
          },
        }
      );
      return res.data;
    } catch (error: any) {
      return error.response.data;
    }
  }
);

const getContractByHostAsync = createAsyncThunk(
  "contract/getContractByHostAsync",
  async () => {
    try {
      const res: any = await axios.get(
        `${process.env.REACT_APP_URL}/api/contracts/host`,
        {
          headers: {
            authorization: localStorage.getItem("token"),
          },
        }
      );
      return res.data;
    } catch (error: any) {
      return error.response.data;
    }
  }
);

const getContractByGuestAsync = createAsyncThunk(
  "contract/getContractByHostAsync",
  async () => {
    try {
      const res: any = await axios.get(
        `${process.env.REACT_APP_URL}/api/contracts/guest`,
        {
          headers: {
            authorization: localStorage.getItem("token"),
          },
        }
      );
      return res.data;
    } catch (error: any) {
      return error.response.data;
    }
  }
);

export {
  createContractAsync,
  findContractByIdAsync,
  updateContractAsync,
  getContractByHostAsync,
  getContractByGuestAsync,
};
