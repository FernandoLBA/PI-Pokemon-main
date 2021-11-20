import "./App.css";
import { Routes, Route } from "react-router-dom";
import NavBar from "./Components/NavBar/NavBar";
import Landing from "./Components/Landing/Landing";
import Pokemons from "./Components/Pokemons/Pokemons";
import Pokemon from "./Components/Pokemon/Pokemon";
import CreatePokemon from "./Components/CreatePokemon/CreatePokemon";

function App() {
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
