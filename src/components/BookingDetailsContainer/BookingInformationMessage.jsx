import styles from "./BookingDetailsContainer.module.css"
import { dictionary } from "../../utils/dictionary";

const BookingInformationMessage = () => {
  const { bookingDetails } = dictionary.components;
  return (
    <div className={styles.infoContainer}>
      <span>{bookingDetails.infoMsg}</span>
    </div>
  );
};

export default BookingInformationMessage;
