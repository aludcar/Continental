import { useEffect, useState } from "react";
import FormRow from "../Form/FormRow";
import { useDispatch, useSelector } from "react-redux";
import styles from "./CouponContainer.module.css";
import {
  getPromoCodeInfo,
  resetCouponCodeState,
  updateCouponProperty,
} from "../../features/couponCode/couponCodeSlice";
import { dictionary } from "../../utils/dictionary";

const CouponContainer = () => {
  const dispatch = useDispatch();
  const { coupon } = dictionary.components;
  const { purchaseTotalPrice, isPromoCodeValid, couponCodeMessage } =
    useSelector((store) => store.couponCode);
  const [couponCode, setCouponCode] = useState("");

  useEffect(() => {
    return () => dispatch(resetCouponCodeState());
  }, []);

  const handleOnChange = (e) => {
    const value = e.target.value;
    !value &&
      dispatch(
        updateCouponProperty({
          propName: "couponCodeMessage",
          propValue: null,
        })
      );
    setCouponCode(value);
  };

  const handleOnClick = () => {
    couponCode.length >= 5 && dispatch(getPromoCodeInfo(couponCode));
  };
  return (
    <div className={styles.couponContainer}>
      <FormRow
        type="text"
        value={couponCode}
        name="coupon"
        labelText={coupon.label}
        handleOnChange={handleOnChange}
        minLength={5}
        isDisabled={isPromoCodeValid && purchaseTotalPrice !== null}
      />
      {couponCode && couponCodeMessage && (
        <div className={styles.labelMsgCoupon}>
          <label>{couponCodeMessage}</label>
        </div>
      )}
      <button
        className={`btn ${styles.btnCouponApply}`}
        onClick={handleOnClick}
        disabled={isPromoCodeValid && purchaseTotalPrice !== null}
      >
        {coupon.apply}
      </button>
    </div>
  );
};

export default CouponContainer;
