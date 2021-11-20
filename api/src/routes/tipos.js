const axios = require("axios");
const { Router } = require("express");
const { Tipo } = require("../db");
const router = Router();

router.get("/types", async (req, res) => {
  try {
    // trae todos los tipos de la API
    let response = await axios.get("https://pokeapi.co/api/v2/type");
    const { results } = response.data;

    // Guarda los tipos de la api en la base de datos
    results.map(async (tipo) => {
      await Tipo.findOrCreate({
        where: {
          nombre: tipo.name,
        },
        defaults: {
          nombre: tipo.name,
        },
      });
    });

    // Solicita los tipos de la BD
    let types = await Tipo.findAll({
      attributes: ["id", "nombre"],
    });

    // res.send("Tipos cargados en la base de datos");
    res.json(types);
  } catch (error) {
    console.log(error);
    res.send("Error al cargar los tipos");
  }
});

module.exports = router;
