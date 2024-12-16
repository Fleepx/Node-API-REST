const express = require("express");
const { fetchJoyas, fetchFilteredJoyas } = require("../controllers/joyasController");

const router = express.Router();

// Ruta para obtener todas las joyas con HATEOAS
router.get("/", fetchJoyas);

// Ruta para filtrar joyas
router.get("/filtros", fetchFilteredJoyas);

module.exports = router;
