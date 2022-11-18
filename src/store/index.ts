import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import {timeReducer} from "./reducers/timeReducer";

export const store = configureStore({
    reducer: {
        time: timeReducer,
    },
    middleware: [thunk]
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;