import { FaWhatsapp } from "react-icons/fa";
import styles from "./footer.module.css";

const Footer = () => {
  const generateUrl = () => {
    const phoneNumber = "+59172526442";
    let message = `Hola Magui, quisiera más información sobre los productos DXN.`;
    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  };
  return (
    <div className={styles.container}>
      <a href={generateUrl()} target="_blank">
        <div className={styles.iconContainer}>
          <p className={styles.txt}>Envíame un mensaje al 72526442</p>
          <FaWhatsapp size={30} color="white" />
        </div>
      </a>
    </div>
  );
};

export default Footer;
