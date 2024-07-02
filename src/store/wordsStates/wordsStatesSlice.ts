import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface WordState {
    value: string[][];
}

const initialState: WordState = {
    value: [[""]],
};

export const wordsStatesSlice = createSlice({
    name: "wordsStates",
    initialState,
    reducers: {
        setState: (
            state,
            action: PayloadAction<{
                wordId: number;
                letterId: number;
                newState: "correct" | "incorrect";
            }>
        ) => {
            state.value[action.payload.wordId][action.payload.letterId] =
                action.payload.newState;
        },
        setValue: (state, action: PayloadAction<string[][]>) => {
            state.value = action.payload;
        },
        setStatesForWholeWord: (
            state,
            action: PayloadAction<{
                wordId: number;
                newState: "correct" | "incorrect";
            }>
        ) => {
            for (let i = 0; i < state.value.length; i++) {
                state.value[action.payload.wordId][i] = action.payload.newState;
            }
        },
    },
});

export const { setState, setValue } = wordsStatesSlice.actions;

export default wordsStatesSlice.reducer;
