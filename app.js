const express = require("express");
const joyasRoutes = require("./routes/joyasRoutes");

const app = express();
const port = 3000;

// Middleware para registrar rutas
app.use((req, res, next) => {
  console.log(`Consulta a la ruta: ${req.path} en ${new Date().toISOString()}`);
  next();
});

// Usar rutas de joyas
app.use("/joyas", joyasRoutes);

// Middleware para manejar rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
