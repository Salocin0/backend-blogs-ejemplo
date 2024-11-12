import mongoose from "mongoose";

const schema = new mongoose.Schema({
    id: { type: Number, required: true },
    nombre: { type: String, required: true },
    precio: { type: Number, required: true },
    eliminado: { type: Boolean, default: false },
});

const Producto = mongoose.model("producto", schema);

export default Producto;