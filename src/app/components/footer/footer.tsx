import { createChatUrl } from "@/utils/createChatUrl";
import { FaWhatsapp } from "react-icons/fa";
import styles from "./footer.module.css";

const Footer = () => {
  return (
    <div className={styles.container}>
      <a href={createChatUrl("Magui", "+59172526442")} target="_blank">
        <div className={styles.iconContainer}>
          <p className={styles.txt}>Envíame un mensaje al 72526442</p>
          <FaWhatsapp size={30} color="white" />
        </div>
      </a>
    </div>
  );
};

export default Footer;
