const mongoose = require("mongoose");

const semestreSchema = new mongoose.Schema({
    nombre: String,
    activo: {type: Boolean, default: false}
});

module.exports = mongoose.model("Semestre",semestreSchema,"semestres");