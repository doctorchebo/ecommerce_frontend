"use client";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { getProducts } from "@/app/store/product/productActions";
import useToast from "@/hooks/useToast";
import { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import Card from "../card/card";
import Loading from "../loading/loading";
import Toast from "../toast/toast";
import styles from "./products.module.css";

const Products = () => {
  const dispatch = useAppDispatch();
  useToast("Añadido al carrito!", "success", 3000);
  const { products, loading, error } = useAppSelector((state) => state.product);
  useEffect(() => {
    dispatch(getProducts());
  }, []);

  if (loading) return <Loading />;
  if (error) return <div>{error}</div>;
  return (
    <>
      <div className={styles.toastContainer}>
        <Toast />
      </div>
      <div className={styles.container}>
        {products.map((product, index) => (
          <Card key={index} product={product} />
        ))}
      </div>
    </>
  );
};

export default Products;
