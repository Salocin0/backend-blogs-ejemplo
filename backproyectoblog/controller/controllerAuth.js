import {
  registrarUsuario,
  iniciarSesion,
  renovarAccessToken,
} from "../service/serviceAuth.js";

// Controlador para registrar un nuevo usuario
export const registrarController = async (req, res) => {
  const { username, password } = req.body;

  try {
    const nuevoUsuario = await registrarUsuario(username, password);
    res
      .status(201)
      .json({
        message: "Usuario registrado exitosamente",
        usuario: nuevoUsuario,
      });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controlador para iniciar sesión
export const loginController = async (req, res) => {
  const { username, password } = req.body;

  try {
    const { accessToken, refreshToken } = await iniciarSesion(
      username,
      password
    );
    res.cookie("refreshToken", refreshToken, { httpOnly: true });
    res.json({ accessToken: accessToken, refreshToken: refreshToken });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

// Controlador para renovar el access token
export const renovarTokenController = async (req, res) => {
  try {
    const refreshToken = req.headers["x-refresh-token"];
    console.log(refreshToken);

    if (!refreshToken) {
      return res
        .status(401)
        .json({ message: "No se proporcionó el token de renovación" });
    }
    const newAccessToken = await renovarAccessToken(refreshToken);
    res.json({ accessToken: newAccessToken });
  } catch (error) {
    console.log(error);
    res.status(403).json({ message: "Token inválido o expirado" });
  }
};
