import express from "express";
import cors from 'cors';

const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(express.json());

//npm install cors
app.use(cors());

// Array of products with initial examples
let productos = [
  { id: 1, nombre: 'Producto 1', precio: 100, eliminado: false },
  { id: 2, nombre: 'Producto 2', precio: 200, eliminado: false },
  { id: 3, nombre: 'Producto 3', precio: 300, eliminado: false }
];
// Mi primer middleware (para todas las rutas y métodos)
app.use((req, res, next) => {
  console.log("Middleware ejecutado");
  const cancelar = false; // Condición para cancelar la solicitud
  
  if (cancelar) {
    return res.status(403).json({ message: 'Acceso denegado' });
  }
  
  // Si no se cancela, continua con el siguiente middleware o ruta
  next();
});

// Middleware solo para la ruta /productos (independiente del método HTTP)
app.use('/productos', (req, res, next) => {
  console.log("Middleware /productos ejecutado");
  next();
});

// Middleware solo para el método GET en la ruta /productos
app.get('/productos', (req, res, next) => {
  console.log("Middleware GET /productos ejecutado");
  next();
});
// Middleware para todos los get de todas las rutas
app.get('*', (req, res, next) => {
  console.log("Middleware para métodos GET ejecutado");
  next();
});



// Route to get all products
app.get('/productos', (req, res) => {
  try {
    res.json(productos.filter(producto => !producto.eliminado)); // Only return non-deleted products
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
});

// Route to get a single product by id
app.get('/productos/:id', (req, res) => {
  try {
    const producto = productos.find(p => p.id === parseInt(req.params.id) && !p.eliminado);
    if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(producto);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el producto' });
  }
});

// Route to add a new product
app.post('/productos', (req, res) => {
  try {
    const { nombre, precio } = req.body;
    if (!nombre || !precio) {
      return res.status(400).json({ error: 'El nombre y precio son obligatorios' });
    }

    const nuevoProducto = { id: Date.now(), nombre, precio, eliminado: false };
    productos.push(nuevoProducto);

    res.status(201).json({ message: 'Producto agregado', producto: nuevoProducto });
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar el producto' });
  }
});

// Route to update a product by id
app.put('/productos/:id', (req, res) => {
  try {
    const { nombre, precio } = req.body;
    const producto = productos.find(p => p.id === parseInt(req.params.id) && !p.eliminado);

    if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });
    if (nombre) producto.nombre = nombre;
    if (precio) producto.precio = precio;

    res.json({ message: 'Producto actualizado', producto });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el producto' });
  }
});

// Route for logical delete
app.delete('/productos/logico/:id', (req, res) => {
  try {
    const producto = productos.find(p => p.id === parseInt(req.params.id));

    if (!producto || producto.eliminado) return res.status(404).json({ error: 'Producto no encontrado o ya eliminado' });
    
    producto.eliminado = true;
    res.json({ message: 'Producto eliminado lógicamente', producto });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el producto lógicamente' });
  }
});

// Route for physical delete
app.delete('/productos/fisico/:id', (req, res) => {
  try {
    const index = productos.findIndex(p => p.id === parseInt(req.params.id));

    if (index === -1) return res.status(404).json({ error: 'Producto no encontrado' });

    const deletedProduct = productos.splice(index, 1);
    res.json({ message: 'Producto eliminado físicamente', producto: deletedProduct[0] });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el producto físicamente' });
  }
});

app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Start the server
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
