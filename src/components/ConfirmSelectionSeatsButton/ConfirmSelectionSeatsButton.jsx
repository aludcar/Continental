import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateTripLeg } from "../../features/selectedTrip/selectedTripSlice";
import { setIsOpenSidebarModal } from "../../features/sidebarModal/sidebarModalSlice";
import { dictionary } from "../../utils/dictionary";
import styles from "./ConfirmSelectionSeatsButton.module.css"

const ConfirmSelectionSeatsButton = ({ dataSource }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {confirmSelectionSeatsBtn} = dictionary.components;

  const handleClick = () => {
    if (
      dataSource.hasReturnTrip &&
      dataSource.typeOfSource === "outboundTripLegs"
    ) {
      dispatch(
        updateTripLeg({ isApproved: true, typeOfTrip: "outboundTripLegs" })
      );
      dispatch(setIsOpenSidebarModal());
    } else if (
      dataSource.hasReturnTrip &&
      dataSource.typeOfSource === "returnTripLegs"
    ) {
      dispatch(
        updateTripLeg({ isApproved: true, typeOfTrip: "returnTripLegs" })
      );
      dispatch(setIsOpenSidebarModal());
      navigate("/details");
    } else {
      dispatch(
        updateTripLeg({ isApproved: true, typeOfTrip: "outboundTripLegs" })
      );
      dispatch(setIsOpenSidebarModal());
      navigate("/details");
    }
  };

  return (
    <>
      <button className={`btn ${styles.confirmSelectionButton}`} onClick={handleClick}>{confirmSelectionSeatsBtn.continue}</button>
    </>
  );
};

export default ConfirmSelectionSeatsButton;
