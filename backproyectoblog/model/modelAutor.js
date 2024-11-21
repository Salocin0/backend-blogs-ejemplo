import mongoose from "mongoose";

const autorSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  nombre: { type: String, required: true },
  biografia: { type: String, required: true },
  fechaNacimiento: { type: Date },
  redSocial: { type: String },
  fotoPerfil: { type: String },
  isHabilitado: { type: Boolean, default: true },
});

const Autor = mongoose.model("Autor", autorSchema);

export default Autor;
