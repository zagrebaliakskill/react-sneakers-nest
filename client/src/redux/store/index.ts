import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "../reducers/userReducer";
import { storeSlice } from "../reducers/storeReducer";
import { useDispatch } from "react-redux";


export const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        store: storeSlice.reducer
    }
})

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch