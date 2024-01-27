import { createContext, useContext, useReducer } from "react";
import PropTypes from "prop-types";

const initialState = {
  user: null,
  isAuth: false,
};
function reducer(state, action) {
  switch (action.type) {
    case "logIn":
      return { ...state, user: action.payload, isAuth: true };

    case "logOut": {
      return { ...state, user: null, isAuth: false };
    }

    default:
      throw new Error("Unknown Command");
  }
}

const AuthContext = createContext();

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

function AuthProvider({ children }) {
  const [{ user, isAuth }, dispatch] = useReducer(reducer, initialState);

  function logIn(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: "logIn", payload: FAKE_USER });
    }
  }

  function logOut() {
    dispatch({ type: "logOut" });
  }

  return (
    <AuthContext.Provider value={{ user, isAuth, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined)
    throw new Error("Cities Context is used outside the Cities Provider");

  return context;
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// eslint-disable-next-line react-refresh/only-export-components
export { AuthProvider, useAuth };
