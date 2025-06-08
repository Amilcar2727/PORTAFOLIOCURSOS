const mongoose = require("mongoose");
const semestreSchema = require("./Semestre_Schema");

const asignaturaSchema = new mongoose.Schema({
    semestre: semestreSchema,
    codigo: {type: String, required: true},
    //categoria: {type: String, enum: ["OEES","EEEP","AEX","EG"]},
    carrera: String,
    nombre: String,
    creditos: Number,
    tipo: {type: String, enum: ["T","P"], default: "T"},
    grupo: {type: String, enum: ["A","B"], default: "A"},
    horasTeoricas: Number,
    horasPracticas: Number,
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