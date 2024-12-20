import {
  getProduct,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  deleteDefinitiveProduct,
  getProductsPaginados,
  getProductsFiltrados
} from "../service/serviceProducto.js";
import { validationResult } from "express-validator";
export const getProductsController = async (req, res) => {
  try {
    const products = await getProducts();
    res.status(200).json({status: "success", menssage: "productos obtenidos", data:products});
  } catch (error) {
    console.log(error);
    res.status(500).json({status: "error", menssage: "error en el servidor", data:{}});
  }
};

export const getProductsFiltradosController = async (req, res) => {
  try {
    const { name, priceMin, priceMax, sortBy, order } = req.query;
    const products = await getProductsFiltrados(name, priceMin, priceMax, sortBy, order);
    res.status(200).json({status: "success", menssage: "productos obtenidos", data:products});
  } catch (error) {
    console.log(error);
    res.status(500).json({status: "error", menssage: "error en el servidor", data:{}});
  }
};

export const getProductsPaginadoController = async (req, res) => {
  try {
    const {page = 1, limit = 10} = req.query;
    const offset = (page - 1) * limit;
    const products = await getProductsPaginados(offset,limit,page);
    res.status(200).json({status: "success", menssage: "productos obtenidos", data:products});
  } catch (error) {
    console.log(error);
    res.status(500).json({status: "error", menssage: "error en el servidor", data:{}});
  }
};

export const getProductController = async (req, res) => {
  try {
    const id = req.params.id;
    const producto = await getProduct(id);
    if (!producto) {
      return res.status(400).json({status: "error", menssage: "producto no encontrado", data:{}});
    }
    res.status(200).json({status: "success", menssage: "Producto encontrado", data:producto});
  } catch (error) {
    res.status(500).json({status: "error", menssage: "error en el servidor", data:{}});
  }
};

export const createProductController = async (req, res) => {
  try {
    const { nombre="asd", precio } = req.body;
    const errors = validationResult(req);
    console.log(errors)
    if (!errors.isEmpty()) {
      return res.status(400).json({status: "error", menssage: "faltan datos", data:{}, errors: errors.array() });
    }
    const producto = await createProduct(nombre, precio);
    return res.status(201).json({status: "success", menssage: "Producto creado", data:producto});
  } catch (error) {
    console.log(error);
    return res.status(500).json({status: "error", menssage: "error en el servidor", data:{}});
  }
};

export const updateProductController = async (req, res) => {
  try {
    const id = req.params.id;
    const { nombre, precio } = req.body;
    const producto = await updateProduct(id, nombre, precio);
    res.status(200).json({status: "success", menssage: "Producto actualizado", data:producto});
  } catch (error) {
    return res.status(500).json({status: "error", menssage: "error en el servidor", data:{}});
  }
};

export const deleteProductController = async (req, res) => {
  try {
    const id = req.params.id;
    const producto = await deleteProduct(id);
    res.status(200).json({status: "success", menssage: "Producto borrado", data:producto});
  } catch (error) {
    return res.status(500).json({status: "error", menssage: "error en el servidor", data:{}});
  }
};

export const deleteDefinitiveProductController = async (req, res) => {
    try {
        const id = req.params.id;
        const producto = await deleteDefinitiveProduct(id);
        res.status(200).json({status: "success", menssage: "Producto borrado", data:producto});
    } catch (error) {
        return res.status(500).json({status: "error", menssage: "error en el servidor", data:{}});
    }
};
