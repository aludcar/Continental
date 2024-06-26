import React from "react";
import styles from "./IconServices.module.css";

const IconService = ({ icon, size = "small", handleOnClick }) => {
  return (
    <>
      <span
        className={
          (size === "ultraSmall" && styles.iconItemUltraSmall) ||
          (size === "extraSmall" && styles.iconItemExtraSmall) ||
          (size === "small" && styles.iconItemSmall) ||
          (size === "medium" && styles.iconItemMedium) ||
          (size === "large" && styles.iconItemLarge)
        }
        onClick={handleOnClick}
      >
        <img src={icon} alt="" />
      </span>
    </>
  );
};

export default IconService;
