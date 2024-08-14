import { createSlice } from "@reduxjs/toolkit";

const initialState = true

const soundSlice = createSlice({
  name: "sound",
  initialState,
  reducers: {
    togleSounds: (state) => {
      return state = !state      
    },
  },
});

export const soundReducer = soundSlice.reducer;

export const { togleSounds } = soundSlice.actions;
