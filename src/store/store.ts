import { configureStore } from "@reduxjs/toolkit";
import wordsStatesReducer from "./wordsStates/wordsStatesSlice";

export const store = configureStore({
    reducer: {
        wordsStates: wordsStatesReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
