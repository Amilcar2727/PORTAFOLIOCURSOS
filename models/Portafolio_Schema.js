const mongoose = require("mongoose");
const archivoSchema = require("./Archivo_Schema");
const semestreSchema = require("./Semestre_Schema");

const portafolioSchema = new mongoose.Schema({
    docenteId: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario" },
    semestre: semestreSchema,
    creadoEn: { type: Date, default: Date.now },
    presentacion:{
        caratula: [archivoSchema],
        cargaAcademica: [archivoSchema],
        filosofiaDoc: [archivoSchema],
        cv: [archivoSchema],
    },
    cursos:[{type: mongoose.Schema.Types.ObjectId, ref: "PortafolioCurso"}]
});

module.exports = mongoose.model("Portafolio",portafolioSchema,"portafolios");