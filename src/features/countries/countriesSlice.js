import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {getAllCountriesThunk} from "./countriesThunk"

const initialState = {
  isLoading:false,
  countriesData:[]
};

export const getAllCountries = createAsyncThunk(
  "countries/countriesSlice",
  async (_, thunkAPI) => getAllCountriesThunk(thunkAPI)
);

const countriesSlice = createSlice({
  name: "countries",
  initialState,
  reducers: {},
  extraReducers: (builder) =>{
    builder
    .addCase(getAllCountries.pending, (state)=>{
      state.isLoading = true;
    })
    .addCase(getAllCountries.fulfilled, (state,{payload:{data}}) =>{
      state.isLoading = false;
      state.countriesData = data ?? [];
    })
    .addCase(getAllCountries.rejected, (state, {payload}) =>{
      state.isLoading = false;
      console.log(payload);
    })
  },
});

export default countriesSlice.reducer;
