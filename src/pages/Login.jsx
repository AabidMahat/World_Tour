// import PageNav from "../components/PageNav";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { useEffect } from "react";
import { useState } from "react";
import { useAuth } from "../Contexts/FakeAuthContext";
import Toastify from "../components/Toastify";

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const { logIn, isAuth } = useAuth();

  function handleSubmit(e) {
    e.preventDefault();

    if (email && password) {
      logIn(email, password);
      setError(true);
    }

    setTimeout(() => {
      setError(false);
    }, 6000);
  }
  useEffect(() => {
    isAuth &&
      navigate("/app/cities", {
        replace: true,
      });
  }, [isAuth, navigate]);

  return (
    <section className={`${styles.container}`}>
      {error && <Toastify type="error" msg="Invalid Username or Password" />}

      <div className={`${styles.loginContainer}`}>
        <div className={`${styles.circle} ${styles.circleOne}`}></div>
        <div className={`${styles.formContainer}`}>
          <img
            src="https://raw.githubusercontent.com/hicodersofficial/glassmorphism-login-form/master/assets/illustration.png"
            alt="illustration"
            className={`${styles.illustration}`}
          />
          <h1 className={`${styles.opacity} ${styles.heading}`}>LOGIN</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`${styles.opacity} ${styles.input}`}
            />
            <input
              type="password"
              placeholder="PASSWORD"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`${styles.opacity} ${styles.input}`}
            />
            <button className={`${styles.opacity} ${styles.button}`}>
              SUBMIT
            </button>
          </form>
          <div className={`${styles.opacity} ${styles.registerForget}`}>
            <Link to="/" className={`${styles.opacity} ${styles.link}`}>
              <h2>Home</h2>
            </Link>
            <h3 className={`${styles.forgotPassword}`}>FORGOT PASSWORD</h3>
          </div>
        </div>
        <div className={`${styles.circle} ${styles.circleTwo}`}></div>
      </div>
      <div className={`${styles.themeBtnContainer} ${styles.themeBtn}`}></div>
    </section>
  );
}
