import CityItem from "./CityItem";
import styles from "./CityList.module.css";
import Message from "./../components/Message";
import { useCities } from "../Contexts/CitiesContext";
import Spinner from "./Spinner";

function CityList() {
  const { cities, isLoading } = useCities();
  if (isLoading) return <Spinner />;
  if (!cities.length)
    return (
      <Message
        message={"Add your first city by clicking on a city on the map"}
      />
    );
  return (
    <div>
      <ul className={styles.cityList}>
        {cities.map((city, i) => (
          <CityItem city={city} key={i} />
        ))}
      </ul>
    </div>
  );
}

export default CityList;
