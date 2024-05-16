import api from "@/app/api/api";
import { Pagination } from "@/app/types/pagination";
import axios from "axios";
import { setPagination } from "../global/globalSlice";
import { AppDispatch } from "../store";
import { addProducts, setError, setLoading, setProduct } from "./productSlice";

const handleError = (error: unknown, dispatch: AppDispatch) => {
  if (axios.isAxiosError(error)) {
    dispatch(setError(error.message));
  }
};

export const getProducts =
  (page: number, pageSize = 10) =>
  async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const pagination = `?limit=${pageSize}&offset=${(page - 1) * 10}`;
      const response = await api.get(`products/${pagination}`);
      if (response.status === 200) {
        dispatch(addProducts(response.data.results));
        const { count, next, previous } = response.data;
        dispatch(setPagination({ count, next, previous } as Pagination));
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
