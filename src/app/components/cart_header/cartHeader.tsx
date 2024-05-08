import styles from "./cartHeader.module.css";

type Props = {};

const CartHeader = (props: Props) => {
  return (
    <tr className={styles.row}>
      <th className={styles.content}></th>
      <th className={styles.content}>Producto</th>
      <th className={styles.content}>Precio</th>
      <th className={styles.content}>Cantidad</th>
      <th className={styles.content}>Total</th>
    </tr>
  );
};

export default CartHeader;
