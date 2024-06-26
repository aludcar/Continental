import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getOriginAgenciesThunk } from "./agenciesThunk";
import { setItemLocalStorageWithExpiry } from "../../utils/localStorage";

const initialState = {
  isLoading: false,
  originAgencies: [],
  originAgencyID: null,
  originAgency: {},
  isDisabledOrigin: true,
  destinationAgencies: [],
  destinationAgencyID: null,
  destinationAgency: {},
  isDisabledDestination: true,
  departureDate: new Date().toISOString().slice(0, 10),
  returnDate: "",
  passengers: 1,
};

export const getOriginAgencies = createAsyncThunk(
  "agencies/getOriginAgencies",
  async ({searchQuery}, thunkAPI) => getOriginAgenciesThunk(searchQuery, thunkAPI)
);

const agenciesSlice = createSlice({
  name: "agencies",
  initialState,
  reducers: {
    updateStateAgencies: (state, { payload: { originAgencies } }) => {
      state.originAgencies = originAgencies;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOriginAgencies.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOriginAgencies.fulfilled, (state, { payload: { data } }) => {
        state.isLoading = false;
        state.originAgencies = data;
        state.isDisabledOrigin = !data?.length;
        data?.length && setItemLocalStorageWithExpiry("originAgencies", data);
      })
      .addCase(getOriginAgencies.rejected, (state, { payload }) => {
        state.error = payload;
        console.log({ agenciesError: payload });
      });
  },
});

export const { updateStateAgencies } =
  agenciesSlice.actions;

export default agenciesSlice.reducer;
