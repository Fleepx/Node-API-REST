const pool = require("../config/db");

// Obtener joyas con paginación y ordenamiento
const getJoyas = async ({ limits, page, order_by }) => {
  const [column, direction] = order_by.split("_");
  const offset = (page - 1) * limits;
  const query = `
    SELECT * FROM inventario
    ORDER BY ${column} ${direction}
    LIMIT $1 OFFSET $2;
  `;
  const result = await pool.query(query, [limits, offset]);
  return result.rows;
};

// Filtrar joyas por parámetros dinámicos
const getFilteredJoyas = async ({ precio_min, precio_max, categoria, metal }) => {
  const condiciones = [];
  const valores = [];

  if (precio_min) {
    condiciones.push("precio >= $1");
    valores.push(precio_min);
  }
  if (precio_max) {
    condiciones.push("precio <= $2");
    valores.push(precio_max);
  }
  if (categoria) {
    condiciones.push("categoria = $3");
    valores.push(categoria);
  }
  if (metal) {
    condiciones.push("metal = $4");
    valores.push(metal);
  }

  const whereClause = condiciones.length
    ? `WHERE ${condiciones.join(" AND ")}`
    : "";

  const query = `
    SELECT * FROM inventario
    ${whereClause};
  `;
  const result = await pool.query(query, valores);
  return result.rows;
};

module.exports = {
  getJoyas,
  getFilteredJoyas,
};
