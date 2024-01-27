import { createContext, useEffect, useContext, useReducer } from "react";
import PropTypes from "prop-types";

const base_url = "http://localhost:9000";
const CitiesContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };

    case "cities/loaded":
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };

    case "city/loaded":
      return { ...state, isLoading: false, currentCity: action.payload };

    case "cities/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };
    case "cities/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };
    case "rejected":
      return { ...state, isLoading: false, error: action.payload };
  }
}

function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    //fetch data here and call setCities when done.
    async function fetchData() {
      dispatch({ type: "loading" });
      try {
        let response = await fetch(`${base_url}/cities`);
        let data = await response.json();

        dispatch({ type: "cities/loaded", payload: data });
      } catch (err) {
        dispatch({
          type: "rejected",
          payload: "There is error while loading data",
        });
      }
    }

    fetchData();
  }, []);

  async function getCities(id) {
    dispatch({ type: "loading" });
    try {
      let response = await fetch(`${base_url}/cities/${id}`);
      let data = await response.json();

      dispatch({ type: "city/loaded", payload: data });
    } catch (err) {
      dispatch({
        type: "rejected",
        payload: "There is error while loading data",
      });
    }
  }

  async function createCity(newCity) {
    try {
      dispatch({ type: "loading" });

      let response = await fetch(`${base_url}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: { "Content-Type": "application/json" },
      });

      let data = await response.json();

      dispatch({ type: "cities/created", payload: data });
    } catch (err) {
      dispatch({
        type: "rejected",
        payload: "There is error while creating city",
      });
    }
  }
  async function deleteCity(id) {
    try {
      dispatch({ type: "loading" });
      await fetch(`${base_url}/cities/${id}`, {
        method: "DELETE",
      });

      dispatch({ type: "cities/deleted", payload: id });
    } catch (err) {
      dispatch({
        type: "rejected",
        payload: "There is error while deleting city",
      });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        error,
        currentCity,
        getCities,
        createCity,
        deleteCity,
      }}>
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("Cities Context is used outside the Cities Provider");
  return context;
}

CitiesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
// eslint-disable-next-line react-refresh/only-export-components
export { CitiesProvider, useCities };
