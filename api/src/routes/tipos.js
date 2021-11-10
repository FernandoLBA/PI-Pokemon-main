const { Router } = require("express");
const router = Router();

router.get((req, res) => {
  res.send("Estamos en tipos");
});

module.exports = router;
