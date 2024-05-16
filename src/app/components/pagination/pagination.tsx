import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

import { goPage } from "@/app/store/pagination/paginationActions";
import { useEffect } from "react";
import styles from "./pagination.module.css";
const Pagination = () => {
  const dispatch = useAppDispatch();
  const { pagination } = useAppSelector((state) => state.global);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pagination.page]);

  const handlePrevious = () => {
    dispatch(goPage(pagination.previous!, false));
  };

  const handleNext = () => {
    dispatch(goPage(pagination.next!, true));
  };

  return (
    <div className={styles.container}>
      {pagination?.previous && (
        <div className={styles.arrow} onClick={handlePrevious}>
          <MdKeyboardArrowLeft size={20} color="white" />
        </div>
      )}
      {pagination?.count && (
        <p>
          Página {pagination.page} de {Math.ceil(pagination?.count / 10)}
        </p>
      )}
      {pagination?.next && (
        <div className={styles.arrow} onClick={handleNext}>
          <MdKeyboardArrowRight size={20} color="white" />
        </div>
      )}
    </div>
  );
};

export default Pagination;
