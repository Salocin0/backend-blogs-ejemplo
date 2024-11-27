import express from "express";
import {
  getProductController,
  getProductsController,
  getProductsFiltradosController,
  getProductsPaginadoController,
  updateProductController,
  createProductController,
  deleteProductController,
  deleteDefinitiveProductController,
} from "../controller/controllerProducto.js";
import { body, query, param } from "express-validator";
import { registerProductValidation } from "../validations/productoValidation.js";
import validationMiddleware from "../middleware/validationsMiddleware.js";
const routerProducto = express.Router();

routerProducto.get("/", getProductsController);
routerProducto.get("/paginado/", getProductsPaginadoController);
routerProducto.get("/filtrado/", getProductsFiltradosController);
routerProducto.get("/:id", getProductController);
routerProducto.post(
  "/",
  [
    body("nombre")
      .isString()
      .isLength({ min: 1, max: 100 })
      .withMessage("El nombre debe tener entre 1 y 100 caracteres"),
    body("precio").isNumeric().withMessage("El precio debe ser un número"),
  ],
  createProductController
);

//routerProducto.post( "/", registerProductValidation, validationMiddleware, createProductController);

routerProducto.put("/:id",  updateProductController);
routerProducto.delete("/:id", deleteProductController);
routerProducto.delete(
  "/definitivo/:id",
  deleteDefinitiveProductController
);

export default routerProducto;
