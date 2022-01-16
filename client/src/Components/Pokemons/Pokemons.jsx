import React, { useState } from "react";
import styles from "./Pokemons.module.css";
import SortFilter from "../SortFilters/SortFilter";

const Pokemons = () => {
  const [search, setSearch] = useState("");

  const handleInput = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    return !search ? alert("The search field cannot be empty...") : true;
  };

  return (
    <div className={styles.pokemonsContainer}>
      <main>
        <h4 htmlFor="search-input">Find a Pokémon</h4>
        <div>
          <div>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="search"
                onChange={handleInput}
                value={search}
                placeholder="Input the pokémon name here..."
              />
              <input
                type="submit"
                value="Search"
                onClick={() => {
                  if (search) {
                    window.location.href = `/Pokemon?name=${search
                      .toLowerCase()
                      .trim()}`;
                  }
                }}
              />
            </form>
          </div>
          <div>
            <SortFilter />
          </div>
        </div>
        <aside className={styles.filters}></aside>
      </main>
    </div>
  );
};

export default Pokemons;
