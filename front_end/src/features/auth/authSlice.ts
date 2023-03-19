import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
import { loginAsync, registerAsync } from "../../services/auth.service";

export interface AuthState {
  data: any;
}

const initialState: AuthState = {
  data: {},
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(registerAsync.fulfilled, (state, action) => {
      })
      .addCase(registerAsync.rejected, (state) => {
        
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
      })
      .addCase(loginAsync.rejected, (state) => {});
  },
});

export default authSlice.reducer;
