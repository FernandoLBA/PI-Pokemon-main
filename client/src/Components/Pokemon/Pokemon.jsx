import axios from "axios";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { getPokemonById } from "../../Redux/actions/pokemonAction";
import styles from "./Pokemon.module.css";

const Pokemon = () => {
  // Se ejecuta 2do todo esto
  const dispatch = useDispatch();
  const pokemon = useSelector((state) => state.pokemonsReducer.pokemon);
  //   para traer los parámetros
  const params = useParams();

  const pokemonFetch = async () => {
    let response = await axios.get(
      `http://localhost:3001/pokemons/${params.id}`
    );

    if (Array.isArray(response.data)) {
      dispatch(getPokemonById(response.data[0]));
    } else {
      dispatch(getPokemonById(response.data));
    }
  };

  // Se ejecuta 1ero
  useEffect(() => {
    pokemonFetch();
  }, []);

  console.log(pokemon)
  const { nombre, vida, ataque, defensa, velocidad, tipos, imagen } = pokemon;

  // Se renderiza 3ero
  return (
    <div className={styles.container}>
      {pokemon ? (
        <div>
          <img src={imagen} alt={nombre} />
          <h3>{nombre}</h3>
          <h3>{vida}</h3>
          <h3>{velocidad}</h3>
          <h3>{ataque}</h3>
          <h3>{defensa}</h3>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default Pokemon;
