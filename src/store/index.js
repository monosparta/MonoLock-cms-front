import { configureStore } from "@reduxjs/toolkit";

import adminReducer from "../redux/adminSlice"
import userReducer from "../redux/userSlice";
import lockReducer from "../redux/lockSlice";
import offlineSlice from "../redux/offlineSlice";
import { userApi } from "../redux/userSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    lock: lockReducer,
    admin: adminReducer,
    offline: offlineSlice,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddlewawre) => getDefaultMiddlewawre().concat(userApi.middleware)

});

export default store;
