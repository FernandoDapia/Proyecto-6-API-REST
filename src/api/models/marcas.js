const mongoose = require("mongoose");

const marcaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, "El nombre de la marca es obligatorio"],
    unique: true,
    trim: true,
  },
  pais: {
    type: String,
    required: [true, "El país de origen es obligatorio"],
  },
  fundacion: {
    type: Number,
    required: [true, "El año de fundacion es obligatorio"],
  },
  logo: {
    type: String,
  },
 coches:[
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "coches"
  }
 ]
},
{
  timestaps: true,
  collection: "marcas"
});

const Marca = mongoose.model("marcas", marcaSchema, "marcas")
module.exports = Marca
