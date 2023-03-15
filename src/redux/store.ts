import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user-slice";
import filterReducer from "./filter-slice";

export default configureStore({
  reducer: {
    users: userReducer,
    filter: filterReducer,
  },
});
