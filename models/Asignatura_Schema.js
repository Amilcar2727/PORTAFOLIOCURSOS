const mongoose = require("mongoose");
const semestreSchema = require("./Semestre_Schema");

const asignaturaSchema = new mongoose.Schema({
    semestre: semestreSchema,
    codigo: String,
    //categoria: {type: String, enum: ["OEES","EEEP","AEX","EG"]},
    carrera: String,
    nombre: String,
    creditos: Number,
    grupo: {type: String, enum: ["A","B"], default: "A"},
    horasTeoricas: Number,
    dias: [String],
    horaInicio: String,
    horaFin: String,
    aula: String,
    aforoLimite: Number,
    numMatriculados: Number,
    docenteId: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario" },
    desactivado: {type: Boolean, default: false}
});

module.exports = mongoose.model("Asignatura",asignaturaSchema,"asignatura");