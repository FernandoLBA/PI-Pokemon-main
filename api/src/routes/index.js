const { Router } = require("express");
// // Importar todos los routers;
// // Ejemplo: const authRouter = require('./auth.js');
const pokemons = require("./pokemons");
const tipos = require("./tipos");

const router = Router();

// // Configurar los routers
// // Ejemplo: router.use('/auth', authRouter);
router.use(pokemons);
router.use("/types", tipos);

module.exports = router;