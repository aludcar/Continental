import RowSeats from "./RowSeats";
import { cabin } from "../../image/SVG";
import styles from "./BusDraw.module.css";
const CollectionRowSeats = ({ floorItems }) => {
  return (
    <>
      <div
        className={styles.cabin}
        style={{
          background: `url(${cabin}) no-repeat center center`,
        }}
      ></div>
      <ul className={styles.bus}>
        {floorItems?.map((seats, i) => (
          <RowSeats key={i} seats={seats} />
        ))}
      </ul>
    </>
  );
};

export default CollectionRowSeats;
