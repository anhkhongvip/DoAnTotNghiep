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

const findContractsAsync = createAsyncThunk(
  "contract/findContractsAsync",
  async (data: any) => {
    let query: string = "";
    for (const element in data) {
      if (element && query) {
        query += `&${element}=${data[element]}`;
      } else {
        query += `${element}=${data[element]}`;
      }
    }
  
    const res = await axios.get(
      `${process.env.REACT_APP_URL}/api/contracts/find-contract?${query}`,
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
  async (data: any) => {
    try {
      const res: any = await axios.get(
        `${process.env.REACT_APP_URL}/api/contracts/host?status=${data.status}`,
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
  "contract/getContractByGuestAsync",
  async (data: any) => {
    try {
      const res: any = await axios.get(
        `${process.env.REACT_APP_URL}/api/contracts/guest?status=${data.status}`,
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
  findContractsAsync,
  updateContractAsync,
  getContractByHostAsync,
  getContractByGuestAsync,
};
