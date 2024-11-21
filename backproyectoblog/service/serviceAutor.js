import Autor from "../model/modelAutor.js";
import crypto from "crypto"
export const getAutores = async () => {
    const autores = await Autor.find({isHabilitado: true});
    return autores
}

export const getAutor = async (id) => {
    const autor = await Autor.findOne({id:id});
    return autor
}
export const createAutor = async (nombre,biografia,fechaNacimiento,redSocial,fotoPerfil) => {
    const autor = await Autor.create({id:crypto.randomUUID(),nombre,biografia,fechaNacimiento,redSocial,fotoPerfil});
    return autor
}
export const updateAutor = async (id,nombre,biografia,fechaNacimiento,redSocial,fotoPerfil) => {
    const autor = await Autor.findOneAndUpdate({id:id},{nombre,biografia,fechaNacimiento,redSocial,fotoPerfil})
    return autor
}
export const deleteAutor = async (id) => {
    const autor = await Autor.findOneAndUpdate({id:id},{isHabilitado:false});
    return autor
}