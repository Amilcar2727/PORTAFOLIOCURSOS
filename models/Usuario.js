const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema({
    codigo: String,
    nombre: String,
    correo: String,
    rol: String,
    contraseña: String,
    fecha_creacion: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Usuario",usuarioSchema,"usuarios");