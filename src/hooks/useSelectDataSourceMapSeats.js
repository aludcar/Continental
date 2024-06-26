export const useSelectDataSourceMapSeats = (mapSeatsData = []) => {
  if (mapSeatsData?.outboundTripLegs?.length)
    return mapSeatsData.outboundTripLegs[0].floors;
  if (mapSeatsData?.returnTripLegs?.length)
    return mapSeatsData.returnTripLegs[0].floors;
  return [];
};
