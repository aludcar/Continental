import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { original } from "immer";
import { useReduceTotalPrice } from "../../hooks/useReduceTotalPrice";
import { typeOfSource, typeOfTripDetails } from "../../utils/typeOfSource";
import { setBookingAndPaymentMethodThunk } from "./selectedTripSliceThunk";

const tripLegsBase = {
  tripKey: null,
  departureDate: null,
  connectingTripId: 0,
  originAgencyId: null,
  destinationAgencyId: null,
  seats: [],
  isActive: false,
  isApproved: false,
  subTotal: 0,
};

const passengerBase = {
  documentTypeId: 1,
  documentNumber: null,
  fullName: "",
  lastName: "",
  contactAddress: "",
  mainPhoneNumber: "",
  otherPhoneNumber: null,
  email: "",
  birthDate: "",
  genderId: "",
  isLeadPassenger: false,
};

const seatBase = {
  documentTypeId: 1,
  documentNumber: null,
  seat: null,
  promotionCode: "",
};

const initialState = {
  isLoading: false,
  maximumPassengers: 6,
  customerDocumentNumber: null,
  CustomerEmail: "",
  TotalPrice: 0,
  customerExpressTravelerCardId: null,
  expressTravelerPointsToUse: null,
  tripOriginAgencyId: null,
  tripDestinationAgencyId: null,
  outboundTripLegs: [
    {
      tripKey: null,
      departureDate: "",
      connectingTripId: 0,
      originAgencyId: null,
      destinationAgencyId: null,
      seats: [],
      isActive: false,
      isApproved: false,
    },
  ],
  returnTripLegs: [
    {
      tripKey: null,
      departureDate: "",
      connectingTripId: 0,
      originAgencyId: null,
      destinationAgencyId: null,
      seats: [],
      isActive: false,
      isApproved: false,
    },
  ],
  passengers: [],
  paymentMethod: null,
  meansPayUName: null,
  outboundDetails: null,
  returnDetails: null,
  errorSelectedTrip: null,
  purchaseId: null,
  purchaseTotalPrice: null,
};

export const setBookingAndPaymentMethod = createAsyncThunk(
  "selectedTrip/setBookingAndPaymentMethod",
  async (_, thunkAPI) => setBookingAndPaymentMethodThunk(thunkAPI)
);

