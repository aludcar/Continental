import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import FormRow from "../Form/FormRow";
import FormRowSelect from "../Form/FormRowSelect";
import { dictionary } from "../../utils/dictionary";

import { addTripLegPassenger } from "../../features/selectedTrip/selectedTripSlice";
import { toast } from "react-toastify";
import { useValidateDuplicates } from "../../hooks/useValidateDuplicates";
import IconService from "../IconServices/IconService";
import { passenger, leadPassenger } from "../../image/SVG";
import styles from "./Passenger.module.css";

const Passenger = ({
  isLeadPassenger = false,
  countriesSource,
  documentTypesSource,
  outboundSeat,
  returnSeat,
  index,
  id,
}) => {
  const dispatch = useDispatch();
  const { passengerComponent} = dictionary.components;
  const [passengerInformation, setPassengerInformation] = useState({
    fullName: "",
    lastName: "",
    documentTypeId: null,
    documentNumber: null,
    birthDate: "",
    passengerResidentCountry: null,
    passengerNationality: null,
    contactAddress: "",
    mainPhoneNumber: "",
    email: "",
    genderId: null,
    isLeadPassenger,
  });

  const {
    fullName,
    lastName,
    documentTypeId,
    documentNumber,
    birthDate,
    passengerResidentCountry,
    passengerNationality,
    contactAddress,
    mainPhoneNumber,
    email,
    genderId,
  } = passengerInformation;

  const doValidateAllFields = () => {
    let result = true;
    Object.entries(passengerInformation).forEach(([name, value]) => {
      if (!value || value === "") {
        name !== "isLeadPassenger" && (result = false);
        return;
      }
    });

    return result;
  };

  useEffect(() => {
    if (doValidateAllFields()) {
      dispatch(
        addTripLegPassenger({ passengerInformation, outboundSeat, returnSeat })
      );
    }
  }, [passengerInformation]);

  const handleOnChange = (e) => {
    const name = e?.target?.name;
    let value = e?.target?.value ?? "";

    if (name === "documentNumber") {
      const sourceInputDuplicate = [
        ...document.querySelectorAll(`input[name="${name}"]`),
      ];
      if (useValidateDuplicates(sourceInputDuplicate, value)) {
        toast.error(`El número de documento ya esta siendo utilizado.`);
        value = "";
      }
    }

    name && setPassengerInformation({ ...passengerInformation, [name]: value });
  };

  return (
    <div className={styles.passengerItem}>
      <article>
        <div className={styles.headerPassengerItem}>
          <div className={styles.titlePassengerItem}>
            <IconService
              icon={isLeadPassenger ? leadPassenger : passenger}
              size="ultraSmall"
            />
            <label>{`${passengerComponent.passengerTitle} ${
              isLeadPassenger ? passengerComponent.leadPassengerTitle : index
            }`}</label>
          </div>
          <div className={styles.tripTypePassengerItem}>
            <>
              {outboundSeat !== 0 && outboundSeat !== null && (
                <div className={styles.tripTitleContainer}>
                  <div className={styles.tripTypeTitle}>
                    <span>
                      {`${passengerComponent.departurePassengerTitle.toUpperCase()} | `}
                    </span>
                  </div>
                  <div className={styles.tripSeatTitle}>
                    <span>{` ${passengerComponent.seatPassengerTitle} - ${outboundSeat} `}</span>
                  </div>
                </div>
              )}

              {returnSeat !== 0 && returnSeat !== null && (
                <div className={styles.tripTitleContainer}>
                  <div className={styles.tripTypeTitle}>
                    <span>
                      {`${passengerComponent.returnPassengerTitle.toUpperCase()} | `}
                    </span>
                  </div>
                  <div className={styles.tripSeatTitle}>
                    <span>{` ${passengerComponent.seatPassengerTitle} - ${returnSeat} `}</span>
                  </div>
                </div>
              )}
            </>
          </div>
        </div>
        <div className={styles.bodyPassengerItem} id={id}>
          <div className={styles.passengerRow}>
            <FormRow
              type="text"
              labelText="Nombre"
              name="fullName"
              value={fullName}
              require={true}
              handleOnChange={handleOnChange}
            />
            <FormRow
              type="text"
              labelText="Apellido"
              name="lastName"
              value={lastName}
              require={true}
              handleOnChange={handleOnChange}
            />
          </div>
          <div className={styles.passengerRow}>
            <FormRowSelect
              labelText={passengerComponent.documentTypePassengerTitle}
              optionsSource={documentTypesSource}
              defaultText="Selecciona"
              require={true}
              handleOnChange={handleOnChange}
              name="documentTypeId"
              value={documentTypeId}
            />
            <FormRow
              type="text"
              labelText={passengerComponent.documentNumberPassengerTitle}
              name="documentNumber"
              value={documentNumber}
              require={true}
              handleOnChange={handleOnChange}
              maxLength="10"
              minLength="6"
            />
            <FormRow
              type="date"
              labelText={passengerComponent.birthdayPassengerTitle}
              name="birthDate"
              value={birthDate}
              require={true}
              handleOnChange={handleOnChange}
            />
          </div>
          <div className={styles.passengerRow}>
            <FormRowSelect
              name="passengerResidentCountry"
              value={passengerResidentCountry}
              labelText={passengerComponent.residenceCountryPassengerTitle}
              optionsSource={countriesSource}
              defaultText="Selecciona"
              require={true}
              handleOnChange={handleOnChange}
            />
            <FormRowSelect
              name="passengerNationality"
              value={passengerNationality}
              labelText={passengerComponent.nationalityPassengerTitle}
              optionsSource={countriesSource}
              defaultText="Selecciona"
              require={true}
              handleOnChange={handleOnChange}
            />
            <FormRow
              name="contactAddress"
              value={contactAddress}
              type="text"
              labelText={passengerComponent.addressPassengerTitle}
              require={true}
              handleOnChange={handleOnChange}
            />
          </div>
          <div className={styles.passengerRow}>
            <FormRow
              name="mainPhoneNumber"
              value={mainPhoneNumber}
              type="tel"
              labelText={passengerComponent.telephoneNumberPassengerTitle}
              require={true}
              handleOnChange={handleOnChange}
              minLength="7"
            />
            <FormRow
              name="email"
              value={email}
              type="email"
              labelText={passengerComponent.emailPassengerTitle}
              require={true}
              handleOnChange={handleOnChange}
              pattern=""
            />
            <FormRowSelect
              labelText={passengerComponent.genrePassengerTitle}
              optionsSource={[
                { gender: "Masculino", genderId: "M" },
                { gender: "Femenino", genderId: "F" },
              ]}
              defaultText={passengerComponent.genrePassengerTitle}
              require={true}
              handleOnChange={handleOnChange}
              name="genderId"
              value={genderId}
            />
          </div>
        </div>
      </article>
    </div>
  );
};

export default Passenger;