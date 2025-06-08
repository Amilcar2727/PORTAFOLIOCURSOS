const mongoose = require("mongoose");
const archivoSchema = require("./Archivo_Schema");
const examenSchema = require("./Examen_Schema");

const portafolioCursoSchema = new mongoose.Schema({
    portafolioId: {type: mongoose.Schema.Types.ObjectId, ref: "Portafolio"},
    asignaturaId: {type: String, required: true},

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

module.exports = mongoose.model("PortafolioCurso",portafolioCursoSchema,"portafolios_cursos");