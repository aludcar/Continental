import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import TabCollectionRowSeats from "./TabCollectionRowSeats";
import BeatLoader from "react-spinners/BeatLoader";
import { useSelectDataSourceMapSeats } from "../../hooks/useSelectDataSourceMapSeats";
import { doResetMapSeatsData } from "../../features/mapSeats/mapSeatsSlice";
import { dictionary } from "../../utils/dictionary";
import styles from "./BusDraw.module.css";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const ContainerBus = () => {
  const dispatch = useDispatch();
  const [color, _] = useState("#ee2c35");
  const { mapSeatsData, isLoading } = useSelector((store) => store.mapSeat);
  const { busDraw } = dictionary.components;
  let dataSource = useSelectDataSourceMapSeats(mapSeatsData);

  useEffect(() => {
    return () => dispatch(doResetMapSeatsData());
  }, []);

  return (
    <div className={styles.busContainer}>
      {dataSource.length > 0 && <TabCollectionRowSeats floors={dataSource} />}
      {isLoading && <span>{busDraw.loading}</span>}
      <BeatLoader
        color={color}
        loading={isLoading}
        cssOverride={override}
        size={15}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default ContainerBus;
