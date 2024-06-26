import PassengersContainer from "../PassengersContainer/PassengersContainer";
import PaymentMethodContainer from "../PaymentMethodContainer/PaymentMethodContainer";
import BookingDetailsContainer from "../BookingDetailsContainer/BookingDetailsContainer";
import CouponContainer from "../CouponContainer/CouponContainer";
import styles from "./DetailsContainer.module.css";
import Form from "../Form/Form";

const DetailsContainer = () => {
  return (
    <>
      <section className={styles.detailsContainer}>
        <div className={styles.passengerPaymentContainer}>
          <Form>
            <PassengersContainer />
            <PaymentMethodContainer />
          </Form>
        </div>
        <div className={styles.resumeContainer}>
          <BookingDetailsContainer isDetailsPage={true} />
          <CouponContainer />
        </div>
      </section>
    </>
  );
};

export default DetailsContainer;
