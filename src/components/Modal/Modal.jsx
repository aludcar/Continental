import React from "react";
import { useSelector } from "react-redux";
import BusLoader from "../Loaders/BusLoader";
import SpinnerLoader from "../Loaders/SpinnerLoader";

import style from "./Modal.module.css";

const Modal = ({ loader }) => {
  const { msg, typeOfLoader } = useSelector((state) => state.modal);
  return (
    <aside className={style.modalContainer}>
      <div className={style.modalCustom}>
        <div className={style.messageContainer}>
          <span>{msg}</span>
        </div>
        <div className={style.loaderContainer}>
          {loader === typeOfLoader.BusLoader ? (
            <BusLoader />
          ) : (
            <SpinnerLoader />
          )}
        </div>
      </div>
    </aside>
  );
};

export default Modal;
