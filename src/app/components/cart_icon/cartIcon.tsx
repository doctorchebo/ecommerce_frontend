import { useAppSelector } from "@/app/store/hooks";
import { CartItem } from "@/app/types/cart";
import { useEffect, useState } from "react";
import { PiShoppingCartFill } from "react-icons/pi";
import styles from "./cartIcon.module.css";

const CartIcon = () => {
  const { cartItems } = useAppSelector((state) => state.cart);
  const [count, setCount] = useState<number | undefined>();
  useEffect(() => {
    const getItemsCount = (cartItems: CartItem[]) => {
      let count: number = 0;
      cartItems.forEach((item) => {
        count += item.quantity;
      });
      return count;
    };
    setCount(getItemsCount(cartItems));
  }, [cartItems]);

  return (
    <div className={styles.container}>
      <PiShoppingCartFill size={50} color="white" />
      {count! > 0 && <div className={styles.count}>{count}</div>}
    </div>
  );
};

export default CartIcon;
