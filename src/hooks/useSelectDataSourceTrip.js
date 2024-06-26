import { typeOfSource } from "../utils/typeOfSource";
export const useSelectDataSourceTrip = (
  outboundTripsDataSource,
  returnTripsDataSource,
  outboundTripLeg,
  returnTripLeg
) => {
  const dataSource = {
    source: [],
    typeOfSource: "",
    selectedSeats: [],
    hasReturnTrip: true,
  };

  if (!returnTripsDataSource.length) {
    dataSource.source = setSource(outboundTripsDataSource);
    dataSource.selectedSeats = outboundTripLeg[0].seats;
    dataSource.typeOfSource = typeOfSource.outboundTrip;
    dataSource.hasReturnTrip = false;
  }
  if (!outboundTripLeg[0].isApproved && !returnTripLeg[0].isApproved) {
    dataSource.source = setSource(outboundTripsDataSource);
    dataSource.selectedSeats = outboundTripLeg[0].seats;
    dataSource.typeOfSource = typeOfSource.outboundTrip;
  }
  if (outboundTripLeg[0].isApproved && !returnTripLeg[0].isApproved) {
    dataSource.source = setSource(returnTripsDataSource);
    dataSource.selectedSeats = returnTripLeg[0].seats;
    dataSource.typeOfSource = typeOfSource.returnTrip;
  }

  return dataSource;
};

const setSource = (dataSource) =>{
  const newSource = dataSource.filter(trip => parseInt(trip.carrierId) === 2);
  return newSource;
}
