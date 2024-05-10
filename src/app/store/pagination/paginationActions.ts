import api from "@/app/api/api";
import { Pagination } from "@/app/types/pagination";
import axios from "axios";
import {
  decreasePage,
  increasePage,
  setPagination,
} from "../global/globalSlice";
import { addProducts, setError, setLoading } from "../product/productSlice";
import { AppDispatch } from "../store";

const handleError = (error: unknown, dispatch: AppDispatch) => {
  if (axios.isAxiosError(error)) {
    dispatch(setError(error.message));
  }
};

export const goPage =
  (url: string, isUp: boolean) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const pagination = url.split("?")[1];
      const response = await api.get(`products/?${pagination}`);
      dispatch(addProducts(response.data.results));
      const { count, next, previous } = response.data;
      dispatch(setPagination({ count, next, previous } as Pagination));
      if (isUp) {
        dispatch(increasePage());
      } else {
        dispatch(decreasePage());
      }
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch(setLoading(false));
    }
  };
