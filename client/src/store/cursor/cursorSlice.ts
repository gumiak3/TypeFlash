import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

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
  getRightValue: boolean;
  line: number;
};
type setCursorPositionType = {
  top: number;
  left: number;
  getRightValue: boolean;
};

const initialState: Cursor = {
  position: { top: 0, left: 0, getRightValue: false, line: 0 },
  currentWord: {
    wordId: 0,
    letterId: 0
  }
};

export const cursorSlice = createSlice({
  name: 'cursor',
  initialState,
  reducers: {
    setPosition: (state, action: PayloadAction<setCursorPositionType>) => {
      state.position = { ...action.payload, line: state.position.line };
    },
    setLine: (state, action: PayloadAction<number>) => {
      state.position.line = action.payload;
    },
    nextLine: (state) => {
      state.position.line++;
    },
    previousLine: (state) => {
      state.position.line--;
    },
    setCurrentWord: (
      state,
      action: PayloadAction<{
        wordId: number;
        letterId: number;
      }>
    ) => {
      state.currentWord = action.payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const { setPosition, setCurrentWord, setLine, nextLine, previousLine } = cursorSlice.actions;

export default cursorSlice.reducer;
