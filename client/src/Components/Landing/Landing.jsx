import React from "react";
import styles from "./landing.module.css";

const Landing = () => {
  return (
    <div className={styles.container}>
      <div className={styles.external}>
        <div className={styles.pokeball}>
          <div className={styles.halfRed}></div>
        </div>
        <div className={styles.blackCircle}>
          <button
            className={styles.button}
            onClick={() => (window.location.href = "/Pokemons")}
          >
            START
          </button>
        </div>
      </div>
    </div>
  );
};

export default Landing;
