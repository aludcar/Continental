import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { typeOfSource } from "../../utils/typeOfSource";
import IconService from "../IconServices/IconService";
import styles from "./SideBarModal.module.css";
import { useGetTypeOfBusIcon } from "../../hooks/useGetTypeOfBusIcon";
import { dictionary } from "../../utils/dictionary";
import { useConvertFormatHours } from "../../hooks/useFormatNormalHours";

const HeaderSideBarModal = ({ dataSource, handleClose }) => {
  const [currentTripDetails, setCurrentTripDetails] = useState({});
  const { outboundDetails, returnDetails } = useSelector(
    (store) => store.selectedTrip
  );
  const {sidebarHeader} = dictionary.components;

  useEffect(() => {
    const newCurrentTripDetails =
      dataSource.typeOfSource === typeOfSource.outboundTrip
        ? outboundDetails
        : returnDetails;

    const busIcon = useGetTypeOfBusIcon(newCurrentTripDetails.busServiceId);
    busIcon &&
      setCurrentTripDetails({ ...newCurrentTripDetails, icon: busIcon });
  }, []);

  return (
    <>
      <div className={styles.sidebarModalHeader}>
        <div className={styles.iconHeaderContainer}>
          <label>{sidebarHeader.service}</label>
          <IconService icon={currentTripDetails.icon} />
        </div>
        <div className={styles.infoHeaderContainer}>
          <div className={styles.infoInnerColumn}>
            <label className={styles.labelTripTimes}>{sidebarHeader.departure}</label>
            <span className={styles.spanTripTimeHr}>
              {useConvertFormatHours(currentTripDetails.departureHour)}
            </span>
            <span className={styles.spanTripTimePlace}>
              {dataSource.typeOfSource === typeOfSource.outboundTrip
                ? currentTripDetails.originAgencyName
                : currentTripDetails.destinationAgencyName}
            </span>
          </div>
          <div className={styles.infoInnerColumn}>
            <label className={styles.labelTripTimes}>{sidebarHeader.arrive}</label>
            <span className={styles.spanTripTimeHr}>
              {`${currentTripDetails.estimatedTripHours} ${sidebarHeader.horas}`}
            </span>
            <span className={styles.spanTripTimePlace}>
              {dataSource.typeOfSource === typeOfSource.outboundTrip
                ? currentTripDetails.destinationAgencyName
                : currentTripDetails.originAgencyName}
            </span>
          </div>
        </div>
        <div className={styles.buttonCloseHeaderContainer}>
          <span className={styles.close} onClick={handleClose}>
            &times;
          </span>
        </div>
      </div>
    </>
  );
};

export default HeaderSideBarModal;
