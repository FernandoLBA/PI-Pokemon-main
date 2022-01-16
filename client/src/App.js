import "./App.css";
import { Routes, Route } from "react-router-dom";
import NavBar from "./Components/NavBar/NavBar";
import Landing from "./Components/Landing/Landing";
import Pokemons from "./Components/Pokemons/Pokemons";
import Pokemon from "./Components/Pokemon/Pokemon";
import CreatePokemon from "./Components/CreatePokemon/CreatePokemon";
import { useDispatch } from "react-redux";
import {getPokemons, getMyPokemons} from './Redux/actions/pokemonsAction';
import { getTypes } from "./Redux/actions/typesAction";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getPokemons());
    dispatch(getMyPokemons());
    dispatch(getTypes());
  }, [dispatch])

  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route
          path="/Pokemons"
          element={
            <>
              <NavBar />
              <Pokemons />
            </>
          }
        />

        <Route
          path="/Pokemon"
          element={
            <>
              <NavBar />
              <Pokemon />
            </>
          }
          search="?name="
        />

        <Route
          path="/Pokemon/:id"
          element={
            <>
              <NavBar />
              <Pokemon />
            </>
          }
        />

        <Route
          path="/Create"
          element={
            <>
              <NavBar />
              <CreatePokemon />
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
