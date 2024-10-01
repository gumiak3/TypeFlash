import { configureStore } from '@reduxjs/toolkit';
import wordsStatesReducer from './wordsStates/wordsStatesSlice';
import cursorReducer from './cursor/cursorSlice';
import correctWordCounterReducer from './correctWordCounter/correctWordCounterSlice';
export const store = configureStore({
  reducer: {
    wordsStates: wordsStatesReducer,
    cursor: cursorReducer,
    correctWordCounter: correctWordCounterReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
