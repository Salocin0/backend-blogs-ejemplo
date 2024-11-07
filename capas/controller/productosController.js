import { getProductos, createProducto } from "../service/productosService.js";

export const obtenerProductos = (req, res) => {
  const productos = getProductos();
  res.json(productos);
};

export const agregarProducto = (req, res) => {
  const { nombre, precio } = req.body;

  if (!nombre || !precio) {
    return res.status(400).json({ error: 'El nombre y precio son obligatorios' });
  }

  const nuevoProducto = createProducto(nombre, precio);
  res.status(201).json({ message: 'Producto agregado', producto: nuevoProducto });
};
