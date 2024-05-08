import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../store/cart/cartSlice";
import productReducer from "../store/product/productSlice";
import globalReducer from "../store/global/globalSlice";

export const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
    global: globalReducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
