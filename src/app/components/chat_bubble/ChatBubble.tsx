import { createChatUrl } from "@/utils/createChatUrl";
import { FaWhatsapp } from "react-icons/fa";
import styles from "./chatBubble.module.css";

const ChatBubble = () => {
  return (
    <a
      className={styles.chatBubbleContainer}
      href={createChatUrl("Magui", "+59172526442")}
      target="_blank"
    >
      <div className={styles.chatBubble}>
        <FaWhatsapp
          className={styles.icon}
          color="rgb(253, 89, 70)"
          size={50}
        />
        <div className={styles.notification}>1</div>
      </div>
    </a>
  );
};

export default ChatBubble;
