const Coche = require("../models/coches");

const getCoches = async (req, res, next) => {
  try {
    const coches = await Coche.find();
    return res.status(200).json(coches);
  } catch (error) {
    return res.status(500).json({ error: "Error al obtener los coches" });
  }
};

const getCocheById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const coche = await Coche.findById(id);
    if (!coche) {
      return res.status(200).json({ error: "Coche no econtrado" });
    }
    return res.status(200).json(coche);
  } catch (error) {
    return res.status(500).json({ error: "Error al encontrar coche" });
  }
};

const getCochesByCategoria = async (req, res, next) => {
  try {
    const { categoria } = req.params;
    const coche = await Coche.find({ categoria });
    return res.status(200).json(coche);
  } catch (error) {
    return res.status(500).json({ error: "Error al filtrar por categoría" });
  }
};

const getCochesByCombustible = async (req, res, next) => {
  try {
    const { combustible } = req.params;
    const coche = await Coche.find({ combustible });
    return res.status(200).json(coche);
  } catch (error) {
    return res.status(500).json({ error: "Error al filtrar por categoría" });
  }
};

const postCoche = async (req, res, next) => {
  try {
    const newCoche = new Coche(req.body);
    const cocheSaved = await newCoche.save();
    return res.status(201).json(cocheSaved);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const putCoche = async (req, res, next) => {
  try {
    const { id } = req.params;
    const cocheUpdated = await Coche.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!cocheUpdated) {
      return res.status(404).json({ error: "Coche no encontrado" });
    }
    return res.status(200).json(cocheUpdated);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const deleteCoche = async (req, res, next) => {
  try {
    const { id } = req.params;
    const cocheDeleted = await Coche.findByIdAndDelete(id);
    if (!cocheDeleted) {
      return res.status(404).json({ error: "Coche no encontrado" });
    }
    return res.status(200).json({ message: "Coche eliminado correctamente" });
  } catch (error) {
    return res.status(400).json({ error: "Error al eliminar el coche" });
  }
};

module.exports = {
  getCoches,
  getCocheById,
  getCochesByCategoria,
  getCochesByCombustible,
  postCoche,
  putCoche,
  deleteCoche,
};
