import axios from "axios";
import { actionTypes } from "../constants/actionTypes";

const { GET_POKEMONS, FILTER_POKEMONS, GET_MY_POKEMONS } = actionTypes;

export const getPokemons = () => {
  return async function (dispatch) {
    axios.get("http://localhost:3001/pokemons").then((response) => {
      dispatch({
        type: GET_POKEMONS,
        payload: response.data,
      });
    });
  };
};

export const filterPokemons = (pokemons) => {
  return {
    type: FILTER_POKEMONS,
    payload: pokemons,
  };
};

export const getMyPokemons = () => {
  return async function (dispatch) {
    axios.get("http://localhost:3001/pokemons").then((response) => {
      dispatch({
        type: GET_MY_POKEMONS,
        payload: response.data.filter((pok) => typeof pok.id === "string"),
      });
    });
  };
};
