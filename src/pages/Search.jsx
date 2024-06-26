import React from "react";
import TripsResultContainer from "../components/TripsResultContainer/TripsResultContainer";
import SearchContainer from "../components/SearchContainer/SearchContainer";
import SideBarModal from "../components/SideBarModal/SideBarModal";
import BookingDetailsContainer from "../components/BookingDetailsContainer/BookingDetailsContainer";
import { useSelector } from "react-redux";

const Search = () => {
  const { isOpen: isSideModalOpen } = useSelector(
    (store) => store.sidebarModal
  );
  return (
    <>
      <div className="container">
        <section>
          <SearchContainer
            hasMarginOver={false}
          />
        </section>
        <section>
          <BookingDetailsContainer isModifiable={true} />
        </section>
        <section>
          <TripsResultContainer />
        </section>
      </div>
      {isSideModalOpen && <SideBarModal isOpen={isSideModalOpen} />}
    </>
  );
};

export default Search;
