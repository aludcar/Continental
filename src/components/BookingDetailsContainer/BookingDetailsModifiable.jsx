import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useGetTypeOfBusIcon } from "../../hooks/useGetTypeOfBusIcon";
import IconService from "../IconServices/IconService";
import {
  resetTripLeg,
  updateTripLeg,
} from "../../features/selectedTrip/selectedTripSlice";
import { useConvertFormatHours } from "../../hooks/useFormatNormalHours";
import { dictionary } from "../../utils/dictionary";
import styles from "./BookingDetailsContainer.module.css";

const BookingDetailsModifiable = ({ dataSource, title }) => {
  const dispatch = useDispatch();
  const { bookingDetails } = dictionary.components;
  const [typeOfBusIcon, setTypeOfBusIcon] = useState(null);

  useEffect(() => {
    const busIcon = useGetTypeOfBusIcon(dataSource.busServiceId);
    busIcon && setTypeOfBusIcon(busIcon);
  }, []);

  const handleOnClick = () => {
    dispatch(
      updateTripLeg({ isApproved: false, typeOfTrip: "outboundTripLegs" })
    );
    dispatch(resetTripLeg({ typeOfTrip: "outboundTripLegs" }));
  };
  return (
    <div className={styles.itemDetailsContainer}>
      <div className={styles.itemDetailTitle}>
        <span>{title}</span>
      </div>
      <div className={styles.itemDetailsModifiableContainer}>
        <div className={styles.busServiceNameContainer}>
          {typeOfBusIcon ? (
            <IconService icon={typeOfBusIcon} size="medium" />
          ) : (
            <span>{dataSource.busServiceName}</span>
          )}
        </div>
        <div className={styles.detailsModifiableContainer}>
          <div className={styles.itemDetailLabel}>
            <span>Salida</span>
          </div>
          <div className={styles.itemDetailHourContainer}>
            <span>{useConvertFormatHours(dataSource.departureHour)}</span>
          </div>
          <div className={styles.itemDetailsTrip}>
            <span>{dataSource.originAgencyName}</span>
          </div>
        </div>
        <div className={styles.itemDetailModifiableBtn}>
          <button className="btn" onClick={handleOnClick}>
            {bookingDetails.modify}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsModifiable;
