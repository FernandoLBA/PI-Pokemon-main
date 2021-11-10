const { Router } = require("express");
const { Pokemon } = require("../db.js");
const router = Router();

router.get("/pokemons", (req, res) => {
  if (req.query.name) {
    res.send(`Estoy buscando al pokemon ${req.query.name}`);
  }
  res.send("Estamos en pokemons");
});

router.get("/pokemons/:idPokemon", (req, res) => {
  const { idPokemon } = req.params;
  res.send(`Estamos buscando al pokemon con el id ${idPokemon}`);
});

router.post("/pokemons", async (req, res) => {
  const { nombre, vida, fuerza, defensa, velocidad, altura, peso } = req.body;
  await Pokemon.create({
    nombre,
    vida,
    fuerza,
    defensa,
    velocidad,
    altura,
    peso,
  });
  res.json(`Pokemon ${nombre} guardado`);
});

module.exports = router;
