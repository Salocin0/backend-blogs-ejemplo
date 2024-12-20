import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  refreshToken: { type: String },
});

export const Usuario = mongoose.model("Usuario", usuarioSchema);
