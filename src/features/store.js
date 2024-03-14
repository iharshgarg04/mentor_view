import { configureStore } from "@reduxjs/toolkit";
import studentReducer from "./student";
import refreshSidebar from "./refreshSlice";

export const store = configureStore({
    reducer:{
        studentKey:studentReducer,
        refreshKey:refreshSidebar,
    }
})