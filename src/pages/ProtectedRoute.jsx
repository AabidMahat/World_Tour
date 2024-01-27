import PropTypes from "prop-types";
import { useAuth } from "../Contexts/FakeAuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
  const { isAuth } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) navigate("/");
  }, [isAuth, navigate]);

  return isAuth ? children : null;
}

ProtectedRoute.propTypes = {
  children: PropTypes.object.isRequired,
};

export default ProtectedRoute;
