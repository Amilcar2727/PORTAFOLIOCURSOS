const mongoose = require("mongoose");

const cursoSchema = new mongoose.Schema({
    codigo: String,
    carrera: String,
    nombre: String,
    creditos: Number,
    grupo: String,
    horasTeoricas: Number,
    horasPracticas: Number,
    dias: [String],
    horaInicio: String,
    horaFin: String,
    aula: String,
    aforoLimite: Number,
    numMatriculados: Number,
    docente: String,    //?
    codDocente: String,     //?
    area: String,
    desactivado: {type: Boolean, default: false}
});

module.exports = mongoose.model("Curso",cursoSchema,"cursos");