import React from "react";
import { useSelector } from "react-redux";
import { formattedCOP } from "../../utils/helper";
import styles from "./TotalSeatSelectionPanel.module.css";

import { useSelectDataSourceTrip } from "../../hooks/useSelectDataSourceTrip";
import ConfirmSelectionSeatsButton from "../ConfirmSelectionSeatsButton/ConfirmSelectionSeatsButton";
import { typeOfSource } from "../../utils/typeOfSource";
import { dictionary } from "../../utils/dictionary";


const TotalSeatSelectionPanel = () => {
  const { outboundTripLegs, returnTripLegs, TotalPrice } = useSelector(
    (store) => store.selectedTrip
  );
  const {
    outboundTrips: outboundTripsSource,
    returnTrips: returnTripsSource,
    totalPassengers,
    definedTotalPassengers,
  } = useSelector((store) => store.allTrips);
  const{ totalSelectionPanel}= dictionary.components

  const dataSource = useSelectDataSourceTrip(
    outboundTripsSource,
    returnTripsSource,
    outboundTripLegs,
    returnTripLegs
  );

  const doValidateSelectedPassengers = (totalPassengers, dataSource) => {
    if (dataSource.typeOfSource === typeOfSource.returnTrip) {
      return (
        parseInt(dataSource.selectedSeats.length) >= parseInt(totalPassengers)
      );
    } else {
      return (
        parseInt(dataSource.selectedSeats.length) >=
        parseInt(definedTotalPassengers)
      );
    }
  };

  return (
    <>
      <div className={styles.totalSeatSelectionContainer}>
        <>
          <div className={styles.totalTitleContainer}>
            <div className={styles.totalTitle}>
              <h4>Total </h4>
            </div>
            <div className={styles.totalPrice}>
              <h4>${formattedCOP(TotalPrice)}</h4>
            </div>
          </div>
          <div className={styles.totalButtonContainer}>
            {doValidateSelectedPassengers(totalPassengers, dataSource) ? (
              <ConfirmSelectionSeatsButton dataSource={dataSource} />
            ) : (
              <>
                <h5>{totalSelectionPanel.message}</h5>
              </>
            )}
          </div>
        </>
      </div>
    </>
  );
};

export default TotalSeatSelectionPanel;
