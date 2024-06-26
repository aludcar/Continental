import React from "react";
import stylesTripResult from "../TripResult/TripResult.module.css";
import stylesSkeleton from "./TripsResultContainer.module.css";

const TripsResultContainerSkeleton = () => {
  return (
    <>
      <span>Buscando Rutas...</span>
      {[...new Array(4)].map(() => (
        <article
          className={`${stylesTripResult.tripItem} ${stylesTripResult.inDown}`}
        >
          <div className={stylesTripResult.tripItemRow}>
            <div className={stylesTripResult.tripInformation}>
              <div className={stylesTripResult.tripTimes}>
                <input
                  type="text"
                  className={stylesSkeleton.form_select_skeleton}
                />
                <input
                  type="text"
                  className={stylesSkeleton.form_select_skeleton}
                />
                <input
                  type="text"
                  className={stylesSkeleton.form_select_skeleton}
                />
              </div>
            </div>
            <div className={stylesTripResult.tripInformationServices}>
              <input
                type="text"
                className={stylesSkeleton.form_select_skeleton}
              />
            </div>
            <div className={stylesTripResult.tripPrice}>
              <input
                type="text"
                className={stylesSkeleton.form_select_skeleton}
              />
            </div>
          </div>
          <div
            className={`${stylesTripResult.tripItemRow} ${stylesTripResult.flexColumnReverse}`}
          >
            <div className={stylesTripResult.tripExtraInformation}>
              <input
                type="text"
                className={stylesSkeleton.form_select_skeleton}
              />
            </div>
            <div className={stylesTripResult.tripButtonSelectSeats}>
              <input
                type="text"
                className={stylesSkeleton.form_select_skeleton}
              />
            </div>
          </div>
        </article>
      ))}
    </>
  );
};

export default TripsResultContainerSkeleton;
