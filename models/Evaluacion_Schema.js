const mongoose = require("mongoose");

const evaluacionSchema = new mongoose.Schema({
    archivoId: {type: mongoose.Schema.Types.ObjectId, ref: "Archivo"},
    evaluadorId: {type: mongoose.Schema.Types.ObjectId, ref: "Usuario"},
    comentario: String,
    fecha:{
        type: Date,
        default: Date.now
    },
    estado:{
        type: String,
        enum: ["Pendiente","Correcto","Observado"],
        default:"Pendiente"
    }
});

module.exports = mongoose.model("Evaluacion",evaluacionSchema,"evaluaciones");