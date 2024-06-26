import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { original } from "immer";
import { getAvailableTripsThunk } from "./allTripsThunk";

const initialState = {
  isLoading: false,
  availableTripRequest: {
    agreementUserId: 0,
    originAgencyId: null,
    destinationAgencyId: null,
    outboundTripDate: null,
    outboundTotalPassengers: 1,
    outboundTimeOfDay: 0,
    returnTripDate: null,
    returnTotalPassengers: 1,
    returnTimeOfDay: 0,
    GetAvailableTripsFull: true,
  },
  tripsAvailableSource: [],
  outboundTrips: [],
  returnTrips: [],
  error: "",
  totalPassengers: 1,
};

export const getAvailableTrips = createAsyncThunk(
  "trips/getAvailableTrips",
  async (_,thunkAPI) =>
    getAvailableTripsThunk(thunkAPI)
);

const allTripsSlice = createSlice({
  name: "trips",
  initialState,
  reducers: {
    updateAvailableTripRequest: (state, { payload }) => {
      state.availableTripRequest = {
        ...original(state.availableTripRequest),
        ...payload,
      };
    },
    updateAllTripsStateProps: (state, {payload:{nameProp, valueProp}}) => {
      state[nameProp] = valueProp;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAvailableTrips.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAvailableTrips.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tripsAvailableSource = action.payload.data ?? [];
        const { outboundTrips, returnTrips } = state.tripsAvailableSource;

        state.outboundTrips = outboundTrips ?? [];
        state.returnTrips = returnTrips ?? [];
      })
      .addCase(getAvailableTrips.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      });
  },
});

export const { updateAvailableTripRequest, updateAllTripsStateProps } = allTripsSlice.actions;

export default allTripsSlice.reducer;
