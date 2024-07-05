import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Cursor {
    position: cursorPositionType;
    currentWord: {
        wordId: number;
        letterId: number;
    };
}
type cursorPositionType = {
    top: number;
    left: number;
};

const initialState: Cursor = {
    position: { top: 0, left: 0 },
    currentWord: {
        wordId: 0,
        letterId: 0,
    },
};

export const cursorSlice = createSlice({
    name: "cursor",
    initialState,
    reducers: {
        setPosition: (state, action: PayloadAction<cursorPositionType>) => {
            state.position = action.payload;
        },
        setCurrentWord: (
            state,
            action: PayloadAction<{
                wordId: number;
                letterId: number;
            }>
        ) => {
            state.currentWord = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setPosition, setCurrentWord } = cursorSlice.actions;

export default cursorSlice.reducer;
