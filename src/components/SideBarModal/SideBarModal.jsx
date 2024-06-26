import { useSelector, useDispatch } from "react-redux";
import { setIsOpenSidebarModal } from "../../features/sidebarModal/sidebarModalSlice";
import styles from "./SideBarModal.module.css";
import { useSelectDataSourceTrip } from "../../hooks/useSelectDataSourceTrip";
import { resetTripLeg } from "../../features/selectedTrip/selectedTripSlice";
import HeaderSideBarModal from "./HeaderSideBarModal";
import FooterSideBarModal from "./FooterSideBarModal";
import BodySideBarModal from "./BodySideBarModal";
import { useEffect } from "react";
import { useSetOverFlow } from "../../hooks/useSetOverFlow";

const SideBarModal = ({isOpen = false}) => {
  const dispatch = useDispatch();

  const { outboundTripLegs, returnTripLegs } = useSelector(
    (store) => store.selectedTrip
  );
  const { outboundTrips: outboundTripsSource, returnTrips: returnTripsSource } =
    useSelector((store) => store.allTrips);

  const dataSource = useSelectDataSourceTrip(
    outboundTripsSource,
    returnTripsSource,
    outboundTripLegs,
    returnTripLegs
  );

  useEffect(()=>{
    useSetOverFlow(isOpen);
    return () => useSetOverFlow(false);
  },[isOpen])

  const handleClose = () => {
    dispatch(setIsOpenSidebarModal());
    dispatch(resetTripLeg({ typeOfTrip: dataSource.typeOfSource }));
  };

  return (
    <>
        <div className={styles.sidebarModal}>
          <div className={`${styles.sidebarModalContent}`}>
            <HeaderSideBarModal
              dataSource={dataSource}
              handleClose={handleClose}
            />
            <BodySideBarModal />
            <FooterSideBarModal />
          </div>
        </div>
    </>
  );
};

export default SideBarModal;
