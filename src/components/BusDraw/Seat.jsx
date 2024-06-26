import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { formattedCOP } from "../../utils/helper";
import { dictionary } from "../../utils/dictionary";
import { toast } from "react-toastify";
import {
  addTripLegSelectedSeat,
  removeTripLegSelectedSeat,
} from "../../features/selectedTrip/selectedTripSlice";

import {
  reservedSeat as reservedSeatSVG,
  freeSeat as freeSeatSVG,
  selectedSeat as selectedSeatSVG,
} from "../../image/SVG";
import styles from "./BusDraw.module.css";
import { useSelectDataSourceTrip } from "../../hooks/useSelectDataSourceTrip";

const Seat = ({ seatData }) => {
  const dispatch = useDispatch();
  const { errorMaxPassengers } = dictionary.errors;
  const { maximumPassengers, outboundTripLegs, returnTripLegs } = useSelector(
    (store) => store.selectedTrip
  );
  const { outboundTrips, returnTrips, totalPassengers } = useSelector(
    (store) => store.allTrips
  );

  const [isSelected, setIsSelected] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isReserved, setIsReserved] = useState(false);
  const dataSource = useSelectDataSourceTrip(
    outboundTrips,
    returnTrips,
    outboundTripLegs,
    returnTripLegs
  );

  useEffect(() => {
    if (
      parseInt(dataSource.selectedSeats.length) < parseInt(totalPassengers) &&
      seatData.isPreSelected
    ) {
      dispatch(
        addTripLegSelectedSeat({
          ...seatData,
          typeOfTrip: dataSource.typeOfSource,
        })
      );
      setIsSelected(true);
    }
  }, []);

  useEffect(() => {
    setIsSelected(
      dataSource.selectedSeats.find(
        (seat) => seat.approvedCode === seatData.approvedCode
      ) ?? false
    );
  });

  useEffect(() => {
    setIsReserved(seatData.seatApprovedStatusName.toLowerCase() !== "libre");
  }, []);

  const handleOnClickSelection = () => {
    if (!isSelected && dataSource.selectedSeats.length === maximumPassengers) {
      toast.error(errorMaxPassengers);
      return;
    }

    if (!isSelected) {
      dispatch(
        addTripLegSelectedSeat({
          ...seatData,
          typeOfTrip: dataSource.typeOfSource,
        })
      );
      setIsSelected(!isSelected);
    } else if (isSelected) {
      dispatch(
        removeTripLegSelectedSeat({
          ...seatData,
          typeOfTrip: dataSource.typeOfSource,
        })
      );
      setIsSelected(!isSelected);
    }
  };

  return (
    <div
      className={`${
        isReserved
          ? styles.reserved
          : isSelected
          ? styles.selected
          : styles.free
      } `}
      style={{
        backgroundImage: `url(${
          isReserved
            ? reservedSeatSVG
            : isSelected
            ? selectedSeatSVG
            : freeSeatSVG
        })`,
      }}
      onClick={handleOnClickSelection}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {!isSelected && !isReserved && isVisible && (
        <div className={styles.popoverSeat}>
          <div className={styles.rateTypePopoverSeat}>
            <span>
              {seatData.seatRateTypeName.toLowerCase()} -{" "}
              {seatData.approvedCode}
            </span>
          </div>
          <div className={styles.ratePopoverSeat}>
            <span>{`$${formattedCOP(seatData.seatRate)}`}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Seat;
