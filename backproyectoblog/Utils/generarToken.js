import jwt from "jsonwebtoken";

const JWT_ACCESS = process.env.JWT_ACCESS;
const JWT_REFRESH = process.env.JWT_REFRESH;
const JWT_ACCESS_EXPIRES = process.env.JWT_ACCESS_EXPIRES;
const JWT_REFRESH_EXPIRES = process.env.JWT_REFRESH_EXPIRES;

export const generarAccessToken = payload => {
    const expiraEn = JWT_ACCESS_EXPIRES || 60*15 // 15 minutos
    const token = jwt.sign(payload, JWT_ACCESS, {expiresIn: expiraEn});
    return token
}

export const generarRefreshToken = payload => {
    const expiraEn = JWT_REFRESH_EXPIRES || 60*60*24*30 // 30 dias
    const token = jwt.sign(payload, JWT_REFRESH, {expiresIn: expiraEn});
    return token
}