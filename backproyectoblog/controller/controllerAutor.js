import { getAutor, getAutores, createAutor, updateAutor, deleteAutor } from "../service/serviceAutor.js";
export const getautorescontroller = async (req, res) => {
    try {
        const autores = await getAutores();
        if(autores.length === 0){ 
            return res.status(400).json({status: "error", menssage: "autores no encontrados", data:{}});
        }
        return res.status(200).json({status: "success", menssage: "autores obtenidos", data:blogs});
    } catch (error) {
        return res.status(500).json({status: "error", menssage: "error en el servidor", data:{}});
    }
}
export const getautorcontroller = async (req, res) => {
    try {
        const id = req.params.id;
        const autor = await getAutor(id);
        if(!autor){
            return res.status(400).json({status: "error", menssage: "autor no encontrado", data:{}});
        }
        return res.status(200).json({status: "success", menssage: "autor obtenido", data:autor});
    } catch (error) {
        return res.status(500).json({status: "error", menssage: "error en el servidor", data:{}});
    }
}

export const createautorcontroller = async(req, res) => {
    try {
        const {nombre,biografia,fechaNacimiento,redSocial,fotoPerfil} = req.body;
        
        if (!nombre || !biografia || !fechaNacimiento || !redSocial || !fotoPerfil) {
            return res.status(400).json({status: "error", menssage: "faltan datos", data:{}});
        }
        
        const autor = await createAutor(nombre,biografia,fechaNacimiento,redSocial,fotoPerfil);
        
        if(autor){
            return res.status(201).json({status: "success", menssage: "blog creado", data:autor});
        }else{
            return res.status(400).json({status: "error", menssage: "blog no creado", data:{}});
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({status: "error", menssage: "error en el servidor", data:{}});
    }
}
export const updateautorcontroller = async (req, res) => {
    try {
        const id = req.params.id;
        const {nombre,biografia,fechaNacimiento,redSocial,fotoPerfil} = req.body;

        if (!nombre || !biografia || !fechaNacimiento || !redSocial || !fotoPerfil) {
            return res.status(400).json({status: "error", menssage: "faltan datos", data:{}});
        }

        let autor = await updateAutor(id,nombre,biografia,fechaNacimiento,redSocial,fotoPerfil);

        if (autor) {
            autor = await getAutor(id);
            return res.status(200).json({status: "success", menssage: "blog actualizado", data:autor});
        } else {
            return res.status(400).json({status: "error", menssage: "blog no actualizado", data:{}});
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({status: "error", menssage: "error en el servidor", data:{}});
    }
}
export const deleteautorcontroller = async (req, res) => {
    try {
        const id = req.params.id;
        let autor = await deleteAutor(id);
        if (autor) {
            autor = await getAutor(id);
            return res.status(200).json({status: "success", menssage: "blog eliminado", data:autor});
        }else{
            return res.status(400).json({status: "error", menssage: "blog no eliminado", data:{}});
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({status: "error", menssage: "error en el servidor", data:{}});
    }
}