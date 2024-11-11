import express from "express";
import productosRouter from "./router/productosRouter.js";
import mongoose from "mongoose";

const app = express();
const PORT =3000;
app.use(express.json());
app.use("/productos",productosRouter)

mongoose.connect("mongodb://localhost:27017/backblogs",{useNewUrlParser:true,useUnifiedTopology:true}).then(() => console.log("Conectado a la base de datos")).catch((error) => console.log(error));

app.listen(PORT, () => {
    console.log("Servidor escuchando en el puerto", PORT);
});