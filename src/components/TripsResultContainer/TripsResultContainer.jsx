import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TripsResult from "../TripResult/TripResult";
import {
  getAvailableTrips,
  updateAllTripsStateProps,
} from "../../features/allTrips/allTripsSlice";
import styles from "./TripsResultContainer.module.css";
import { useSelectDataSourceTrip } from "../../hooks/useSelectDataSourceTrip";
import { resetTripLeg } from "../../features/selectedTrip/selectedTripSlice";
import { typeOfSource } from "../../utils/typeOfSource";
import TripsResultContainerSkeleton from "./TripsResultContainerSkeleton";
import { dictionary } from "../../utils/dictionary";

const TripsResultContainer = () => {
  const dispatch = useDispatch();
  const {tripResultContainer} = dictionary.components;
  const { isLoading, outboundTrips, returnTrips } = useSelector(
    (store) => store.allTrips
  );
  const { outboundTripLegs, returnTripLegs } = useSelector(
    (store) => store.selectedTrip
  );
  const { passengers } = useSelector((store) => store.searchTrip);

  const dataSource = useSelectDataSourceTrip(
    outboundTrips,
    returnTrips,
    outboundTripLegs,
    returnTripLegs
  );

  useEffect(() => {
    dispatch(resetTripLeg({ typeOfTrip: typeOfSource.outboundTrip }));
    dispatch(resetTripLeg({ typeOfTrip: typeOfSource.returnTrip }));
    dispatch(
      updateAllTripsStateProps({
        nameProp: "totalPassengers",
        valueProp: passengers,
      })
    );
    dispatch(
      updateAllTripsStateProps({
        nameProp: "definedTotalPassengers",
        valueProp: passengers,
      })
    );
  }, []);

  useEffect(() => {
    dispatch(getAvailableTrips());
  }, []);

  console.log({dataSource:dataSource.source})

  return (
    <>
      {isLoading && <TripsResultContainerSkeleton />}

      {(!outboundTrips.length && !returnTrips.length) ||
      dataSource.source.length === 0 ? (
        <div className={`${styles.minHeightView}`}>
          {!isLoading && <span>{tripResultContainer.message}</span>}
        </div>
      ) : (
        <div className={`${styles.minHeightView}`}>
          {dataSource.source?.map((trip) => {
            return (
              <TripsResult
                key={trip.tripKey}
                {...trip}
                typeOfTrip={dataSource.typeOfSource}
              />
            );
          })}
        </div>
      )}
    </>
  );
};

export default TripsResultContainer;
