import React, { useState } from "react";
import styles from "./Pokemons.module.css";
import axios from "axios";
import PokemonsList from "../PokemonsList/PokemonsList";

const Pokemons = () => {
  const [search, setSearch] = useState("");
  const [pokemon, setPokemon] = useState([]);

  const handleInput = (e) => {
    setSearch(e.target.value);
  };

  const pokemonFetch = async (poke) => {
    const response = await axios.get(
      `http://localhost:3001/pokemons?name=${poke}`
    );

    setPokemon(response.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await pokemonFetch(search.toLowerCase());
    console.log(pokemon);
  };

  return (
    <div className={styles.pokemonsContainer}>
      <main>
        <h4 htmlFor="search-input">Find a Pokémon</h4>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="search"
            onChange={handleInput}
            value={search}
            required
          />
          <input type="submit" value="Search" />
        </form>
        <article className={styles.content}>
          <PokemonsList />
        </article>
        <aside className={styles.filters}></aside>
      </main>
    </div>
  );
};

export default Pokemons;
