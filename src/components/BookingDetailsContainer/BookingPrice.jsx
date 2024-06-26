import React from "react";
import { formattedCOP } from "../../utils/helper";
import styles from "./BookingDetailsContainer.module.css";
import { useSelector } from "react-redux";
import { dictionary } from "../../utils/dictionary";

const BookingPrice = ({ totalPrice }) => {
  const { isPromoCodeValid, discountPrice, purchaseTotalPrice } = useSelector(
    (store) => store.couponCode
  );
  const { bookingDetails } = dictionary.components;

  return (
    <div className={styles.itemDetailsTotalPiceContainer}>
      {isPromoCodeValid &&
      purchaseTotalPrice !== null &&
      discountPrice != null ? (
        <>
          <div>
            <div className={styles.totalPriceContainer}>
              <span className={styles.totalPriceTitle}>
                {bookingDetails.total}
              </span>
              <span className={styles.totalPriceValue}>{`$ ${formattedCOP(
                totalPrice
              )}`}</span>
            </div>
            <div className={styles.totalDiscountContainer}>
              <span className={styles.totalPriceTitle}>
                {bookingDetails.discount}
              </span>
              <span className={styles.totalPriceValue}>{`$ ${formattedCOP(
                discountPrice
              )}`}</span>
            </div>
            <div className={styles.totalPriceContainer}>
              <span className={styles.totalPriceTitle}>
                {bookingDetails.totalDiscount}
              </span>
              <span className={styles.totalPriceValue}>{`$ ${formattedCOP(
                purchaseTotalPrice
              )}`}</span>
            </div>
          </div>
        </>
      ) : (
        <>
          <span className={styles.totalPriceTitle}>{bookingDetails.total}</span>
          <span className={styles.totalPriceValue}>{`$ ${formattedCOP(
            totalPrice
          )}`}</span>
        </>
      )}
    </div>
  );
};

export default BookingPrice;
