import express from "express";
import productosRouter from "./router/productosRouter.js";
import mongoose from "mongoose";
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json' assert { type: 'json' };



const app = express();
const PORT =3000;
app.use(express.json());
app.use("/productos",productosRouter)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
mongoose.connect("mongodb://localhost:27017/backblogs",{useNewUrlParser:true,useUnifiedTopology:true}).then(() => console.log("Conectado a la base de datos")).catch((error) => console.log(error));

app.listen(PORT, () => {
    console.log("Servidor escuchando en el puerto", PORT);
});