import { useAppSelector } from "@/app/store/hooks";
import useMessage from "@/hooks/useMessage";
import { useRouter } from "next/navigation";
import Button from "../button/button";
import CartHeader from "../cart_header/cartHeader";
import CartItem from "../cart_item/cartItem";
import CartTotal from "../cart_total/cartTotal";
import Loading from "../loading/loading";
import styles from "./cart.module.css";

type Props = {};

const Cart = (props: Props) => {
  const router = useRouter();
  const { formattedMsg } = useMessage("Magui", "+59172526442");
  const { cartItems, loading, error } = useAppSelector((state) => state.cart);

  const handleBuy = () => {};

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (cartItems.length === 0) {
    return (
      <div className={styles.noItemsContainer}>
        <p className={styles.text}>No tienes items en tu carrito</p>
        <Button text="Ir de compras" onClick={() => router.push("/")} />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.tableWrapper}>
        <table className={styles.itemsTable}>
          <CartHeader />
          {cartItems.map((cartItem) => (
            <CartItem cartItem={cartItem} key={cartItem.id} />
          ))}
          <CartTotal />
        </table>
        <div className={styles.orderContainer}>
          <a href={formattedMsg} target="_blank">
            <Button text="Comprar" onClick={handleBuy} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Cart;
