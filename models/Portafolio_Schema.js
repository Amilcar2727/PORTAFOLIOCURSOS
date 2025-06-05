const mongoose = require("mongoose");
const archivoSchema = require("./Archivo_Schema");
const semestreSchema = require("./Semestre_Schema");
const examenSchema = require("./Examen_Schema");

const portafolioSchema = new mongoose.Schema({
    docenteId: {type: mongoose.Schema.Types.ObjectId, ref: "Usuario"},
    cursoId: {type: mongoose.Schema.Types.ObjectId, ref: "Asignatura"},
    semestre: semestreSchema,
    creadoEn: {type: Date, default: Date.now},
    presentacion:{
        caratula: [archivoSchema],
        cargaAcademica: [archivoSchema],
        filosofiaDoc: [archivoSchema],
        cv: [archivoSchema],
    },

    silabos:{
        silaboUNSAAC: [archivoSchema],
        silaboICACIT: [archivoSchema],
        registroEntrega: [archivoSchema]
    },

    avanceAcademico: [archivoSchema],

    materialEnseñanza:{
        primerParcial: [archivoSchema],
        segundoParcial: [archivoSchema],
        tercerParcial: [archivoSchema],
    },

    asignaciones: [archivoSchema],

    enunciadoExamenes:[examenSchema],   //Por Creditaje agregaremos cambiaremos el tipo 

    trabajosEstudiantes:{
        excelente: [archivoSchema],
        bueno: [archivoSchema],
        regular: [archivoSchema],
        malo: [archivoSchema],
        pobre: [archivoSchema],
    },

    archivosDoc:{
        asistenciaAlumnos: [archivoSchema],
        registroNotasCC: [archivoSchema],
        cierrePortafolio: [archivoSchema] 
    },
});

module.exports = mongoose.model("Portafolio",portafolioSchema,"portafolios");