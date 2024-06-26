import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpen:false,
}

const sidebarModalSlice = createSlice({
    name:"sidebarModal",
    initialState,
    reducers:{
        setIsOpenSidebarModal:(state) => {
            state.isOpen = !state.isOpen;
        }
    }
})

export const {setIsOpenSidebarModal} = sidebarModalSlice.actions;

export default sidebarModalSlice.reducer;