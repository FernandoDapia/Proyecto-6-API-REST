const Marca = require("../models/marcas");

const getMarcas = async (req, res, next) => {
  try {
    const marcas = await Marca.find().populate("coches");
    return res.status(200).json(marcas);
  } catch (error) {
    return res.status(500).json({ error: "Error al obtener las marcas" });
  }
};

const getMarcaById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const marca = await Marca.findById(id).populate("coches");
    if (!marca) {
      return res.status(404).json({ error: "Marca no encontrada" });
    }
    return res.status(200).json(marca);
  } catch (error) {
    return res.status(500).json({ error: "Error al obtener la marca" });
  }
};

const postMarca = async (req, res, next) => {
  try {
    const newMarca = new Marca(req.body);
    const marcaSaved = await newMarca.save();
    return res.status(201).json(marcaSaved);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const putMarca = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { coches, ...otherData } = req.body;

    const marcaUpdated = await Marca.findByIdAndUpdate(id, otherData, {
      new: true,
      runValidators: true,
    });

    if (!marcaUpdated) {
      return res.status(404).json({ error: "Marca no encontrada" });
    }

    if (coches && Array.isArray(coches) && coches.length > 0) {
      await Marca.findByIdAndUpdate(
        id,
        { $addToSet: { coches: { $each: coches } } },
        { new: true },
      );
    }

    const finalMarca = await Marca.findById(id).populate("coches");
    return res.status(200).json(finalMarca);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const deleteMarca = async (req, res, next) => {
  try {
    const { id } = req.params;
    const marcaDeleted = await Marca.findByIdAndDelete(id);
    if (!marcaDeleted) {
      return res.status(404).json({ error: "Marca no encontrada" });
    }
    return res
      .status(200)
      .json({ message: "Marca eliminada correctamente", marca: marcaDeleted });
  } catch (error) {
    return res.status(500).json({ error: "Error al eliminar la marca" });
  }
};



module.exports = {
  getMarcas,
  getMarcaById,
  postMarca,
  putMarca,
  deleteMarca,
};
