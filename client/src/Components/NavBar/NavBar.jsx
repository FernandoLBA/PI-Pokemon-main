import React from "react";
import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";

const NavBar = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.logo} onClick={() => window.location.href="/Pokemons"}/>
      <ul className={styles.navlist}>
        <Link to="/Pokemons"><li>Pokémons</li></Link>
        <Link className={styles.create} to="/Create"><li>Create Your Pokémon</li></Link>
      </ul>
    </nav>
  );
};

export default NavBar;
