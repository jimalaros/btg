import mongoose from "mongoose";

import dotenv from "dotenv";
dotenv.config();

const stringConexion = process.env.MONGODB_URI;

(async () => {
  try {
    const db = await mongoose.connect(stringConexion, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log("Conectado a la base de datos", db.connection.host);
  } catch (error) {
    console.error(error);
  }
})();
