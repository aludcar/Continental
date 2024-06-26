import styles from "./Form.module.css";

const FormRowSelect = ({
  name,
  value,
  labelText,
  handleOnChange,
  isLoading,
  optionsSource,
  loadingText,
  defaultText = "",
  isDisabled = false,
  require = false,
}) => {
  return (
    <div class={styles.formGroup}>
      <label htmlFor={name} className={styles.label}>
        {labelText}
      </label>
      <select
        className={styles.formControl}
        name={name}
        onChange={handleOnChange}
        disabled={isDisabled}
        value={value}
        required={require}
      >
        <option defaultValue disabled selected value="">
          {isLoading ? loadingText || defaultText : defaultText}
        </option>
        {optionsSource?.map((option) => (
          <option
            key={
              option?.agencyId ||
              option?.countryName ||
              option?.documentTypeId ||
              option?.genderId ||
              option
            }
            value={
              option?.agencyId ||
              option?.countryName ||
              option?.documentTypeId ||
              option?.genderId ||
              option
            }
          >
            {option?.agencyName?.toLowerCase() ||
              option?.countryName?.toLowerCase() ||
              option?.documentTypeDescription?.toLowerCase() ||
              option?.gender ||
              option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FormRowSelect;
