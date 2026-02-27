const {
  getMarcas,
  getMarcaById,
  postMarca,
  putMarca,
  deleteMarca,
} = require("../controllers/marca");

const marcasRouter = require("express").Router();

marcasRouter.get("/:id", getMarcaById);
marcasRouter.get("/", getMarcas);
marcasRouter.post("/", postMarca);
marcasRouter.put("/:id", putMarca);
marcasRouter.delete("/:id", deleteMarca);

module.exports = marcasRouter;