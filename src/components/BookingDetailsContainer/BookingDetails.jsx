import { useState, useEffect } from "react";
import { useGetTypeOfBusIcon } from "../../hooks/useGetTypeOfBusIcon";
import IconService from "../IconServices/IconService";
import styles from "./BookingDetailsContainer.module.css";
import { useConvertFormatHours } from "../../hooks/useFormatNormalHours";
import { formattedCOP } from "../../utils/helper";
import { dictionary } from "../../utils/dictionary";

const BookingDetails = ({ dataSource, title, isReturnTrip = false }) => {
  const [typeOfBusIcon, setTypeOfBusIcon] = useState(null);
  const { bookingDetails } = dictionary.components;
  useEffect(() => {
    const busIcon = useGetTypeOfBusIcon(dataSource.busServiceId);
    busIcon && setTypeOfBusIcon(busIcon);
  }, []);
  return (
    <>
      <div>
        <div className={styles.itemDetailTitle}>
          <span>{title}</span>
        </div>
        <div className={styles.itemDetailContainer}>
          <div className={styles.busServiceNameContainer}>
            {typeOfBusIcon ? (
              <IconService icon={typeOfBusIcon} size="medium" />
            ) : (
              <span>{dataSource.busServiceName}</span>
            )}
          </div>
          <div className={styles.itemDetailsContainer}>
            <div className={styles.itemDetailLabel}>
              <span>{bookingDetails.departure}</span>
            </div>
            <div className={styles.itemDetailHourAndPriceContainer}>
              <div className={styles.itemDetailHourContainer}>
                <span>{useConvertFormatHours(dataSource.departureHour)}</span>
                <span>{dataSource.departureDate}</span>
              </div>
              <div
                className={styles.itemDetailPriceContainer}
              >{`$ ${formattedCOP(dataSource.subTotal)}`}</div>
            </div>
            <div className={styles.itemDetailsTrip}>
              <span>
                {!isReturnTrip
                  ? dataSource.originAgencyName
                  : dataSource.destinationAgencyName}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingDetails;
