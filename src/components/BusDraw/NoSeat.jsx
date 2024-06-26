/* import steeringSVG from "../../image/SVG/steering.svg";
import bathroomSVG from "../../image/SVG/bathroom.svg"; */
import { steering as steeringSVG, bathroom as bathroomSVG  } from "../../image/SVG";
import styles from "./BusDraw.module.css";

const NoSeat = ({ seatData, hasOneDrive = false }) => {
  let classPlace = "";
  let backgroundImage = "";
  switch (seatData.codeBase.toLowerCase()) {
    case "c":
      classPlace = hasOneDrive ? styles.passage : styles.steering;
      backgroundImage = !hasOneDrive && steeringSVG;
      break;
    case "b":
      classPlace = styles.bathroom;
      backgroundImage = bathroomSVG;
      break;
    default:
      classPlace = styles.passage;
      break;
  }
  return (
    <div
      className={classPlace}
      style={{
        backgroundImage: backgroundImage && `url(${backgroundImage})`,
      }}
    ></div>
  );
};

export default NoSeat;
