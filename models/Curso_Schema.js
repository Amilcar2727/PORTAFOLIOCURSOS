const mongoose = require("mongoose");
const semestreSchema = require("./Semestre_Schema");

const cursoSchema = new mongoose.Schema({
    codigo: String,
    carrera: String,
    semestre: semestreSchema,
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
    docenteId: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario" },
    area: String,
    desactivado: {type: Boolean, default: false}
});

module.exports = mongoose.model("Curso",cursoSchema,"cursos");