import {
  decreaseQuantity,
  increaseQuantity,
  removeCartItem,
} from "@/app/store/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { CartItem as ICartItem } from "@/app/types/cart";
import Image from "next/image";
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";
import { MdDelete } from "react-icons/md";

import styles from "./cartItem.module.css";

type Props = {
  cartItem: ICartItem;
};

const CartItem: React.FC<Props> = ({ cartItem }) => {
  const dispatch = useAppDispatch();
  const { isReseller } = useAppSelector((state) => state.global);
  const showDiscount = isReseller && cartItem.discount_price;
  const handleDelete = () => {
    dispatch(removeCartItem(cartItem));
  };

  const handleIncrease = () => {
    dispatch(increaseQuantity(cartItem));
  };

  const handleDecrease = () => {
    dispatch(decreaseQuantity(cartItem));
  };

  return (
    <tr className={styles.row}>
      <td className={styles.imageContainer}>
        <Image
          src={cartItem.imageUrl}
          alt="cart_item_image"
          height={100}
          width={100}
        />
      </td>
      <td className={styles.text}>{cartItem.name}</td>
      <td className={styles.text}>
        Bs {showDiscount ? cartItem.discount_price! : cartItem.price}
      </td>
      <td className={styles.text}>
        <div className={styles.btn} onClick={handleIncrease}>
          <AiFillPlusCircle size={20} color="rgb(250, 128, 114)" />
        </div>
        {cartItem.quantity}
        <div className={styles.btn} onClick={handleDecrease}>
          <AiFillMinusCircle size={20} color="rgb(250, 128, 114)" />
        </div>
      </td>
      <td className={styles.text}>
        Bs{" "}
        {(showDiscount ? cartItem.discount_price! : cartItem.price) *
          cartItem.quantity}
      </td>
      <td className={styles.delete} onClick={handleDelete}>
        <MdDelete size={20} color="rgb(250, 128, 114)" />
      </td>
    </tr>
  );
};

export default CartItem;
