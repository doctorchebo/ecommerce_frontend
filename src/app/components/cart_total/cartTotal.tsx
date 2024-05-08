import { useAppSelector } from "@/app/store/hooks";
import { useEffect, useState } from "react";
import styles from "./cartTotal.module.css";

const CartTotal = () => {
  const { isReseller } = useAppSelector((state) => state.global);
  const { cartItems } = useAppSelector((state) => state.cart);
  const [total, setTotal] = useState<number | undefined>();
  useEffect(() => {
    const calculateTotal = () => {
      let total: number = 0;
      cartItems.forEach((item) => {
        total +=
          item.quantity *
          (isReseller && item.discount_price
            ? item.discount_price
            : item.price);
      });
      return total;
    };
    setTotal(calculateTotal());
  }, [cartItems, isReseller]);

  return (
    <tr className={styles.row}>
      <td colSpan={4} className={styles.text}>
        Total
      </td>
      <td className={styles.text}>
        <strong>Bs {total}</strong>
      </td>
    </tr>
  );
};

export default CartTotal;
