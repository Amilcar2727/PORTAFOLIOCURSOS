const mongoose = require("mongoose");
const archivoSchema = require("./Archivo_Schema");

const examenSchema = new mongoose.Schema({
    tipo:{
        type: String,
        enum: ["entrada","primer","segundo","tercer"],
        required: true
    },
    enunciado: [archivoSchema],
    solucion: [archivoSchema],
    asistencia: [archivoSchema],
    informe: [archivoSchema]
});

module.exports = mongoose.model("Examen",examenSchema,"examenes");