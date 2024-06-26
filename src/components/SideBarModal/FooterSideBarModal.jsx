import React from "react";
import TotalSeatSelectionPanel from "../TotalSeatSelectionPanel/TotalSeatSelectionPanel";
import styles from "./SideBarModal.module.css"

const FooterSideBarModal = () => {
  return (
    <>
      <div className={styles.sidebarModalFooter}>
        <TotalSeatSelectionPanel />
      </div>
    </>
  );
};

export default FooterSideBarModal;
