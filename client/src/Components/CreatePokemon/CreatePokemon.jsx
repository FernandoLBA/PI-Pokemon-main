import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./CreatePokemon.module.css";
import axios from "axios";
import { setPokemon } from "../../Redux/actions/pokemonAction";
import { getMyPokemons, getPokemons } from "../../Redux/actions/pokemonsAction";

const CreatePokemon = () => {
  const myPokemons = useSelector((state) => state.pokemonsReducer.myPokemons);
  const types = useSelector((state) => state.typesReducer.types);
  const dispatch = useDispatch();

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
    setInputs({
      ...inputs,
      [e.target.name]:
        e.target.name === "tipos"
          ? !inputs.tipos.includes(e.target.value)
            ? [...inputs.tipos, e.target.value]
            : [...inputs.tipos]
          : e.target.value,
    });
  };

  const handleTags = (e) => {
    let index = e.target.value;
    setInputs({
      ...inputs,
      tipos: inputs.tipos.filter((tipo, i) => i !== index),
    });
    console.log(inputs);
  };

  // const validate = (e) => {
  //   let formArr = document.getElementsByTagName("form");
  //   console.log([...formArr]);
  // };

  // const [poks, setPoks] = useState([])

  const handleSubmit = (e) => {
    // e.preventDefault();
    try {
      axios.post("http://localhost:3001/pokemons", inputs).then((req, res) => {
        alert(req.data);
        setInputs({
          nombre: "",
          vida: 0,
          fuerza: 0,
          defensa: 0,
          velocidad: 0,
          altura: 0,
          peso: 0,
          tipos: [],
        });
      });
      dispatch(setPokemon([inputs]));
    } catch (error) {
      alert(error);
    } finally {
      // backend
      dispatch(getPokemons);
      // filtra BD
      dispatch(getMyPokemons);
    }
  };

  // useEffect(() => {
  //   setPoks(...myPokemons)
  //   console.log('me ejecute')
  // }, [handleSubmit]);

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
            placeholder="Type the pokémon's name here..."
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
          <div className={styles.typesContainer}>
            <select
              className={styles.selectTypes}
              name="tipos"
              id="type"
              onChange={handleInputs}
              defaultValue="select"
              // placeholder="Choose here..."
            >
              <option value="select">Choose here...</option>
              {types.map((type) => (
                <option key={type.id}>{type.nombre}</option>
              ))}
            </select>

            {/* <button className={styles.btnAddType} onClick={() => {
              setInputs({
                ...inputs,
                tipos: prompt("Type the new type here..."),
              });
            }}>NEW TYPE</button> */}

            <ul className={styles.ulInputs}>
              {inputs.tipos.map((tipo) => (
                <li
                  key={inputs.tipos.indexOf(tipo)}
                  value={inputs.tipos.indexOf(tipo)}
                  onClick={handleTags}
                >
                  {tipo} x
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.btnContainer}>
            <input type="submit" className={styles.button} value="CREATE" />
          </div>
        </form>
      </div>

      <div className={styles.myPokemons}>
        <div>
          <h3>My Pokémons</h3>
          <div>
            <ul className={styles.ulMyPoks}>
              {myPokemons.length ? (
                myPokemons.map((pok) => {
                  return (
                    <Link to={`/Pokemon/${pok.id}`} key={Math.random(0, 100)}>
                      <li key={pok.id}>
                        <img
                          className={styles.imageList}
                          src={pok.imagen}
                          alt={pok.nombre}
                        />
                        {pok.nombre}
                      </li>
                    </Link>
                  );
                })
              ) : (
                <div className={styles.gif}></div>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePokemon;
