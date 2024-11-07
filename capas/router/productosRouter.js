import express from 'express';
import { obtenerProductos,agregarProducto } from '../controller/productosController.js';

const productosRouter = express.Router();

productosRouter.get('/', obtenerProductos);
productosRouter.post('/', agregarProducto);

export default productosRouter;
