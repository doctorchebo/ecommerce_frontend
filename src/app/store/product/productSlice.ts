import { Product } from "@/app/types/product";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface ProductState {
  products: Product[];
  product: Product | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  product: null,
  loading: false,
  error: null,
};

export const productSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    addProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },

    setProduct: (state, action: PayloadAction<Product>) => {
      state.product = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addProducts, setLoading, setError, setProduct } =
  productSlice.actions;

export default productSlice.reducer;
