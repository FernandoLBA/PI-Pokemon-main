import { actionTypes } from "../constants/actionTypes";

const { GET_POKEMONS } = actionTypes;

export const getPokemons = (pokemons) => {
  return {
    type: GET_POKEMONS,
    payload: pokemons,
  };
};

