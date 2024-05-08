"use client";

import Button from "@/app/components/button/button";
import Loading from "@/app/components/loading/loading";
import Toast from "@/app/components/toast/toast";
import { increaseQuantity } from "@/app/store/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { getProduct } from "@/app/store/product/productActions";
import { CartItem } from "@/app/types/cart";
import useToast from "@/hooks/useToast";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import styles from "./page.module.css";

const ProductDetailPage = () => {
  const dispatch = useAppDispatch();
  useToast("Añadido al carrito", "success", 3000);
  const { id } = useParams<{ id: string; slug: string }>();
  const { product, loading, error } = useAppSelector((state) => state.product);
  const { isReseller } = useAppSelector((state) => state.global);
  const [imgNumber, setImgNumber] = useState(0);
  const [isRightVisible, setRightVisible] = useState(false);
  const [isLeftVisible, setLeftVisible] = useState(false);

  useEffect(() => {
    dispatch(getProduct(id));
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      const cartItem: CartItem = {
        id: product.id!,
        name: product.name,
        price: product.price,
        discount_price: product.discount ? product.discount_price! : undefined,
        quantity: 1,
        imageUrl: product.images[0]?.image,
      };
      dispatch(increaseQuantity(cartItem));
    }
  };

  const handleChangeImg = (isLeft: boolean) => {
    if (isLeft) {
      setImgNumber((prev) => prev + 1);
    } else if (imgNumber > 0) {
      setImgNumber((prev) => prev - 1);
    }
  };

  useEffect(() => {
    if (imgNumber === 0) {
      setLeftVisible(false);
      if (product?.images.length! > 0) {
        setRightVisible(true);
      }
    }
    if (imgNumber === product?.images.length! - 1) {
      setRightVisible(false);
    }
    if (imgNumber > 0 && product?.images.length! > 1) {
      setLeftVisible(true);
    }
  }, [imgNumber, product]);

  if (loading || !product) {
    return <Loading />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={styles.container}>
      <Toast />
      <div className={styles.imgContainer}>
        <div className={styles.imgWrapper}>
          <Image
            src={product?.images[imgNumber].image!}
            alt="product_image"
            priority={true}
            sizes="100vw"
            style={{
              width: "100%",
              height: "auto",
            }}
            width={500}
            height={500}
          />
        </div>
        <div
          className={[
            styles.arrowContainer,
            isRightVisible && isLeftVisible
              ? styles.alignCenter
              : imgNumber === 0
              ? styles.alignRight
              : styles.alignLeft,
          ].join(" ")}
        >
          <div
            className={[!isLeftVisible && styles.hidden, styles.leftArrow].join(
              " "
            )}
            onClick={() => handleChangeImg(false)}
          >
            <SlArrowLeft size={30} color={"#838383"} />
          </div>
          <div
            className={[
              !isRightVisible && styles.hidden,
              styles.rightArrow,
            ].join(" ")}
            onClick={() => handleChangeImg(true)}
          >
            <SlArrowRight size={30} color={"#838383"} />
          </div>
        </div>
      </div>
      <div className={styles.contentContainer}>
        <p className={styles.title}>{product?.name}</p>
        <div className={styles.priceContainer}>
          {isReseller && product?.discount ? (
            <div className={styles.discountedContainer}>
              <p className={styles.crossout}>Bs {product?.price}</p>
              <p className={styles.discountedPrice}>
                Bs {Math.floor(product?.discount_price!).toFixed(2)}
              </p>
              <p>
                Ahorras Bs{" "}
                {Math.floor(product?.price - product?.discount_price!).toFixed(
                  2
                )}
              </p>
            </div>
          ) : (
            <p>Bs {Math.floor(product?.price).toFixed(2)}</p>
          )}
        </div>
        <Button text="Añadir al carrito" onClick={handleAddToCart} />
        <div className={styles.descriptionContainer}>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {product?.long_description!}
          </ReactMarkdown>
        </div>
        {isReseller && (
          <div className={styles.resellerContainer}>
            <p><strong>Puntos de Valor (PV):</strong> {product.points_value}</p>
            <p><strong>Puntos de Venta (SV):</strong> {product.sales_value}</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default ProductDetailPage;
