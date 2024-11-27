import { validationResult } from "express-validator";

const validationMiddleware = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({status: "error", menssage: "Error de validacion", data:{}, errors: errors.array() });
    }
    next();
};

export default validationMiddleware;