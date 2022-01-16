import { actionTypes } from "../constants/actionTypes";

const {
  GET_POKEMONS,
  GET_POKEMON_BY_ID,
  GET_POKEMON_BY_NAME,
  SET_POKEMON,
  GET_MY_POKEMONS,
} = actionTypes;

const initialState = {
  pokemons: [],
  pokemon: [],
  myPokemons: [],
};

export const pokemonsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POKEMONS:
      return { ...state, pokemons: action.payload };

    case GET_POKEMON_BY_ID:
      return { ...state, pokemon: action.payload };

    case GET_POKEMON_BY_NAME:
      return { ...state, pokemon: action.payload };

    case SET_POKEMON:
      return {
        ...state,
        pokemons: [...state.pokemons, ...action.payload],
      };

    case GET_MY_POKEMONS:
      return {
        ...state,
        myPokemons: state.pokemons.filter(
          (pokemon) => typeof pokemon.id === "string"
        ),
      };

    default:
      return state;
  }
};
