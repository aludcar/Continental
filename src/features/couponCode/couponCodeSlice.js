import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPromoCodeInfoThunk } from "./couponCodeThunk";

const initialState = {
  isLoading: false,
  error: null,
  promoCode: null,
  isPromoCodeValid: false,
  discountPercentage: null,
  discountPrice: null,
  purchaseTotalPrice: null,
  status: null,
  couponCodeMessage: null,
};

export const getPromoCodeInfo = createAsyncThunk(
  "couponCode/getPromoCodeInfo",
  async (promoCode, thunkAPI) => getPromoCodeInfoThunk(promoCode, thunkAPI)
);

const couponCode = createSlice({
  name: "couponCode",
  initialState,
  reducers: {
    updateCouponProperty: (state, { payload }) => {
      const { propName, propValue } = payload;
      state[propName] = propValue;
    },
    resetCouponCodeState: (state)=>{
      return {...initialState}
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPromoCodeInfo.pending, (state) => {
        state.isLoading = true;
        state.couponCodeMessage = null;
      })
      .addCase(getPromoCodeInfo.fulfilled, (state, { payload: { data } }) => {
        const {
          discountPercentage,
          discountPrice,
          purchaseTotalPrice,
          status,
          message,
        } = data;

        if (status) {
          state.isPromoCodeValid = true;
          state.discountPercentage = discountPercentage;
          state.discountPrice = discountPrice;
          state.purchaseTotalPrice = purchaseTotalPrice;
        }
        state.status = status;
        state.couponCodeMessage = message;
      })
      .addCase(getPromoCodeInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
        console.error(action.error);
      });
  },
});

export const { updateCouponProperty, resetCouponCodeState } = couponCode.actions;

export default couponCode.reducer;
