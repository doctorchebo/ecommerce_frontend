import api from "@/app/api/api";
import axios from "axios";
import { AppDispatch } from "../store";
import { addProducts, setError, setLoading, setProduct } from "./productSlice";

const handleError = (error: unknown, dispatch: AppDispatch) => {
  if (axios.isAxiosError(error)) {
    dispatch(setError(error.message));
  }
};

export const getProducts = () => async (dispatch: AppDispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await api.get("products/");
    if (response.status === 200) {
      dispatch(addProducts(response.data));
    }
  } catch (error) {
    handleError(error, dispatch);
  } finally {
    dispatch(setLoading(false));
  }
};

export const getProduct = (id: string) => async (dispatch: AppDispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await api.get(`products/${id}/`);
    dispatch(setProduct(response.data));
  } catch (error) {
    handleError(error, dispatch);
  } finally {
    dispatch(setLoading(false));
  }
};
