import { body,query } from "express-validator";

export const registerProductValidation = [
  body("nombre")
    .isString()
    .isLength({ min: 1, max: 100 })
    .withMessage("El nombre debe tener entre 1 y 100 caracteres"),
  body("precio").isNumeric().withMessage("El precio debe ser un número"),
];

export const queryValidation = [
  query('page')
      .optional() // El parámetro es opcional
      .isInt({ min: 1 }) 
      .withMessage('El parámetro "page" debe ser un número entero mayor o igual a 1.'),
  query('nombre')
      .optional() // El parámetro es opcional
      .isString()
      .isLength({ min: 3 })
      .withMessage('El parámetro "search" debe tener al menos 3 caracteres.'),
];
