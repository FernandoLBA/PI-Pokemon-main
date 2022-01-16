const { Router } = require("express");
const { Pokemon, Tipo } = require("../db.js");
const axios = require("axios");
const router = Router();

router.get("/pokemons", async (req, res) => {
  let response;

  try {
    // Si estan buscando algo por query
    if (req.query.name) {
      // validar la string de la query, sacando espacios vacíos al principio o final del texto y cambiando espacios
      // vacíos por guiones.
      let name = decodeURI(req.query.name.toLowerCase().trim()).replace(
        /\s+/g,
        "-"
      );
      // .replace(/\W/g, "") // quita caracteres especiales

      // Busca en la base de datos
      let finded = await Pokemon.findOne({
        where: {
          nombre: name,
        },
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: {
          model: Tipo,
          attributes: ["nombre"],
          through: { attributes: [] },
        },
      });

      if(finded) {
        return res.json(finded);
      }

      // busca en la api
      response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
      
      if(response) return res.json([
        {
          id: response.data.id,
          nombre: response.data.name,
          vida: response.data.stats[0].base_stat,
          fuerza: response.data.stats[1].base_stat,
          defensa: response.data.stats[2].base_stat,
          velocidad: response.data.stats[5].base_stat,
          altura: response.data.height,
          peso: response.data.weight,
          tipos: response.data.types.map((t) => t.type.name),
          imagen: response.data.sprites.other.home.front_default,
        },
      ]);
    }

    // Si no hay query, se trae todos los pokemons de la base de datos y la api
    let pokemonsDB = await Pokemon.findAll({
      include: [
        // se trae el atributo nombre de tipos y ningún atributo de la tabla intermedia(through)
        {
          model: Tipo,
          attributes: ["nombre"],
          through: { attributes: [] },
        },
      ],
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    // cuenta registros en la BD.
    let countDB = await Pokemon.count();
    // Trae solo 50 registros entre la API y la BD.
    let limitAPI = `?offset=0&limit=${50 - countDB}`

    response = await axios.get(`https://pokeapi.co/api/v2/pokemon${limitAPI}`);

    const { results } = response.data;

    let arrPokemons = [...pokemonsDB];
    for (let i = 0; i < results.length; i++) {
      let resp = await axios.get(results[i].url, { responseType: "json" });

      arrPokemons.push({
        id: resp.data.id,
        nombre: resp.data.name,
        vida: resp.data.stats[0].base_stat,
        fuerza: resp.data.stats[1].base_stat,
        defensa: resp.data.stats[2].base_stat,
        velocidad: resp.data.stats[5].base_stat,
        altura: resp.data.height,
        peso: resp.data.weight,
        tipos: resp.data.types.map((t) => t.type.name),
        imagen: resp.data.sprites.other.home.front_default,
      });
    }

    res.json(arrPokemons);
  } catch (error) {
    console.log(error);
    return res.sendStatus(404);
  }
});

router.get("/pokemons/:idPokemon", async (req, res) => {
  const { idPokemon } = req.params;
  // las ID que crea postgres son alfanuméricas, debo usar strings fa7adb4e-d03f-439b-b04b-9bdd0e97fe42
  // validar la string de la query
  try {
    // si params tiene un id
    if (idPokemon) {
      // Busca en la base de datos primero
      const finded = await Pokemon.findByPk(idPokemon.trim(), {
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: [{ model: Tipo, attributes: ["nombre"], through: { attributes: [] } }],
      });

      if (finded) {
        return res.json(finded);
      }

      // Busca en la API si no existe en la BD.
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${idPokemon.trim()}`
      );

      if (response) {
        return res.json([
          {
            id: response.data.id,
            nombre: response.data.name,
            vida: response.data.stats[0].base_stat,
            fuerza: response.data.stats[1].base_stat,
            defensa: response.data.stats[2].base_stat,
            velocidad: response.data.stats[5].base_stat,
            altura: response.data.height,
            peso: response.data.weight,
            tipos: response.data.types.map((t) => t.type.name),
            imagen: response.data.sprites.other.home.front_default,
          },
        ]);
      }
    }
  } catch (error) {
    console.log(error);
    res.send({ msg: "Pokémon no encontrado..." });
  }
});

router.post("/pokemons", async (req, res) => {
  const {
    nombre,
    vida,
    fuerza,
    defensa,
    velocidad,
    altura,
    peso,
    tipos,
    imagen,
  } = req.body;

  try {
    // retorna el pokemon creado y un booleano true cuando lo crea
    // console.log(nombre)
    const [newPokemon, pokemonCreated] = await Pokemon.findOrCreate({
      where: { nombre: nombre.toLowerCase() },
      defaults: {
        nombre: nombre.toLowerCase(),
        vida,
        fuerza,
        defensa,
        velocidad,
        altura,
        peso,
        imagen,
      },
    });

    // itera el array de tipos recibido por el body
    tipos.map(async (tipo) => {
      const [newType, typeCreated] = await Tipo.findOrCreate({
        where: {
          nombre: tipo,
        },
        defaults: {
          nombre: tipo,
        },
      });

      // agrega los datos en la tabla intermedia (un JOIN)
      // newType.addPokemon(newPokemon);
      newPokemon.addTipo(newType);
    });

    // retorna un mensaje si se creó el pokeon o nó
    pokemonCreated
      ? res.send(`Pokémon ${nombre} guardado.`)
      : res.send(`El pokémon ${nombre} ya existe.`);
  } catch (error) {
    console.log(error);
    res.send(`Error al guardar pokémon ${nombre}`);
  }
});

// ruta de prueba
// router.get("/p", async (req, res) => {
//   let poksBD = await Pokemon.findAll({
//     include: [
//       { model: Tipo, attributes: ["nombre"], through: { attributes: [] } },
//     ],
//   }).then((response) => {
//     response.map((data) => {
//       const { tipos } = data.dataValues;
//       tipos.map((tipo) => {
//         return tipo.dataValues.nombre;
//       });
//     });
//   });

//   // let tp = [];
//   // for (let i = 0; i < poksBD.length; i++) {
//   //   if (Array.isArray(poksBD[i].dataValues.tipos)) {
//   //     // console.log('estoy en i', poksBD[i].tipos)
//   //     tp = poksBD[i].tipos.map((tipo) => {
//   //       return tipo.dataValues.nombre;
//   //     });
//   //   }
//   // }
//   res.json(poksBD);
// });

module.exports = router;
