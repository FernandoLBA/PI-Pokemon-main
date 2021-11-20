import axios from "axios";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./PokemonsList.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons } from "../../Redux/actions/pokemonsAction";

const PokemonsList = () => {
  const dispatch = useDispatch();
  const pokemons = useSelector((state) => state.pokemonsReducer.pokemons);

  const pokemonsFetch = async () => {
    const response = await axios.get(`http://localhost:3001/pokemons/`);

    dispatch(getPokemons(response.data));
  };

  useEffect(() => {
    pokemonsFetch();
  }, []);

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
                        return <div key={Math.random(2, 3)}>{tipo}</div>;
                      })
                    : pokemon.tipos.map((tipo) => {
                        return (
                          <div key={Math.random(4, 10)}>{tipo.nombre}</div>
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
