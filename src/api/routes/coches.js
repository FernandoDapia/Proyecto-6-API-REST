const {
  getCoches,
  getCocheById,
  getCochesByCategoria,
  getCochesByCombustible,
  postCoche,
  putCoche,
  deleteCoche,
} = require("../controllers/coche")

const cochesRouter = require('express').Router()

cochesRouter.get("/categoria/:categoria", getCochesByCategoria);
cochesRouter.get("/combustible/:combustible", getCochesByCombustible);
cochesRouter.get("/:id", getCocheById);
cochesRouter.get("/", getCoches);
cochesRouter.post("/", postCoche);
cochesRouter.put("/:id", putCoche);
cochesRouter.delete("/:id", deleteCoche);

module.exports = cochesRouter

