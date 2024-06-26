import React from "react";
import {
  air_conditioner,
  individual_screen,
  reclining_chairs,
  multiple_drivers,
  socket_energy,
  tv,
  wifi,
} from "../../image/SVG";
import IconService from "./IconService";
import styles from './IconServices.module.css';

const IconServicesContainer = () => {
  return <div className={styles.iconServicesContainer}>
    <IconService icon={air_conditioner} size="extraSmall"/>
    <IconService icon={individual_screen} size="extraSmall"/>
    <IconService icon={reclining_chairs} size="extraSmall"/>
    <IconService icon={multiple_drivers} size="extraSmall"/>
    <IconService icon={socket_energy} size="extraSmall"/>
    <IconService icon={wifi} size="extraSmall"/>
  </div>;
};

export default IconServicesContainer;
