import { actionTypes } from "../constants/actionTypes";

const { GET_POKEMON_BY_ID, GET_POKEMON_BY_NAME, SET_POKEMON } = actionTypes;

export const getPokemonById = (pokemon) => {
  return {
    type: GET_POKEMON_BY_ID,
    payload: pokemon,
  };
};

// export const getPokemonByName = (pokemon) => {
//   return {
//     type: GET_POKEMON_BY_NAME,
//     payload: pokemon,
//   };
// };

// export const setPokemon = (pokemon) => {
//   return {
//     type: SET_POKEMON,
//     payload: pokemon,
//   };
// };
