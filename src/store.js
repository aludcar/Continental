import { configureStore } from "@reduxjs/toolkit";
import agenciesSlice from "./features/agencies/agenciesSlice";
import modalSlice from "./features/modal/modalSlice";
import allTripsSlice from "./features/allTrips/allTripsSlice";
import selectedTripSlice from "./features/selectedTrip/selectedTripSlice";
import mapSeatsSlice from "./features/mapSeats/mapSeatsSlice";
import sidebarModalSlice from "./features/sidebarModal/sidebarModalSlice";
import countriesSlice from "./features/countries/countriesSlice"
import documentTypesSlice from "./features/documentTypes/documentTypesSlice";
import searchTripSlice from "./features/searchTrip/searchTripSlice";
import paymentMethodsSlice from "./features/paymentMethods/paymentMethodsSlice";
import couponCodeSlice from "./features/couponCode/couponCodeSlice";

export const store = configureStore({
    reducer:{
        agencies: agenciesSlice,
        modal:modalSlice,
        sidebarModal: sidebarModalSlice,
        allTrips:allTripsSlice,
        selectedTrip:selectedTripSlice,
        mapSeat:mapSeatsSlice,
        documentTypes:documentTypesSlice,
        countries:countriesSlice,
        searchTrip:searchTripSlice,
        paymentMethods:paymentMethodsSlice,
        couponCode:couponCodeSlice
    }
})