import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import imageReducer from "../features/image/imageSlice";
import accountReducer from "../features/account/accountSlice";
import logger from "redux-logger";
import roomReducer from "../features/room/roomSlice";
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    image: imageReducer,
    account: accountReducer,
    room: roomReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }).concat(logger),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
