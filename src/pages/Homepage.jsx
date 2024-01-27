import { Link } from "react-router-dom";
import styles from "./Homepage.module.css";
import { Vortex } from "react-loader-spinner";
import PageNav from "../components/PageNav";
import { useAuth } from "../Contexts/FakeAuthContext";

const styleContainer = {
  position: "absolute",
  bottom: "-8%",
  left: "8%",
  transform: "translate(-50%, -50%)",
};
export default function Homepage() {
  const { isAuth } = useAuth();
  return (
    <main className={styles.homepage}>
      <PageNav />
      <section>
        <h1>
          You travel the world.
          <br />
          WorldWise keeps track of your adventures.
        </h1>
        <h2>
          A world map that tracks your footsteps into every city you can think
          of. Never forget your wonderful experiences, and show your friends how
          you have wandered the world.
        </h2>
        <Link to={`${isAuth ? "/app" : "/login"}`} className="cta">
          Start Tracking Now
        </Link>
      </section>
      <div style={styleContainer}>
        <Vortex
          visible={true}
          height="120"
          width="120"
          ariaLabel="vortex-loading"
          wrapperStyle={{}}
          wrapperClass="vortex-wrapper"
          colors={["red", "green", "blue", "yellow", "orange", "purple"]}
        />
      </div>
    </main>
  );
}
