const mongoose = require("mongoose");

const cocheSchema = new mongoose.Schema(
  {
    modelo: {
      type: String,
      required: [true, "El modelo del coche"],
      trim: true,
    },
    imagen: {
      type: String,
      required: [true, "La imagen es obligatoria"],
    },
    precio: {
      type: Number,
      required: [true, "El precio es obligatorio"],
    },
    año: {
      type: Number,
      required: [true, "El año es obligatorio"],
    },
    potencia: {
      type: Number,
      required: [true, "La potencia es obligatoria"],
    },
    categoria: {
      type: String,
      required: true,
      enum: [
        "deportivo",
        "familiar",
        "SUV",
        "berlina",
        "compacto",
        "electrico",
      ],
    },
    combustible: {
      type: String,
      required: [true, "El combustible es obligatorio"],
      enum: ["gasolina", "diésel", "eléctrico", "híbrido"],
    },
  },
  {
    timestamps: true,
    collection: "coches",
  },
);

const Coche = mongoose.model("coches", cocheSchema, "coches")
module.exports = Coche


