import { useAppSelector } from "@/app/store/hooks";
import { useEffect } from "react";
import { ToastOptions, toast } from "react-toastify";

const useToast = (message: string, type: string, timeout: number) => {
  const { cartItems } = useAppSelector((state) => state.cart);
  useEffect(() => {
    const options: ToastOptions<unknown> | undefined = {
      position: "top-center",
      autoClose: timeout,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    };
    switch (type) {
      case "success":
        toast.success(message, options);
        break;
      default:
        toast(message, options);
    }
  }, [cartItems]);
};

export default useToast;
