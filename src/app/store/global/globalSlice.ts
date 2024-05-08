import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface GlobalState {
  isReseller: boolean;
}

const initialState: GlobalState = {
  isReseller: false,
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setReseller: (state, action: PayloadAction<boolean>) => {
      state.isReseller = action.payload;
    },
  },
});

export const { setReseller } = globalSlice.actions;
export default globalSlice.reducer;
