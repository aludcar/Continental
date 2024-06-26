import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getMapSeatsOrientationThunk } from "./mapSeatsThunk";

const initialState = {
  isLoading: false,
  totalPassengers: 0,
  mapSeatsData: {},
  request: {
    MapOrientation: "V",
    outboundOriginAgencyId: null,
    outboundDestinationAgencyId: null,
    outboundTotalPassengers: 1,
    outboundTripLegs: [
      {
        tripKey: null,
        ConnectingTripId: 0,
        OriginAgencyId: null,
        DestinationAgencyId: null,
      },
    ],
    returnTotalPassengers: 0,
    returnTripLegs: null,
  },
};

export const getMapSeatsOrientation = createAsyncThunk(
  "mapSeats/getMapSeatsOrientation",
  async (data, thunkAPI) => getMapSeatsOrientationThunk(data, thunkAPI)
);

const doPreSelectionSeats = (tripLegs, totalPassengers = 0) => {
  if (!tripLegs?.outboundTripLegs?.length && !tripLegs?.returnTripLegs?.length)
    return tripLegs;
  let counterSelectedSeats = 0;
  const newTripLegs = tripLegs;
  (
    (newTripLegs.outboundTripLegs.length && newTripLegs.outboundTripLegs) ||
    (newTripLegs.returnTripLegs.length && newTripLegs.returnTripLegs) ||
    []
  ).map((trip) =>
    trip.floors.map((floor) =>
      floor.floorItems.map((floorItem) =>
        floorItem.map((seat) => {
          if (
            counterSelectedSeats < totalPassengers &&
            seat.typeCode.toLowerCase() === "s" &&
            seat.seatApprovedStatus.toLowerCase() === "l"
          ) {
            
            seat["isPreSelected"] = true;
            counterSelectedSeats++;
          }
        })
      )
    )
  );
  return newTripLegs;
};

const mapSeatsSlice = createSlice({
  name: "mapSeats",
  initialState,
  reducers: {
    doUpdateMapSeatsStateProps: (state, { payload: { nameProp, valueProp } }) => {
      state[nameProp] = valueProp;
    },
    doResetMapSeatsData: (state) => {
      state.mapSeatsData = {}
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMapSeatsOrientation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMapSeatsOrientation.fulfilled, (state, { payload }) => {
        if (payload?.data) {
          state.mapSeatsData =
            doPreSelectionSeats(payload.data, state.totalPassengers) ?? {};
          state.isLoading = false;
        }
      })
      .addCase(getMapSeatsOrientation.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      });
  },
});

export const { doUpdateMapSeatsStateProps, doResetMapSeatsData } = mapSeatsSlice.actions;

export default mapSeatsSlice.reducer;
