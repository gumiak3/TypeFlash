import { configureStore } from "@reduxjs/toolkit";
import wordsStatesReducer from "./wordsStates/wordsStatesSlice";
import cursorReducer from "./cursor/cursorSlice";
export const store = configureStore({
    reducer: {
        wordsStates: wordsStatesReducer,
        cursor: cursorReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
