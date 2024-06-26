import { useSetTodayPlus2 } from "./useSetCurrentDatePlusHours";

export const useGetSearchTripObj = (
  agenciesSourceData,
  searchTripObj,
  searchQuery
) => {
  const { origin, destination, roundTrip } = searchQuery;

  if (!origin || !destination) return searchTripObj;

  const originAgency = doGetOriginAgency(agenciesSourceData, origin);
  const destinationAgency = doGetDestinationAgency(originAgency, destination);
  
  if (!originAgency || !destinationAgency) return searchTripObj;

   const baseSearchTripObj = {
    originAgency: {},
    destinationAgency: {},
    departureDate: new Date().toISOString().slice(0, 10),
    //returnDate: searchQuery?.roundTrip > 0 ? useSetCurrentDatePlusHours(Date.now(), 48) : null,
    returnDate: searchQuery?.roundTrip > 0 ? useSetTodayPlus2(2) : null,
    passengers: 1,
  };
  const newSearchTripObj = {
    ...baseSearchTripObj,
    originAgency,
    destinationAgency
  };

  return newSearchTripObj;
};

const doRemoveAccents = (str) => {
  const newStr = str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase();
  return newStr;
};

const doGetOriginAgency = (agenciesSourceData, origin) => {
  const originAgency = agenciesSourceData.find(
    (agency) => agency.agencyName === doRemoveAccents(origin)
  );
  return originAgency;
};

const doGetDestinationAgency = (originAgency, destination) => {
  if (originAgency === null) return null;
  const destinationAgency = originAgency.destinationAgencies.find(
    (agency) => agency.agencyName === doRemoveAccents(destination)
  );
  return destinationAgency;
};
