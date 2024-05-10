import { Pagination } from "@/app/types/pagination";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface GlobalState {
  isReseller: boolean;
  pagination: Pagination;
}

const initialPagination: Pagination = {
  page: 1,
};

const initialState: GlobalState = {
  isReseller: false,
  pagination: initialPagination,
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setReseller: (state, action: PayloadAction<boolean>) => {
      state.isReseller = action.payload;
    },
    setPagination: (state, action: PayloadAction<Pagination>) => {
      state.pagination.count = action.payload.count;
      state.pagination.next = action.payload.next;
      state.pagination.previous = action.payload.previous;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.pagination.page = action.payload;
    },
    increasePage: (state) => {
      state.pagination.page = state.pagination.page + 1;
    },
    decreasePage: (state) => {
      state.pagination.page = state.pagination.page - 1;
    },
  },
});

export const {
  setReseller,
  setPagination,
  setPage,
  increasePage,
  decreasePage,
} = globalSlice.actions;
export default globalSlice.reducer;
