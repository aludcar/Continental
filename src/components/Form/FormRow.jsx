import {useCallback} from "react";
import styles from "./Form.module.css";

const FormRow = ({
  type,
  name,
  value,
  labelText,
  handleOnChange,
  handleOnClick,
  require = false,
  hasLabelBackground = false,
  imageBackground = null,
  isCenterElement = false,
  checked = false,
  placeHolder= '',
  pattern= "[a-zA-Z0-9]+",
  minLength= 4,
  maxLength= 25,
  extraClasses = "",
  isDisabled = false,
}) => {

  useCallback(()=>{
    
  })
  

  return (
    <div class={`${styles.formGroup} ${isCenterElement && styles.centerElements} ${extraClasses}`}>
      <label
        htmlFor={name}
        className={styles.label}
      >
        {hasLabelBackground ? <img src={imageBackground} className={styles.imageBackground} /> : (labelText ?? name)}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={handleOnChange}
        className={styles.formControl}
        required={require}
        checked={checked}
        placeholder={placeHolder}
        handleOnClick ={handleOnClick}
        minLength={minLength}
        maxLength={maxLength}
        disabled={isDisabled}
        autoComplete="off"
      />
    </div>
  );
};

export default FormRow;
