import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface CounterState {
    value: number;
}

const initialState = { value: 0 } satisfies CounterState as CounterState;

const correctWordCounterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        incrementCorrectWordCounter(state) {
            state.value++;
        },
        resetCorrectWordCounter(state) {
            state.value = 0;
        },
    },
});

export const { incrementCorrectWordCounter, resetCorrectWordCounter } =
    correctWordCounterSlice.actions;
export default correctWordCounterSlice.reducer;
