import express from "express";
import productosRouter from "./router/productosRouter.js";

const app = express();
const PORT =3000;
app.use(express.json());
app.use("/productos",productosRouter)

app.listen(PORT, () => {
    console.log("Servidor escuchando en el puerto", PORT);
});