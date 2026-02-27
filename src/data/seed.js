require("dotenv").config({
  path: require("path").resolve(__dirname, "../../.env"),
});
const mongoose = require("mongoose");
const Coche = require("../api/models/coches");
const Marca = require("../api/models/marcas");

const cochesData = [
  {
    modelo: "Ferrari 488 GTB",
    imagen: "no disponible",
    precio: 250000,
    año: 2022,
    potencia: 670,
    categoria: "deportivo",
    combustible: "gasolina",
  },
  {
    modelo: "Ferrari SF90 Stradale",
    imagen: "no disponible",
    precio: 480000,
    año: 2023,
    potencia: 1000,
    categoria: "deportivo",
    combustible: "híbrido",
  },
  {
    modelo: "BMW M3 Competition",
    imagen: "no disponible",
    precio: 95000,
    año: 2023,
    potencia: 510,
    categoria: "berlina",
    combustible: "gasolina",
  },
  {
    modelo: "BMW iX xDrive50",
    imagen: "no disponible",
    precio: 87000,
    año: 2023,
    potencia: 523,
    categoria: "SUV",
    combustible: "eléctrico",
  },
  {
    modelo: "Toyota GR Supra",
    imagen: "no disponible",
    precio: 58000,
    año: 2023,
    potencia: 387,
    categoria: "deportivo",
    combustible: "gasolina",
  },
  {
    modelo: "Toyota RAV4 Hybrid",
    imagen: "no disponible",
    precio: 42000,
    año: 2023,
    potencia: 218,
    categoria: "SUV",
    combustible: "híbrido",
  },
];

const marcasData = [
  {
    nombre: "Ferrari",
    pais: "Italia",
    fundacion: 1939,
    logo: "https://upload.wikimedia.org/wikipedia/en/d/d1/Ferrari-Logo.svg",
  },
  {
    nombre: "BMW",
    pais: "Alemania",
    fundacion: 1916,
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg",
  },
  {
    nombre: "Toyota",
    pais: "Japón",
    fundacion: 1937,
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/9d/Toyota_carlogo.svg",
  },
];

const seed = async (params) => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Conectado a MongoDB desde seed");
    await Coche.deleteMany({});
    await Marca.deleteMany({});
    console.log("Coleciones limpiadas");

    const cochesInsertados = await Coche.insertMany(cochesData);
    console.log(`${cochesInsertados.length} coches insertados`);

    marcasData[0].coches = [cochesInsertados[0]._id, cochesInsertados[1]._id];
    marcasData[1].coches = [cochesInsertados[2]._id, cochesInsertados[3]._id];
    marcasData[2].coches = [cochesInsertados[4]._id, cochesInsertados[5]._id];

    const marcasInsertadas = await Marca.insertMany(marcasData);
    console.log(`🏁 ${marcasInsertadas.length} marcas insertadas`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Error en la semilla:", error.message);
    process.exit(1);
  }
};

seed();
