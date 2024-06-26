import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPaymentMethodsThunk} from "./paymentMethodsThunk"

export const getPaymentMethods = createAsyncThunk(
  "paymentMethodsSlice/getPaymentMethods",
  async (_, thunkAPI) => getPaymentMethodsThunk(thunkAPI)
);

const initialState = {
  isLoading: false,
  error:null,
  paymentMethodsData: [],
};

const paymentMethodsSlice = createSlice({
  name: "paymentMethodsSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(getPaymentMethods.pending, (state)=>{
        state.isLoading = true;
    })
    .addCase(getPaymentMethods.fulfilled, (state, {payload}) =>{
        state.isLoading = false;
        state.paymentMethodsData = payload.data;
    })
    .addCase(getPaymentMethods.rejected, (state, action )=>{
        state.isLoading = false;
        state.error = action.error;
        console.error(action.error);
    })
  },
});

export default paymentMethodsSlice.reducer;
