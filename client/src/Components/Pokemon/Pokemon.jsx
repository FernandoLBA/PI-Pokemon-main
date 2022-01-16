import axios from "axios";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import {
  getPokemonById,
  getPokemonByName,
} from "../../Redux/actions/pokemonAction";
import styles from "./Pokemon.module.css";

const Pokemon = () => {
  // Se ejecuta 2do todo esto
  const dispatch = useDispatch();
  const pokemon = useSelector((state) => state.pokemonsReducer.pokemon);
  //   para traer los parámetros
  const params = useParams();

  const pokemonFetch = async () => {
    console.log(`http://localhost:3001/pokemons${window.location.search}`);
    try {
      console.log(params);
      let response;
      if (params.id) {
        response = await axios.get(
          `http://localhost:3001/pokemons/${params.id}`
        );
      } else {
        console.log("aca");
        response = await axios.get(
          `http://localhost:3001/pokemons${window.location.search}`
        );
      }

      if (Array.isArray(response.data)) {
        console.log("array");
        !typeof params.id === "string"
          ? dispatch(getPokemonById(response.data[0]))
          : dispatch(getPokemonByName(response.data[0]));
      } else {
        console.log("no array");
        !typeof params.id === "string"
          ? dispatch(getPokemonById(response.data))
          : dispatch(getPokemonByName(response.data));
      }
    } catch (error) {
      alert("Pokémon not found... click to redirect");
      console.log(error);
      window.location.href = "/Pokemons";
    }
  };

  // Se ejecuta 1ero
  useEffect(() => {
    pokemonFetch();
    console.log(pokemon);
  }, []);

  // Se renderiza 3ero
  return (
    <div className={styles.container}>
      {pokemon || pokemon.length ? (
        <div>
          <h2>Estamos</h2>
          <img src={pokemon.imagen} alt={pokemon.nombre} />
          <h3>{pokemon.nombre}</h3>
          <h3>{pokemon.vida}</h3>
          <h3>{pokemon.velocidad}</h3>
          <h3>{pokemon.ataque}</h3>
          <h3>{pokemon.defensa}</h3>
        </div>
      ) : (
        <div>Pokémon not found...</div>
      )}
    </div>
  );
};

export default Pokemon;
