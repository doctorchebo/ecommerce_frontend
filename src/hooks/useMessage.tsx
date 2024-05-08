import { useAppSelector } from "@/app/store/hooks";
import { useEffect, useState } from "react";

const useMessage = (name: string, phoneNumber: string) => {
  const { isReseller } = useAppSelector((state) => state.global);
  const { cartItems } = useAppSelector((state) => state.cart);
  const [formattedMsg, setFormattedMsg] = useState("");

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
    const total = calculateTotal();

    // Construct the message
    let message = `Hola ${name}, quiero comprar estos productos:\n`;
    cartItems.forEach((item) => {
      message += `${item.name}: ${item.quantity}\n`;
    });
    message += "Total: Bs " + total;

    if (isReseller) {
      message += "\nPD: Soy distribuidor DXN";
    }

    /// Encode the message for the URL
    let formattedMsg = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    setFormattedMsg(formattedMsg);
  }, [cartItems, isReseller]);

  return { formattedMsg };
};

export default useMessage;
