const { getJoyas, getFilteredJoyas } = require("../models/joyasModel");

// Controlador para GET /joyas
const fetchJoyas = async (req, res) => {
  try {
    const { limits = 10, page = 1, order_by = "id_ASC" } = req.query;
    const joyas = await getJoyas({ limits, page, order_by });

    const hateoas = joyas.map((jewel) => ({
      nombre: jewel.nombre,
      precio: jewel.precio,
      metal: jewel.metal,
      stock: jewel.stock,
      enlace: `http://localhost:3000/joyas/${jewel.id}`,
    }));

    res.json(hateoas);
  } catch (error) {
    console.error("Error al obtener las joyas:", error);
    res.status(500).json({ error: "Error al obtener las joyas" });
  }
};

// Controlador para GET /joyas/filtros
const fetchFilteredJoyas = async (req, res) => {
  try {
    const { precio_min, precio_max, categoria, metal } = req.query;
    const joyas = await getFilteredJoyas({ precio_min, precio_max, categoria, metal });
    res.json(joyas);
  } catch (error) {
    console.error("Error al filtrar las joyas:", error);
    res.status(500).json({ error: "Error al filtrar las joyas" });
  }
};

module.exports = {
  fetchJoyas,
  fetchFilteredJoyas,
};
