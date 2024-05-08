import { ClipLoader } from "react-spinners";
import styles from "./loading.module.css"

const Loading = () => {
  return (
    <div className={styles.container}>
      <ClipLoader color="rgb(253, 103, 87)" />
    </div>
  );
};

export default Loading;
