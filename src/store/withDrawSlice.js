// withDrawSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentLayout: 'WithDrawBalance',
};

const withDrawSlice = createSlice({
  name: 'withDraw',
  initialState,
  reducers: {
    setLayout: (state, action) => {
      state.currentLayout = action.payload;
    },
  },
});

export const { setLayout } = withDrawSlice.actions;
export const layOutReducer = withDrawSlice.reducer;
