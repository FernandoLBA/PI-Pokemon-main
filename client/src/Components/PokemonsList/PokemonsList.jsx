import React from "react";
import { Link } from "react-router-dom";
import styles from "./PokemonsList.module.css";

const PokemonsList = ({ pokemons }) => {
  return (
    <div className={styles.listContainer}>
      {pokemons.length ? (
        pokemons.map((pokemon) => {
          return (
            <div className={styles.card} key={pokemon.id}>
              <Link className={styles.link} to={`/Pokemon/${pokemon.id}`}>
                <img src={pokemon.imagen} alt={pokemon.nombre} />
              </Link>
              <div className={styles.cardContent}>
                <h3>{pokemon.nombre.toUpperCase()}</h3>
                <div className={styles.types}>
                  {typeof pokemon.tipos[0] === "string"
                    ? pokemon.tipos.map((tipo) => {
                        return <div key={Math.random(0, 10)}>{tipo}</div>;
                      })
                    : pokemon.tipos.map((tipo) => {
                        return (
                          <div key={Math.random(11, 20)}>{tipo.nombre}</div>
                        );
                      })}
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className={styles.loading}>
          <div className={styles.gif} />
        </div>
      )}
    </div>
  );
};

export default PokemonsList;
