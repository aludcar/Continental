import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import FormRow from "../Form/FormRow";
import FormRowSelect from "../Form/FormRowSelect";
import {
  getOriginAgencies,
  updateStateAgencies,
} from "../../features/agencies/agenciesSlice";

import {
  getItemLocalStorageWithExpiry,
  setItemLocalStorageWithExpiry,
} from "../../utils/localStorage";
import SearchContainerSkeleton from "./SearchContainerSkeleton";
import { switchIcon } from "../../image/SVG";
import styles from "./SearchContainer.module.css";
import IconService from "../IconServices/IconService";
import {
  updateAllStateSearchTrip,
  updateSearchTripProperties,
} from "../../features/searchTrip/searchTripSlice";
import { updateAvailableTripRequest } from "../../features/allTrips/allTripsSlice";
import { useGetSearchTripObj } from "../../hooks/useGetSearchTripObj";
import { useSearchParams } from "react-router-dom";
import { dictionary } from "../../utils/dictionary";

const SearchContainer = ({ hasMarginOver = true }) => {
  const dispatch = useDispatch();

  const [queryParams] = useSearchParams();
  const { isLoading, originAgencies } = useSelector((store) => store.agencies);
  const {
    originAgency,
    destinationAgency,
    departureDate,
    returnDate,
    passengers,
  } = useSelector((store) => store.searchTrip);
  const { searchComponent } = dictionary.components;

  const searchQuery = {
    origin: queryParams.get("origin"),
    destination: queryParams.get("destination"),
    roundTrip: queryParams.get("roundTrip"),
  };

  useEffect(() => {
    let searchTripObj = null;
    const originAgenciesSource = JSON.parse(
      getItemLocalStorageWithExpiry("originAgencies")
    );
    const searchTripSource = JSON.parse(
      getItemLocalStorageWithExpiry("searchTrip")
    );

    if (originAgenciesSource?.data?.originAgencies) {
      dispatch(
        updateStateAgencies({
          originAgencies: JSON.parse(originAgenciesSource.data.originAgencies),
        })
      );
      searchTripObj = useGetSearchTripObj(
        JSON.parse(originAgenciesSource.data.originAgencies),
        searchTripSource?.data?.searchTrip
          ? JSON.parse(searchTripSource.data.searchTrip)
          : null,
        searchQuery
      );
      searchTripObj && dispatch(updateAllStateSearchTrip(searchTripObj));
      searchTripObj &&
        dispatch(
          updateAvailableTripRequest({
            originAgencyId: searchTripObj.originAgency?.agencyId,
            destinationAgencyId: searchTripObj.destinationAgency?.agencyId,
            outboundTripDate: searchTripObj.departureDate,
            outboundTotalPassengers: searchTripObj.passengers,
            returnTotalPassengers: searchTripObj.passengers,
            returnTripDate: searchTripObj.returnDate,
          })
        );
    } else {
      dispatch(getOriginAgencies({ searchQuery }));
    }
  }, []);

  const handleOnChange = (e) => {
    const name = e?.target?.name;
    let value = e?.target?.value;

    if (name === "originAgency") {
      const originAgencyEntity = originAgencies.find(
        (agency) => parseInt(agency.agencyId) === parseInt(value)
      );

      dispatch(
        updateSearchTripProperties({
          propName: "originAgency",
          propValue: originAgencyEntity,
        })
      );

      if (destinationAgency) {
        const newDestinationAgencyIdValue =
          parseInt(value) === parseInt(destinationAgency.agencyId)
            ? originAgency.agencyId
            : null;

        const newDestinationAgencyEntity = newDestinationAgencyIdValue
          ? originAgencyEntity.destinationAgencies.find(
              (agency) =>
                parseInt(agency.agencyId) ===
                parseInt(newDestinationAgencyIdValue)
            )
          : originAgencyEntity.destinationAgencies[0];

        dispatch(
          updateSearchTripProperties({
            propName: "destinationAgency",
            propValue: newDestinationAgencyEntity,
          })
        );
      }
    } else if (name === "destinationAgency") {
      const destinationAgencyFound = originAgency.destinationAgencies.find(
        (agency) => parseInt(agency.agencyId) === parseInt(value)
      );
      dispatch(
        updateSearchTripProperties({
          propName: "destinationAgency",
          propValue: destinationAgencyFound,
        })
      );
    }else{
      name && dispatch(
        updateSearchTripProperties({
          propName: name,
          propValue: value,
        })
      );
    }
  };

  const handleOnSubmit = () => {
    if ((!originAgency, !destinationAgency || !departureDate)) {
      toast.error("Por favor diligencia el formulario");
      return;
    }

    setItemLocalStorageWithExpiry("searchTrip", {
      originAgency,
      destinationAgency,
      departureDate,
      returnDate,
      passengers,
    });

    window.open("/search", "_self");
  };

  return (
    <article
      className={`${styles.searchContainer} ${
        hasMarginOver && styles.marginTopOver50
      }`}
    >
      {isLoading ? (
        <SearchContainerSkeleton />
      ) : (
        <>
          <div className={styles.agenciesContainer}>
            <div className={styles.agencyElement}>
              <FormRowSelect
                name="originAgency"
                labelText={searchComponent.origin}
                loadingText={searchComponent.loadingText}
                optionsSource={originAgencies}
                value={originAgency?.agencyId || null}
                handleOnChange={handleOnChange}
                isDisabled={!originAgencies}
                defaultText={searchComponent.defaultOptionOrigin}
              />
            </div>
            <div className={styles.switchAgencies}>
              <IconService icon={switchIcon} size="extraSmall" />
            </div>
            <div className={styles.agencyElement}>
              <FormRowSelect
                name="destinationAgency"
                labelText={searchComponent.destination}
                optionsSource={originAgency?.destinationAgencies || null}
                value={destinationAgency?.agencyId || null}
                handleOnChange={handleOnChange}
                isDisabled={!originAgency}
                defaultText={searchComponent.defaultOptionDestination}
              />
            </div>
          </div>
          <div className={styles.departureDateContainer}>
            <FormRow
              name="departureDate"
              type="date"
              value={departureDate}
              labelText={searchComponent.departureDate}
              handleOnChange={handleOnChange}
            />
          </div>
          <div className={styles.returnDateContainer}>
            <FormRow
              name="returnDate"
              type="date"
              value={returnDate}
              labelText={searchComponent.returnDate}
              handleOnChange={handleOnChange}
            />
          </div>
          <div className={styles.passengersContainer}>
            {" "}
            <FormRowSelect
              name="passengers"
              value={passengers}
              labelText={searchComponent.passengers}
              optionsSource={[...Array(6)].map((_, i) => i + 1)}
              handleOnChange={handleOnChange}
            />
          </div>
          <div className={styles.searchButtonContainer}>
            <button
              type="button"
              className={`btn ${styles.searchButton} `}
              onClick={handleOnSubmit}
            >
              {searchComponent.search}
            </button>
          </div>
        </>
      )}
    </article>
  );
};

export default SearchContainer;
