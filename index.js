require("dotenv").config();
const express = require("express");
const cors = require("cors");

const { connectDB } = require("./src/config/db");
const cochesRouter = require("./src/api/routes/coches");
const marcasRouter = require("./src/api/routes/marcas");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());


connectDB().then(() => {
  console.log("🚀 Base de datos conectada");
}).catch((err) => {
  console.log("🚨 Error al conectar con la base de datos", err);
});



app.use("/api/v1/coches", cochesRouter);
app.use("/api/v1/marcas", marcasRouter);

app.use("", (req, res) => {
  return res.status(404).json({ error: "Ruta no encontrada" });
});


app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});


