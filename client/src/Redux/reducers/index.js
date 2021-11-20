import { combineReducers } from "redux";
import { pokemonsReducer } from "./pokemonsReducer";
import { typesReducer } from "./typesReducer";

const reducers = combineReducers({
  pokemonsReducer,
  typesReducer,
});

export default reducers;
