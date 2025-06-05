const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema({
    codigo: String,
    nombre: String,
    correo: String,
    rol: {
        type: String,
        enum: ["Docente","Evaluador","Usuario","Administrador"]
    },
    contraseña: String,     //Confidenciabilidad
    fecha_creacion: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Usuario",usuarioSchema,"usuarios");