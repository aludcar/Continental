import { useEffect, useRef } from "react";
import { dictionary } from "../../utils/dictionary";
import { useDispatch, useSelector } from "react-redux";
import { setBookingAndPaymentMethod } from "../../features/selectedTrip/selectedTripSlice";
import { useWebCheckOutPayU } from "../../hooks/useWebCheckOutPayU";
import { openModal, closeModal } from "../../features/modal/modalSlice";
import Modal from "../Modal/Modal";

import styles from "./Form.module.css";
import { toast } from "react-toastify";

const Form = ({ children }) => {
  const dispatch = useDispatch();
  const { formComponent } = dictionary.components;
  const formPayment = useRef(null);
  const {
    purchaseId,
    purchaseTotalPrice,
    passengers,
    meansPayUName,
    errorSelectedTrip,
  } = useSelector((store) => store.selectedTrip);
  const { isOpenModal, typeOfLoader } = useSelector((store) => store.modal);
  const { outboundDetails } = useSelector((store) => store.selectedTrip);

  useEffect(() => {
    isOpenModal && dispatch(closeModal());
  }, []);

  useEffect(() => {
    errorSelectedTrip && isOpenModal && dispatch(closeModal());
  }, [errorSelectedTrip]);

  useEffect(() => {
    if (purchaseId) {
      useWebCheckOutPayU({
        purchaseId,
        purchaseTotalPrice,
        passengers,
        meansPayUName,
        formPayment,
        outboundDetails
      });
    }
  }, [purchaseId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (purchaseId === null) {
      dispatch(
        openModal({
          msg: formComponent.modalMessage,
        })
      );
      dispatch(setBookingAndPaymentMethod());
    }
  };

  return (
    <>
      {isOpenModal && <Modal loader={typeOfLoader.SpinnerLoader} />}
      <form onSubmit={handleSubmit} ref={formPayment}>
        {children}
        <div className={styles.btnContainer}>
          <button className={`btn ${styles.btnPayment} `}>
            {formComponent.paymentButtonTitle}
          </button>
        </div>
      </form>
    </>
  );
};

export default Form;
