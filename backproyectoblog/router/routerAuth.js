import express from "express";
import {registrarController, loginController, renovarTokenController } from "./../controller/controllerAuth.js";

const routerAuth = express.Router();

routerAuth.post("/register", registrarController);
routerAuth.post("/login", loginController);
routerAuth.post("/token", renovarTokenController);

export default routerAuth;