const selectedTripSlice = createSlice({
  name: "trip",
  initialState,
  reducers: {
    updateSelectedTripProperty: (
      state,
      { payload: { nameProp, valueProp } }
    ) => {
      state[nameProp] = valueProp;
    },
    updateTripLeg: (state, { payload }) => {
      const { typeOfTrip, originAgencyId, destinationAgencyId } = payload;
      const newTripLegData = [
        { ...original(state[typeOfTrip])[0], ...payload },
      ];
      state[typeOfTrip] = newTripLegData;
      if (
        typeOfTrip === typeOfSource.outboundTrip &&
        originAgencyId &&
        destinationAgencyId
      ) {
        state.tripOriginAgencyId = originAgencyId;
        state.tripDestinationAgencyId = destinationAgencyId;
      }
    },
    resetTripLeg: (state, { payload }) => {
      const { typeOfTrip } = payload;
      state[typeOfTrip] = [{ ...tripLegsBase }];
      state.TotalPrice = useReduceTotalPrice(
        state.outboundTripLegs[0]?.seats,
        state.returnTripLegs[0]?.seats
      );
      state[
        typeOfTrip === typeOfSource.outboundTrip
          ? typeOfTripDetails.outboundDetails
          : typeOfTripDetails.returnDetails
      ] = null;
    },
    addTripLegSelectedSeat: (state, { payload }) => {
      const { typeOfTrip } = payload;
      const newSeat = { ...seatBase, ...payload, seat: payload.codeBase };
      if (state[typeOfTrip][0].seats?.length < state.maximumPassengers) {
        const newSelectedTripSeats = [
          ...new Set([...state[typeOfTrip][0].seats, newSeat]),
        ];
        state[typeOfTrip][0].seats = newSelectedTripSeats;
        state[typeOfTrip][0].subTotal = useReduceTotalPrice(
          state[typeOfTrip][0]?.seats
        );
        state.TotalPrice = useReduceTotalPrice(
          state.outboundTripLegs[0]?.seats,
          state.returnTripLegs[0]?.seats
        );
        state[
          typeOfTrip === typeOfSource.outboundTrip
            ? typeOfTripDetails.outboundDetails
            : typeOfTripDetails.returnDetails
        ].subTotal = state[typeOfTrip][0].subTotal;
      }
    },
    removeTripLegSelectedSeat: (state, { payload }) => {
      const { typeOfTrip } = payload;
      if (state[typeOfTrip][0].seats.length > 0) {
        const newSelectedTripSeats = original(
          state[typeOfTrip][0].seats
        ).filter((seat) => seat.approvedCode !== payload.approvedCode);
        state[typeOfTrip][0].seats = newSelectedTripSeats;
        state[typeOfTrip][0].subTotal = useReduceTotalPrice(
          state[typeOfTrip][0]?.seats
        );
        state.TotalPrice = useReduceTotalPrice(
          state.outboundTripLegs[0]?.seats,
          state.returnTripLegs[0]?.seats
        );
        state[
          typeOfTrip === typeOfSource.outboundTrip
            ? typeOfTripDetails.outboundDetails
            : typeOfTripDetails.returnDetails
        ].subTotal = state[typeOfTrip][0].subTotal;
      }
    },
    addTripLegPassenger: (state, { payload }) => {
      const { passengerInformation, outboundSeat, returnSeat } = payload;
      const newPassenger = { ...passengerBase, ...passengerInformation };
      const IndexPassenger = state.passengers?.findIndex(
        (passengerItem) =>
          passengerItem.documentNumber === passengerInformation.documentNumber
      );

      if (newPassenger.isLeadPassenger) {
        state.customerDocumentNumber = newPassenger.documentNumber;
        state.CustomerEmail = newPassenger.email;
      }

      if (IndexPassenger !== -1) {
        state.passengers[IndexPassenger] = {
          ...original(state.passengers)[IndexPassenger],
          ...newPassenger,
        };
      } else {
        state.passengers = [...original(state.passengers), newPassenger];
      }

      if (outboundSeat && outboundSeat !== 0) {
        state.outboundTripLegs[0].seats.forEach((seat) => {
          if (seat.approvedCode === outboundSeat) {
            seat.documentTypeId = newPassenger.documentTypeId;
            seat.documentNumber = newPassenger.documentNumber;
          }
        });
      }

      if (returnSeat && returnSeat !== 0) {
        state.returnTripLegs[0].seats.forEach((seat) => {
          if (seat.approvedCode === returnSeat) {
            seat.documentTypeId = newPassenger.documentTypeId;
            seat.documentNumber = newPassenger.documentNumber;
          }
        });
      }
    },
    addPromoCodeToSeats: (state, { payload }) => {
      const { promoCode } = payload;
      if (promoCode) {
        state.outboundTripLegs[0].seats = state.outboundTripLegs[0].seats?.map(
          (seat) => {
            return { ...seat, promotionCode: promoCode };
          }
        );
        state.returnTripLegs[0].seats = state.returnTripLegs[0].seats?.map(
          (seat) => {
            return { ...seat, promotionCode: promoCode };
          }
        );
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setBookingAndPaymentMethod.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(setBookingAndPaymentMethod.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.purchaseId = payload.data.purchaseId;
        state.purchaseTotalPrice = payload.data.purchaseTotalPrice;
      })
      .addCase(setBookingAndPaymentMethod.rejected, (state, action) => {
        state.isLoading = false;
        state.errorSelectedTrip = action.error;
        console.error(action.error);
      });
  },
});

export const {
  updateSelectedTripProperty,
  updateTripLeg,
  resetTripLeg,
  addTripLegSelectedSeat,
  removeTripLegSelectedSeat,
  addTripLegPassenger,
  addPromoCodeToSeats,
} = selectedTripSlice.actions;

export default selectedTripSlice.reducer;
