import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dictionary } from "../../utils/dictionary";

import { paymentTitle, payU } from "../../image/SVG";
import styles from "./PaymentMethodContainer.module.css";
import RadioButtonGroup from "../RadioButtonGroup/RadioButtonGroup";
import { updateSelectedTripProperty } from "../../features/selectedTrip/selectedTripSlice";
import { getPaymentMethods } from "../../features/paymentMethods/paymentMethodsSlice";
import IconService from "../IconServices/IconService";
import { useCreatePaymentMethodCollection } from "../../hooks/useCreatePaymentMethodCollection";

const PaymentMethodContainer = () => {
  const dispatch = useDispatch();
  const {payment} = dictionary.components;
  const { paymentMethodsData } = useSelector((store) => store.paymentMethods);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [paymentMethodsCollection, setPaymentMethodsCollection] = useState([]);

  useEffect(() => {
    if (paymentMethodsData?.length > 0) {
      setPaymentMethodsCollection(
        useCreatePaymentMethodCollection(
          paymentMethodsData,
          paymentMethod
        )
      );
    } else {
      dispatch(getPaymentMethods());
    }
  }, [paymentMethodsData, paymentMethod]);

  const handlerOnChange = (e) => {
    const paymentValue = e.target.value;
    if (paymentValue) {
      const selectedPaymentMethod = paymentMethodsData.find(
        (method) => method.meansPayuId === parseInt(paymentValue)
      );

      dispatch(
        updateSelectedTripProperty({
          nameProp: "paymentMethod",
          valueProp: selectedPaymentMethod.paymentMethodId,
        })
      );
      dispatch(
        updateSelectedTripProperty({
          nameProp: "meansPayUName",
          valueProp: selectedPaymentMethod.meansPayuName,
        })
      );

      setPaymentMethod(selectedPaymentMethod.meansPayuId);
    }
  };

  return (
    <>
      <div className={styles.paymentMethodContainer}>
        <div className={styles.titleContainer}>
          <IconService icon={paymentTitle} size="ultraSmall" />
          <label>{payment.paymentMethodTitle}</label>
        </div>
        <div className={styles.bodyPaymentMethod}>
          <div className={styles.labelPayUContainer}>
            <label>{payment.paymentLabel}</label>
            <IconService icon={payU} size="medium" />
          </div>
          <RadioButtonGroup
            collection={paymentMethodsCollection}
            onHandleChange={handlerOnChange}
          />
        </div>
      </div>
    </>
  );
};

export default PaymentMethodContainer;
