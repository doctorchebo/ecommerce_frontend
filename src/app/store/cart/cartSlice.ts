import { CartItem } from "@/app/types/cart";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

interface CartState {
  cartItems: CartItem[];
  loading: boolean;
  error: string | undefined;
}

const initialState: CartState = {
  cartItems: [],
  loading: false,
  error: undefined,
};

export const cartSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increaseQuantity: (state, action: PayloadAction<CartItem>) => {
      const cartItem = action.payload;
      if (!state.cartItems.find((i) => i.id === cartItem.id)) {
        state.cartItems = [...state.cartItems, cartItem];
      } else {
        state.cartItems = state.cartItems.map((i) => {
          if (i.id === cartItem.id) {
            return {
              ...i,
              quantity: i.quantity + 1,
            };
          } else {
            return i;
          }
        });
      }
    },
    decreaseQuantity: (state, action: PayloadAction<CartItem>) => {
      const cartItem = action.payload;
      const existingItem = state.cartItems.find((i) => i.id === cartItem.id);
      if (existingItem !== undefined && existingItem.quantity > 1) {
        state.cartItems = state.cartItems.map((i) => {
          if (i.id === cartItem.id) {
            return {
              ...i,
              quantity: i.quantity - 1,
            };
          } else {
            return i;
          }
        });
      } else {
        state.cartItems = state.cartItems.filter((i) => i.id !== cartItem.id);
      }
    },
    removeCartItem: (state, action: PayloadAction<CartItem>) => {
      state.cartItems = state.cartItems.filter(
        (i) => i.id !== action.payload.id
      );
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const {
  increaseQuantity,
  decreaseQuantity,
  removeCartItem,
  setLoading,
  setError,
} = cartSlice.actions;

export default cartSlice.reducer;
