import { increaseQuantity } from "@/app/store/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { CartItem } from "@/app/types/cart";
import { Product } from "@/app/types/product";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Button from "../button/button";
import styles from "./card.module.css";

interface CardProps {
  product: Product;
}

const Card: React.FC<CardProps> = ({ product }) => {
  const dispatch = useAppDispatch();
  const { isReseller } = useAppSelector((state) => state.global);
  let showDiscount = product.discount != undefined && isReseller;
  const router = useRouter();
  const handleAddToCart = () => {
    const cartItem: CartItem = {
      id: product.id!,
      name: product.name,
      price: product.price,
      discount_price: product.discount ? product.discount_price! : undefined,
      quantity: 1,
      imageUrl: product.images[0]?.image,
    };
    dispatch(increaseQuantity(cartItem));
  };

  const handleViewDetail = () => {
    router.push(`/product-detail/${product.id}/${product.slug}/`);
  };

  return (
    <div className={styles.container}>
      {isReseller && product.discount && (
        <div className={styles.discountBadge}>-{product.discount * 100}%</div>
      )}
      <div className={styles.content} onClick={handleViewDetail}>
        <p className={styles.productName}>{product.name}</p>
        <div className={styles.imgContainer}>
          <Image
            src={product.images[0].image}
            alt={`img-${product.name}`}
            height={200}
            width={200}
          />
        </div>
        <div className={styles.descriptionContainer}>
          <p>{product.description}</p>
        </div>
        <div className={styles.priceContainer}>
          <p className={showDiscount ? styles.crossout : ""}>
            Bs {product.price.toFixed(2)}
          </p>
          {showDiscount && (
            <>
              <p className={styles.discountedPrice}>
                Bs {Math.floor(product.discount_price!).toFixed(2)}
              </p>
            </>
          )}
        </div>
        {showDiscount && (
          <p className={styles.text}>
            Ahorras Bs {(Math.floor(product.price - product.discount_price!)).toFixed(2)}
          </p>
        )}
      </div>
      <div className={styles.btnContainer}>
        <Button text="Añadir al Carrito" onClick={handleAddToCart} />
      </div>
    </div>
  );
};

export default Card;
