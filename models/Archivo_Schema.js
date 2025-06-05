const mongoose = require("mongoose");
const evaluacionSchema = require("./Evaluacion_Schema");
const archivoSchema = new mongoose.Schema({
    nombre: String,
    url: String,
    tipoDoc: String,    //pdf, xlsx, pptx
    fecha_subida:{
        type: Date,
        default: Date.now
    },
    subidoPor:{type: mongoose.Schema.Types.ObjectId, ref: "Usuario"},   //?
    evaluacion: evaluacionSchema
});

module.exports = mongoose.model("Archivo",archivoSchema,"archivos");