import { useSelector } from "react-redux";
import { formattedCOP } from "../../utils/helper";
import { useSelectDataSourceTrip } from "../../hooks/useSelectDataSourceTrip";
import IconService from "../../components/IconServices/IconService";
import {
  reservedSeat,
  freeSeat,
  selectedSeat,
  steering,
  bathroom,
  people,
} from "../../image/SVG";
import IconServicesContainer from "../IconServices/IconServicesContainer";

import styles from "./SeatReservationPanel.module.css";
import { dictionary } from "../../utils/dictionary";

const SeatReservationPanel = () => {
  const { outboundTrips, returnTrips } = useSelector((store) => store.allTrips);
  const { outboundTripLegs, returnTripLegs } = useSelector(
    (store) => store.selectedTrip
  );
  const { seatReservationPanel } = dictionary.components;

  return (
    <div className={styles.seatReservationPanel}>
      <div className={styles.seatStatusContainer}>
        <span className={styles.sectionTitle}>
          {seatReservationPanel.locations}
        </span>
        <div className={styles.seatStatusContainerImg}>
          <span>
            <img
              src={reservedSeat}
              alt={seatReservationPanel.busySeat}
              className={styles.seatStatusImg}
            />
            {seatReservationPanel.busySeat}
          </span>
          <span>
            <img
              src={freeSeat}
              alt={seatReservationPanel.availableSeat}
              className={styles.seatStatusImg}
            />
            {seatReservationPanel.availableSeat}
          </span>
          <span>
            <img
              src={selectedSeat}
              alt={seatReservationPanel.selectedSeat}
              className={styles.seatStatusImg}
            />
            {seatReservationPanel.selectedSeat}
          </span>
          <span>
            <img
              src={steering}
              alt={seatReservationPanel.driver}
              className={styles.seatStatusImg}
            />
            {seatReservationPanel.driver}
          </span>
          <span>
            <img
              src={bathroom}
              alt={seatReservationPanel.toilets}
              className={styles.seatStatusImg}
            />
            {seatReservationPanel.toilets}
          </span>
        </div>
      </div>
      <div className={styles.servicesContainer}>
        <span className={styles.sectionTitle}>
          {seatReservationPanel.additionalServices}
        </span>
        <div className={styles.iconServicesContainer}>
          <IconServicesContainer />
        </div>
      </div>
      <div className={styles.seatReservationContainer}>
        <span className={styles.sectionTitle}>
          {seatReservationPanel.selectionSeats}
        </span>
        <div className={styles.selectedSeatsCollectionContainer}>
          <ul>
            {useSelectDataSourceTrip(
              outboundTrips,
              returnTrips,
              outboundTripLegs,
              returnTripLegs
            ).selectedSeats.map((seat) => (
              <li key={seat.approvedCode}>
                <div
                  className={styles.seatApprovedCode}
                >{`${seatReservationPanel.seat} ${seat.approvedCode}`}</div>
                <div className={styles.seatApprovedRate}>{`$ ${formattedCOP(
                  seat.seatRate
                )}`}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={styles.seatInfoContainer}>
        <span className={styles.sectionTitle}>
          {seatReservationPanel.additionalInformation}
        </span>
        <div className={styles.seatInfoInnerColumn}>
          <div className={styles.iconContainer}>
            <IconService icon={people} size="extraSmall" />
          </div>
          <div className={styles.extraInfoContainer}>
            <span className={styles.extraInfoMod1}>
              {seatReservationPanel.messageTitle}
            </span>
            <span className={styles.extraInfoMod2}>
              {seatReservationPanel.message}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatReservationPanel;
