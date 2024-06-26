import React from "react";
import styles from "./SideBarModal.module.css";
import SeatReservationPanel from "../SeatReservationPanel/SeatReservationPanel";
import ContainerBus from "../BusDraw/ContainerBus";

const BodySideBarModal = () => {
  return (
    <>
      <div className={styles.sidebarModalBody}>
        <SeatReservationPanel />
        <ContainerBus />
      </div>
    </>
  );
};

export default BodySideBarModal;
