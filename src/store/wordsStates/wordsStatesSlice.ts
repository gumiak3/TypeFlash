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
                newState: "correct" | "incorrect" | "";
            }>
        ) => {
            state.value[action.payload.wordId][action.payload.letterId] =
                action.payload.newState;
        },
        setValue: (state, action: PayloadAction<string[][]>) => {
            state.value = action.payload;
        },
        remove: (state, action: PayloadAction<number>) => {
            state.value = state.value.filter(
                (state, index) => index !== action.payload
            );
        },
        setStatesForWholeWord: (
            state,
            action: PayloadAction<{
                wordId: number;
                startRange: number;
                newState: "correct" | "incorrect" | "";
            }>
        ) => {
            for (
                let i = action.payload.startRange;
                i < state.value[action.payload.wordId].length;
                i++
            ) {
                state.value[action.payload.wordId][i] = action.payload.newState;
            }
        },
    },
});

export const { remove, setState, setValue, setStatesForWholeWord } =
    wordsStatesSlice.actions;

export default wordsStatesSlice.reducer;
