const mongoose = require("mongoose");
const archivoSchema = require("./Archivo_Schema");

const examenSchema = new mongoose.Schema({
    enunciado: [archivoSchema],
    solucion: [archivoSchema],
    asistencia: [archivoSchema],
    informe: [archivoSchema]
});

module.exports = mongoose.model("Examen",examenSchema,"examenes");