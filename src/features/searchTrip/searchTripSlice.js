import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  originAgency: null,
  destinationAgency: null,
  departureDate: new Date().toISOString().slice(0, 10),
  returnDate: null,
  passengers: 1,
};

const searchTripSlice = createSlice({
  name: "searchTripSlice",
  initialState,
  reducers: {
    updateSearchTripProperties: (state, { payload: { propName, propValue } }) => {
      state[propName] = propValue;
    },
    updateAllStateSearchTrip:(state, {payload}) =>{
        return{...state, ...payload}
    }
  },
});

export const {updateSearchTripProperties, updateAllStateSearchTrip} = searchTripSlice.actions;
export default searchTripSlice.reducer;
