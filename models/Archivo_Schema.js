const mongoose = require("mongoose");
const evaluacionSchema = require("./Evaluacion_Schema");
const archivoSchema = new mongoose.Schema({
    nombre: String,
    url: String,
    tipoDoc: {
        type: String,
        enum: ["pdf", "docx", "doc", "xlsx", "xls", "xlsm", "pptx", "ppt", "txt", "csv", "odt", "ods", "odp", "zip"]
    },
    fecha_subida:{
        type: Date,
        default: Date.now
    },
    subidoPor:{type: mongoose.Schema.Types.ObjectId, ref: "Usuario"},
    evaluacion: evaluacionSchema
});

module.exports = mongoose.model("Archivo",archivoSchema,"archivos");