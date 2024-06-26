import React, { useState } from "react";
import CollectionRowSeats from "./CollectionRowSeats";
import { dictionary } from "../../utils/dictionary";
import styles from "./BusDraw.module.css";

const TabCollectionRowSeats = ({ floors }) => {
  const [activeTab, setActiveTab] = useState(floors[0].floorNumber ?? null);
  const { busDraw } = dictionary.components;
  return (
    <>
      {floors.length > 1 && (
        <div className={styles.containerTab}>
          {floors?.map(({ floorNumber }) => (
            <span
              className={`${styles.levelTab} ${
                floorNumber === activeTab && styles.activeTab
              }`}
              onClick={() => setActiveTab(floorNumber)}
            >{`${busDraw.floor} #${floorNumber} `}</span>
          ))}
        </div>
      )}

      <div className={styles.containerTabCollectionSeats}>
        {activeTab &&
          floors?.map((floor) => {
            if (floor.floorNumber === activeTab) {
              return <CollectionRowSeats floorItems={floor.floorItems} />;
            }
          })}
      </div>
    </>
  );
};

export default TabCollectionRowSeats;
