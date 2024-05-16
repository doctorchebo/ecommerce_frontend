"use client";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { getProducts } from "@/app/store/product/productActions";
import useToast from "@/hooks/useToast";
import { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import Card from "../card/card";
import ChatBubble from "../chat_bubble/ChatBubble";
import Loading from "../loading/loading";
import Pagination from "../pagination/pagination";
import Toast from "../toast/toast";
import styles from "./products.module.css";

const Products = () => {
  const dispatch = useAppDispatch();
  const { pagination } = useAppSelector((state) => state.global);
  useToast("Añadido al carrito!", "success", 3000);
  const { products, loading, error } = useAppSelector((state) => state.product);
  useEffect(() => {
    dispatch(getProducts(pagination.page));
  }, []);

  if (loading || !products) return <Loading />;
  if (error) return <div>{error}</div>;
  return (
    <div>
      <div className={styles.toastContainer}>
        <Toast />
      </div>
      <div className={styles.container}>
        {products.map((product, index) => (
          <Card key={index} product={product} />
        ))}
      </div>
      <Pagination />
      <ChatBubble />
    </div>
  );
};

export default Products;
