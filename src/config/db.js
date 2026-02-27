const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("✅ Conectado a MongoDB con éxito");
  } catch (error) {
    console.error("❌ Error al conectar", error);
  }
};

module.exports = { connectDB };