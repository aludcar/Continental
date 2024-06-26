import React from "react";
import FormRow from "../Form/FormRow";
import styles from "./RadioButtonGroup.module.css";

const RadioButtonGroup = ({ collection, onHandleChange }) => {
  return (
    <>
      <div className={styles.RadioButtonGroupContainer}>
        {collection?.map((item) => (
          <FormRow
            type="radio"
            value={item.value}
            name={item.name}
            hasLabelBackground={item.hasLabelBackground}
            imageBackground={item.imageBackground}
            handleOnChange={onHandleChange}
            checked={item.checked}
            require={item.require}
            labelText={item.labelText}
            extraClasses={`${styles.formGroupReverse} ${styles.imageBackground} ${styles.formControlNoShadows} `}
          />
        ))}
      </div>
    </>
  );
};

export default RadioButtonGroup;
