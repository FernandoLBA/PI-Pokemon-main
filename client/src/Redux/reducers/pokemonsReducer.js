import { actionTypes } from "../constants/actionTypes";

const {
  GET_POKEMONS,
  GET_POKEMON_BY_ID,
  //   GET_POKEMON_BY_NAME,
  //   SET_POKEMON,
} = actionTypes;

const initialState = {
  pokemons: [
    //     {
    //       id: "12312sbdchbchbc",
    //       nombre: "Perrimon",
    //       vida: 200,
    //       fuerza: 120,
    //       defensa: 320,
    //       velocidad: 74,
    //       altura: 2,
    //       peso: 1,
    //       tipos: ["write", "read"],
    //       imagen:
    //         "https://pbs.twimg.com/profile_images/2637649279/7115b0405879bdb6c54bbb577b3e307b.jpeg",
    //     },
  ],
  pokemon: [
    //     {
    //       id: "12312sb23525dchbchbc",
    //       nombre: "Patricio",
    //       vida: 200,
    //       fuerza: 120,
    //       defensa: 320,
    //       velocidad: 74,
    //       altura: 2,
    //       peso: 1,
    //       tipos: ["write", "read"],
    //       imagen:
    //         "https://i0.wp.com/codigoespagueti.com/wp-content/uploads/2021/03/Nueva-serie-de-television-de-Patricio-Estrella.jpg?fit=1280%2C720&quality=80&ssl=1",
    //     },
  ],
  myPokemons: [
    {
      id: "12312sb23525dchbchbc",
      nombre: "Patricio",
      vida: 200,
      fuerza: 120,
      defensa: 320,
      velocidad: 74,
      altura: 2,
      peso: 1,
      tipos: ["write", "read"],
      imagen:
        "https://i0.wp.com/codigoespagueti.com/wp-content/uploads/2021/03/Nueva-serie-de-television-de-Patricio-Estrella.jpg?fit=1280%2C720&quality=80&ssl=1",
    },
  ],
};

export const pokemonsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POKEMONS:
      return { ...state, pokemons: action.payload };

    case GET_POKEMON_BY_ID:
      return { ...state, pokemon: action.payload };

    //     case GET_POKEMON_BY_NAME:
    //       let nameFinded = state.find(
    //         (pokemon) => pokemon.nombre === action.payload
    //       );
    //       return [nameFinded];

    //     case SET_POKEMON:
    //       return [...state, action.payload];

    default:
      return state;
  }
};
