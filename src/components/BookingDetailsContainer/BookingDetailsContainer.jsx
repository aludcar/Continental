import { useSelector } from "react-redux";
import styles from "./BookingDetailsContainer.module.css";
import BookingPrice from "./BookingPrice";
import BookingDetails from "./BookingDetails";
import BookingDetailsModifiable from "./BookingDetailsModifiable";
import { dictionary } from "../../utils/dictionary";
import BookingInformationMessage from "./BookingInformationMessage";

const BookingDetailsContainer = ({ isModifiable, isDetailsPage }) => {
  const { bookingDetails } = dictionary.components;
  const {
    outboundDetails,
    returnDetails,
    outboundTripLegs,
    returnTripLegs,
    TotalPrice,
  } = useSelector((store) => store.selectedTrip);

  return (
    <>
      {((outboundTripLegs[0].isApproved && !returnTripLegs[0].isApproved) ||
        isDetailsPage) && (
        <>
          <article className={styles.bookingDetailsContainer}>
            <div className={styles.bookingTitleContainer}>
              <label>{bookingDetails.tripSummary}</label>
            </div>
            <div className={styles.bodyBookingDetails}>
              {outboundTripLegs[0].isApproved && outboundDetails !== null && (
                <>
                  {isModifiable ? (
                    <BookingDetailsModifiable
                      title={bookingDetails.departureService}
                      dataSource={outboundDetails}
                    />
                  ) : (
                    <BookingDetails
                      title={bookingDetails.departureService}
                      dataSource={outboundDetails}
                    />
                  )}
                </>
              )}
              {returnTripLegs[0].isApproved && returnDetails !== null && (
                <BookingDetails
                  title={bookingDetails.returnService}
                  dataSource={returnDetails}
                  isReturnTrip={true}
                />
              )}
              {!isModifiable && (
                <>
                  <BookingPrice totalPrice={TotalPrice} />
                  <BookingInformationMessage />
                </>
              )}
            </div>
          </article>
        </>
      )}
    </>
  );
};

export default BookingDetailsContainer;
