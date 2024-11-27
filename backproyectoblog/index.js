import express from "express";
import routerProducto from "./router/routerProducto.js";
import cors from "cors";
import env from "dotenv";
import mongoose from "mongoose";
import routerBlog from "./router/routerBlog.js";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json" assert { type: "json" };
import routerAutor from "./router/routerAutor.js";
import compression from "compression";
import zlib from "zlib";
import { brotliCompression } from "./middleware/brotlimiddleware.js";
import { gzipCompression } from "./middleware/gzipmiddleware.js";
import { autenticarToken } from "./middleware/authmiddleware.js";
import routerAuth from "./router/routerAuth.js";

env.config();
const PORT = process.env.PORT || 3000;

const app = express();
/*app.use(
  compression({
      brotli: {
          enabled: true,
          zlib: zlib.constants.BROTLI_PARAM_QUALITY,
      },
  })
);*/

/*app.use(
  compression({
    filter: (req, res) => {
      return compression.filter(req, res);
    },
    threshold: 1024, // Tamaño mínimo en bytes para comprimir (1 KB)
    level: 6, // Nivel de compresión (0-9, donde 9 es máxima compresión)
  })
);*/
app.use(express.json());
app.use(
  cors({
    origin: "*",
    allowedHeaders: ["Content-Type", "Authorization", "x-refresh-token"],
  })
);

app.use("/productos", routerProducto);
app.use("/blogs", routerBlog);
app.use("/autor", routerAutor);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/auth", routerAuth);
app.get("/protected", autenticarToken, (req, res) => {
  res.json({ message: "Acceso permitido", user: req.user });
});


app.get("/pruebacompresion", brotliCompression, (req, res) => {
  const productos = Array.from({ length: 10000 }, (_, i) => ({
    id: i + 1,
    nombre: `Producto ${i + 1}`,
    descripcion: `Descripción del producto ${i + 1}`,
    precio: (Math.random() * 100).toFixed(2),
    disponible: i % 2 === 0,
  }));
  res.json(productos);
});


app.use((req, res) => {
  res.status(404).send("<h1>404<h1>");
});

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
