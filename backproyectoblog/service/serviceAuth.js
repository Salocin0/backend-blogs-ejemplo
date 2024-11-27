import bcrypt from "bcryptjs";
import { generarAccessToken, generarRefreshToken, } from "../Utils/generarToken.js";
import { Usuario } from "../model/modelUsuario.js";
import jwt from "jsonwebtoken";

export const registrarUsuario = async (username, password) => {
  const usuarioExistente = await Usuario.findOne({ username });
  if (usuarioExistente) {
    throw new Error("El usuario ya existe");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const nuevoUsuario = {
    username,
    password: hashedPassword,
  };
  const usuario = await Usuario.create(nuevoUsuario);
  return usuario;
};

export const iniciarSesion = async (username, password) => {
  const usuario = await Usuario.findOne({ username });
  if (!usuario) {
    throw new Error("Usuario o contraseña incorrectos");
  }
  const esPasswordCorrecto = await bcrypt.compare(password, usuario.password);
  if (!esPasswordCorrecto) {
    throw new Error("Usuario o contraseña incorrectos");
  }
  const accessToken = generarAccessToken({
    id: usuario._id,
    username: usuario.username,
  });
  const refreshToken = generarRefreshToken({
    id: usuario._id,
    username: usuario.username,
  });
  const usuarioactualizado = await Usuario.findOne({ username });
  usuario.refreshToken = refreshToken;
  Usuario.updateOne({ _id: usuarioactualizado._id }, usuario);
  return { accessToken, refreshToken };
};

export const renovarAccessToken = async (refreshToken) => {
  try {
    const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH);

    const usuario = await Usuario.findOne({ _id: payload.id, refreshToken });

    if (!usuario) {
      throw new Error("Usuario no encontrado o token inválido");
    }

    const newAccessToken = generarAccessToken({
      id: payload.id,
      username: payload.username,
    });
    return newAccessToken;
  } catch (error) {
    console.log(error);
    throw new Error("Token inválido o expirado");
  }
};
