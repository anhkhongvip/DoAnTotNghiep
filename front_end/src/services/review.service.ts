import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const updateReviewAsync = createAsyncThunk(
  "review/updateReviewAsync",
  async (data: any) => {
    const { review_id, ...restData } = data;
    console.log(data);

    const res = await axios.put(
      `${process.env.REACT_APP_URL}/api/reviews/${review_id}`,
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

const getReviewAsync = createAsyncThunk(
  "review/getReviewAsync",
  async (data: any) => {
    const { home_id } = data;
    const res = await axios.get(
      `${process.env.REACT_APP_URL}/api/reviews?home_id=${home_id}`
    );
    return res.data;
  }
);

export { updateReviewAsync, getReviewAsync };
