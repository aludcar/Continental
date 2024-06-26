import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMaximumSelectedSeats } from "../../hooks/useMaximumSelectedSeats";
import { getAllCountries } from "../../features/countries/countriesSlice";
import { getAllDocumentTypes } from "../../features/documentTypes/documentTypesSlice";
import Passenger from "../Passenger/Passenger";
import styles from "./PassengersContainer.module.css";

const PassengersContainer = () => {
  const dispatch = useDispatch();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const { outboundTripLegs, returnTripLegs } = useSelector(
    (store) => store.selectedTrip
  );
  const { documentTypesData } = useSelector((store) => store.documentTypes);
  const { countriesData } = useSelector((store) => store.countries);

  useEffect(() => {
    if (documentTypesData === null || documentTypesData.length === 0) {
      dispatch(getAllDocumentTypes());
    }
  }, [documentTypesData]);

  useEffect(() => {
    if (countriesData === null || countriesData.length === 0) {
      dispatch(getAllCountries());
    }
  }, [countriesData]);

  useEffect(() => {

    const seats = Array(
      useMaximumSelectedSeats(outboundTripLegs, returnTripLegs).length
    )
      .fill()
      .map((_, index) => {
        return {
          outboundTripSeats:
            outboundTripLegs[0]?.seats?.length &&
            outboundTripLegs[0]?.seats[index]?.approvedCode,
          returnTripSeats:
            returnTripLegs[0]?.seats?.length &&
            returnTripLegs[0]?.seats[index]?.approvedCode,
        };
      });
    setSelectedSeats(seats);
  }, []);

  return (
    <>
      <div className={styles.passengersContainer}>
        {selectedSeats?.map((selectedSeat, index) => (
          <Passenger
            key={index}
            isLeadPassenger={index === 0}
            countriesSource={countriesData}
            documentTypesSource={documentTypesData}
            outboundSeat={selectedSeat?.outboundTripSeats ?? null}
            returnSeat={selectedSeat?.returnTripSeats ?? null}
            index={index + 1}
          />
        ))}
      </div>
    </>
  );
};

export default PassengersContainer;
