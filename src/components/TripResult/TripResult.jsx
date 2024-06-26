import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getMinimumPrice } from "../../utils/helper";
import { setIsOpenSidebarModal } from "../../features/sidebarModal/sidebarModalSlice";
import {
  getMapSeatsOrientation,
  doUpdateMapSeatsStateProps,
} from "../../features/mapSeats/mapSeatsSlice";
import {
  updateTripLeg,
  updateSelectedTripProperty,
} from "../../features/selectedTrip/selectedTripSlice";
import IconService from "../IconServices/IconService";
import { typeOfSource, typeOfTripDetails } from "../../utils/typeOfSource";
import { origin, destiny } from "../../image/SVG";
import styles from "./TripResult.module.css";
import ContractTabs from "../ContractTabs/ContractTabs";
import { useConvertFormatHours } from "../../hooks/useFormatNormalHours";
import { useCalculateArrivalTime } from "../../hooks/useCalculateArrivalTime";
import { useGetTypeOfBusIcon } from "../../hooks/useGetTypeOfBusIcon";
import { dictionary } from "../../utils/dictionary";

const TripResult = ({
  busServiceId,
  busServiceName,
  estimatedTripHours,
  departureHour,
  departureAgencyId,
  destinationAgencyId,
  webRateClass1,
  webAvailableSeatsClass1,
  webRateClass2,
  webAvailableSeatsClass2,
  webRateClass3,
  webAvailableSeatsClass3,
  webRateFirstClass,
  webAvailableSeatsFirstClass,
  connectingTripId,
  connectingTrips,
  tripKey,
  departureDateTime,
  typeOfTrip,
  departureDate
}) => {
  const dispatch = useDispatch();
  const { tripResult } = dictionary.components;
  const { originAgency, destinationAgency } = useSelector(
    (store) => store.searchTrip
  );
  const [typeOfBusIcon, setTypeOfBusIcon] = useState(null);
  const [isVisibleContractTabs, setIsVisibleContractTabs] = useState(false);
  const [agencies, _] = useState({ originAgency, destinationAgency });

  const { totalPassengers } = useSelector((store) => store.allTrips);

  const rates = [
    {
      typeOfRate: "Class1",
      price: webRateClass1,
      seatsAvailable: webAvailableSeatsClass1,
    },
    {
      typeOfRate: "Class2",
      price: webRateClass2,
      seatsAvailable: webAvailableSeatsClass2,
    },
    {
      typeOfRate: "Class3",
      price: webRateClass3,
      seatsAvailable: webAvailableSeatsClass3,
    },
    {
      typeOfRate: "FirstClass",
      price: webRateFirstClass,
      seatsAvailable: webAvailableSeatsFirstClass,
    },
  ];

  useEffect(() => {
    const busIcon = useGetTypeOfBusIcon(busServiceId);
    busIcon && setTypeOfBusIcon(busIcon);
  }, []);

  const doSendMultipleDispatches = () => {
    dispatch(
      doUpdateMapSeatsStateProps({
        nameProp: "totalPassengers",
        valueProp: totalPassengers,
      })
    );
    dispatch(
      getMapSeatsOrientation({
        MapOrientation: "V",
        outboundOriginAgencyId: departureAgencyId,
        outboundDestinationAgencyId: destinationAgencyId,
        outboundTotalPassengers: totalPassengers,
        outboundTripLegs:
          typeOfTrip === typeOfSource.outboundTrip
            ? [
                {
                  tripKey,
                  connectingTripId,
                  OriginAgencyId: departureAgencyId,
                  DestinationAgencyId: destinationAgencyId,
                },
              ]
            : [],
        returnTotalPassengers: totalPassengers,
        returnTripLegs:
          typeOfTrip === typeOfSource.returnTrip
            ? [
                {
                  tripKey,
                  connectingTripId,
                  OriginAgencyId: departureAgencyId,
                  DestinationAgencyId: destinationAgencyId,
                },
              ]
            : [],
      })
    );
    dispatch(
      updateTripLeg({
        tripKey,
        departureDate: departureDateTime,
        connectingTripId,
        originAgencyId: departureAgencyId,
        destinationAgencyId,
        typeOfTrip,
        connectingTrips,
      })
    );
    dispatch(
      updateSelectedTripProperty({
        nameProp:
          typeOfTrip === typeOfSource.outboundTrip
            ? typeOfTripDetails.outboundDetails
            : typeOfTripDetails.returnDetails,
        valueProp: {
          originAgencyName: originAgency.agencyName,
          destinationAgencyName: destinationAgency.agencyName,
          departureHour,
          busServiceName,
          busServiceId,
          estimatedTripHours,
          departureDateTime,
          departureDate
        },
      })
    );
    dispatch(setIsOpenSidebarModal());
  };

  const handleSubmit = () => {
    doSendMultipleDispatches();
  };
  return (
    <>
      <article className={`${styles.tripItem} ${styles.inDown}`}>
        <div className={styles.tripItemRow}>
          <div className={styles.tripInformation}>
            <div className={styles.tripTimes}>
              <div className={styles.tripDepartureContainer}>
                <div className={styles.tripIcon}>
                  <IconService icon={origin} size="extraSmall" />
                </div>
                <div className={styles.tripDeparture}>
                  <label className={styles.labelTripTimes}>{tripResult.departure}</label>
                  <span className={styles.spanTripTimeHr}>
                    {useConvertFormatHours(departureHour)}
                  </span>
                  <span className={styles.spanTripTimePlace}>
                    {typeOfTrip === typeOfSource.outboundTrip
                      ? agencies.originAgency.agencyName
                      : agencies.destinationAgency.agencyName}
                  </span>
                </div>
              </div>
              <div className={styles.tripEstimated}>
                <span>{`- ${estimatedTripHours}h (${tripResult.estimate}.) -`}</span>
              </div>
              <div className={styles.tripArriveContainer}>
                <div className={styles.tripIcon}>
                  <IconService icon={destiny} size="extraSmall" />
                </div>
                <div className={styles.tripArrive}>
                  <label className={styles.labelTripTimes}>{tripResult.arrive}</label>
                  <span className={styles.spanTripTimeHr}>
                    {useCalculateArrivalTime(departureHour, estimatedTripHours)}
                  </span>
                  <span className={styles.spanTripTimePlace}>
                    {typeOfTrip === typeOfSource.outboundTrip
                      ? agencies.destinationAgency.agencyName
                      : agencies.originAgency.agencyName}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.tripInformationServices}>
            <label>{tripResult.service}</label>
            {typeOfBusIcon ? (
              <IconService icon={typeOfBusIcon} size="medium" />
            ) : (
              <span>{busServiceName}</span>
            )}
          </div>
          <div className={styles.tripPrice}>
            <label className={styles.labelTripPrice}>{tripResult.from}</label>
            <span className={styles.spanTripPrice}>{`$ ${getMinimumPrice(
              rates
            )}`}</span>
          </div>
        </div>
        <div className={`${styles.tripItemRow} ${styles.flexColumnReverse}`}>
          <div className={styles.tripExtraInformation}>
            <button
              className={`btn ${styles.contractButton}`}
              onClick={() => setIsVisibleContractTabs(!isVisibleContractTabs)}
            >
              <div className={styles.contractButtonContentContainer}>
                <span className={styles.titleButtonContract}>
                  {tripResult.informationContractTabs}
                  {isVisibleContractTabs ? (
                    <span className={styles.iconButtonContract}>&#8963;</span>
                  ) : (
                    <span className={StyleSheet.iconButtonContract}>
                      &#8964;
                    </span>
                  )}
                </span>
              </div>
            </button>
          </div>
          <div className={styles.tripButtonSelectSeats}>
            <button
              className={`btn ${styles.tripButton}`}
              onClick={handleSubmit}
            >
              {tripResult.seatSelection}
            </button>
          </div>
        </div>
        <div className={styles.contractTabsContainer}>
          <ContractTabs isVisible={isVisibleContractTabs} />
        </div>
      </article>
    </>
  );
};

export default TripResult;
