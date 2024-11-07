import { productos, addProducto } from '../db/productosData.js';

export const getProductos = () => {
  return productos;
};

export const createProducto = (nombre, precio) => {
  const nuevoProducto = { nombre, precio };
  addProducto(nuevoProducto);
  return nuevoProducto;
};
