import { useGetSearchTripObj } from "../../hooks/useGetSearchTripObj";
import customFetch from "../../utils/axios";
import { urlDictionary } from "../../utils/urlDictionary";
import { updateAllStateSearchTrip } from "../searchTrip/searchTripSlice";
import { updateAvailableTripRequest } from "../allTrips/allTripsSlice";

const setPreSearchQuery = (searchQuery, agenciesDataSource, thunkAPI) => {
  if (
    !searchQuery.origin ||
    !searchQuery.destination ||
    agenciesDataSource?.length === 0
  )
    return;
  const searchTripObj = useGetSearchTripObj(
    agenciesDataSource,
    null,
    searchQuery
  );
  searchTripObj && thunkAPI.dispatch(updateAllStateSearchTrip(searchTripObj));
  searchTripObj &&
    thunkAPI.dispatch(
      updateAvailableTripRequest({
        originAgencyId: searchTripObj.originAgency?.agencyId,
        destinationAgencyId: searchTripObj.destinationAgency?.agencyId,
        outboundTripDate: searchTripObj.departureDate,
        outboundTotalPassengers: searchTripObj.passengers,
        returnTotalPassengers: searchTripObj.passengers,
        returnTripDate: searchTripObj.returnDate,
      })
    );
};

export const getOriginAgenciesThunk = async (searchQuery, thunkAPI) => {
  try {
    const resp = await customFetch.post(urlDictionary.agencyUrlEndpoint, {
      agreementUserId: 0,
    });

    if (parseInt(resp.status) !== 200) throw new Error(resp.statusText);
    setPreSearchQuery(searchQuery, resp.data.data, thunkAPI);

    return resp.data;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(`something went wrong ${error}`);
  }
};
