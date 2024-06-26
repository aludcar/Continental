import DetailsContainer from "../components/DetailsContainer/DetailsContainer";
import styles from "./Details.module.css";

const Details = () => {
  return (
    <div className="container">
      <div className={styles.detailsPageTitle}>
        <h3>Información de pasajeros</h3>
      </div>
      <DetailsContainer />
    </div>
  );
};

export default Details;
