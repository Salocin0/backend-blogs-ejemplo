export let productos = [
  { nombre: "Producto 1", precio: 100 },
  { nombre: "Producto 2", precio: 200 },
  { nombre: "Producto 3", precio: 300 },
];

export const addProducto = (producto) => {
  productos.push(producto);
};
