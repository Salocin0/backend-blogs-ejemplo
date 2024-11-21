import express from "express";
import { getautorcontroller, getautorescontroller, createautorcontroller, updateautorcontroller, deleteautorcontroller } from "../controller/controllerAutor.js";

const routerAutor = express.Router();

routerAutor.get("/",getautorescontroller)
routerAutor.get("/:id",getautorcontroller) 
routerAutor.post("/",createautorcontroller) 
routerAutor.put("/:id",updateautorcontroller)
routerAutor.delete("/:id",deleteautorcontroller)

export default routerAutor;