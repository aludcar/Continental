import React from "react";
import Seat from "./Seat";
import NoSeat from "./NoSeat";

const RowSeats = ({ seats }) => {
  return (
    <>
      <li>
        {seats.map((seat, i) => (
          <>
            {seat.typeCode.toLowerCase() !== "s" ? (
              <NoSeat key={i} seatData={seat} hasOneDrive={seat.typeCode.toLowerCase() === "c" && seat.column !== 1 && true} />
            ) : (
              <Seat key={i} seatData={seat} />
            )}
          </>
        ))}
      </li>
    </>
  );
};

export default RowSeats;
