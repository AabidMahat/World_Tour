// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import countryEmoji from "country-emoji";

import styles from "./Form.module.css";
import Button from "./Button";
// import { useNavigate } from "react-router-dom";
import BackButton from "./BackButton";
import useUrlPosition from "../hooks/useUrlPosition";
import Message from "./Message";
import Toastify from "./Toastify";
import Spinner from "./Spinner";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useCities } from "../Contexts/CitiesContext";
import { useNavigate } from "react-router-dom";

const url = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
  const [cityName, setCityName] = useState("");
  const [lat, lng] = useUrlPosition();
  const [notes, setNotes] = useState("");
  const [date, setDate] = useState(new Date());
  const [isLoadingGeolocation, setIsLoadingGeolocation] = useState(false);
  const [country, setCountry] = useState("");
  const [geoError, setGeoError] = useState("");

  const [emoji, setEmoji] = useState("");

  const { createCity, isLoading } = useCities();

  const navigate = useNavigate();

  useEffect(() => {
    if (!lat && !lng) return;

    async function fetchCityData() {
      try {
        setIsLoadingGeolocation(true);
        setGeoError("");
        const response = await fetch(`${url}?latitude=${lat}&longitude=${lng}`);

        const data = await response.json();

        if (!data.countryCode)
          throw new Error(
            "That doesn't seen to be a city, Click somewhere else 🙃"
          );

        setCityName(data.city || data.locality || "");

        setCountry(data.countryName);

        setIsLoadingGeolocation(false);

        setEmoji(countryEmoji.flag(data.countryCode));
      } catch (e) {
        setGeoError(e.message);
      } finally {
        setIsLoadingGeolocation(false);
      }
    }

    fetchCityData();
  }, [lat, lng]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!cityName || !date) return;

    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat, lng },
    };
    await createCity(newCity);
    navigate("/app/cities");
  }

  if (isLoadingGeolocation) return <Spinner />;

  if (!lat && !lng) return <Message message="Start by clicking on Map" />;

  if (geoError)
    return (
      <>
        <Message message={geoError} />
        <Toastify type="error" msg={geoError} />
      </>
    );

  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={(e) => handleSubmit(e)}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}
        <DatePicker
          id="date"
          onChange={(date) => setDate(date)}
          selected={date}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>

        <BackButton />
      </div>
    </form>
  );
}

export default Form;
