import React from "react";
import styles from "./button.module.css";

interface ButtonProps {
  text: string;
  width?: number;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ text, onClick }) => {
  return (
    <div
      className={styles.container}
      onClick={onClick}
    >
      {text}
    </div>
  );
};

export default Button;
