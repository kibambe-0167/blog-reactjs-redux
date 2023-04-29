import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./slices/tasks";

export default configureStore({
  reducer: {
    tasks: taskReducer,
  },
});
