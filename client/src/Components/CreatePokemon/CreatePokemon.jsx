import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./CreatePokemon.module.css";

const CreatePokemon = () => {
  const myPokemons = useSelector((state) => state.pokemonsReducer.myPokemons);
  //   let dispatch = useDispatch();

  const [inputs, setInputs] = useState({
    nombre: "",
    vida: 0,
    fuerza: 0,
    defensa: 0,
    velocidad: 0,
    altura: 0,
    peso: 0,
    tipos: [],
  });

  const handleInputs = (e) => {
    // let types = [];
    setInputs({
      ...inputs,
      [e.target.name]:
        e.target.name === "tipos"
          ? [...inputs.tipos, e.target.value]
          : e.target.value,
    });
  };

  const validate = (e) => {
    let formArr = document.getElementsByTagName("form");
    console.log([...formArr]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate(e)) alert("OK");
  };

  useEffect(() => {
    console.log(inputs);
  }, [inputs]);

  return (
    <div className={styles.createContainer}>
      <div className={styles.formContainer}>
        <h3>Create your Pokémon</h3>
        <form className={styles.createForm} onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="nombre"
            value={inputs.nombre}
            onChange={handleInputs}
          />
          <label htmlFor="life">Life</label>
          <div className={styles.range}>
            <input
              type="range"
              id="life"
              name="vida"
              value={inputs.vida}
              onChange={handleInputs}
            />
            <p>
              <strong>{inputs.vida}</strong>
            </p>
          </div>
          <label htmlFor="attack">Attack</label>
          <div className={styles.range}>
            <input
              type="range"
              id="attack"
              name="fuerza"
              value={inputs.fuerza}
              onChange={handleInputs}
            />
            <p>
              <strong>{inputs.fuerza}</strong>
            </p>
          </div>
          <label htmlFor="defense">Defense</label>
          <div className={styles.range}>
            <input
              type="range"
              id="defense"
              name="defensa"
              value={inputs.defensa}
              onChange={handleInputs}
            />
            <p>
              <strong>{inputs.defensa}</strong>
            </p>
          </div>
          <label htmlFor="velocity">Velocity</label>
          <div className={styles.range}>
            <input
              type="range"
              id="velocity"
              name="velocidad"
              value={inputs.velocidad}
              onChange={handleInputs}
            />
            <p>
              <strong>{inputs.velocidad}</strong>
            </p>
          </div>
          <label htmlFor="height">Height</label>
          <div className={styles.range}>
            <input
              type="range"
              id="height"
              name="altura"
              value={inputs.altura}
              onChange={handleInputs}
            />
            <p>
              <strong>{inputs.altura}</strong>
            </p>
          </div>
          <label htmlFor="weight">Weight</label>
          <div className={styles.range}>
            <input
              type="range"
              id="weight"
              name="peso"
              value={inputs.peso}
              onChange={handleInputs}
            />
            <p>
              <strong>{inputs.peso}</strong>
            </p>
          </div>
          <label htmlFor="type">Types</label>

          <input
            type="text"
            id="type"
            name="tipos"
            value={inputs.tipos}
            onChange={handleInputs}
          />

          <input type="submit" className={styles.button} value="CREATE" />
        </form>
      </div>
      <div className={styles.myPokemons}>
        <div>
          <h3>My Pokémons</h3>
          <div>
            <ul>
              {myPokemons.map((pok) => {
                return (
                  <Link to={`/Pokemon/${pok.id}`} key={pok.id}>
                    <li>{pok.nombre}</li>
                  </Link>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePokemon;
