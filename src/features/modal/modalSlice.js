import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpenModal:false,
    msg:"",
    typeOfLoader:{
        BusLoader:"busLoader",
        SpinnerLoader:"spinnerLoader"
    }
}

const modalSlice = createSlice({
    name:"modal",
    initialState,
    reducers:{
        openModal:(state, action) => {
            state.isOpenModal = true;
            state.msg = action.payload.msg;
        },
        closeModal: (state) => {
            state.isOpenModal = false;
            state.msg = "";
        }
    }
})

export const {openModal, closeModal} = modalSlice.actions;

export default modalSlice.reducer;