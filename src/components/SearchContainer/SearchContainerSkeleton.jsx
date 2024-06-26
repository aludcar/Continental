import React from "react";
import styles from "./SearchContainer.module.css";
const SearchContainerSkeleton = () => {
  return (
    <>
      <div className={styles.form_group_skeleton}>
        <input type="text" className={styles.form_select_skeleton} />
        <input type="text" className={styles.form_select_skeleton} />
        <input type="text" className={styles.form_input_skeleton} />
        <input type="text" className={styles.form_input_skeleton} />
        <input type="text" className={styles.form_input_skeleton} />
      </div>
    </>
  );
};

export default SearchContainerSkeleton;
