const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const usuarioSchema = new mongoose.Schema({
    codigo: {type: String, required: true},
    nombre: {type: String, required: true},
    correo: {type: String, required: true},
    rol: {
        type: String,
        enum: ["Docente","Evaluador","Usuario","Administrador"],
        required: true,
        default: "Docente"
    },
    contraseña:{
        type: String,
        required: true
    },
    fecha_creacion: {
        type: Date,
        default: Date.now
    }
});
//Mudarlo despues...
//Hasheamos la contraseña
usuarioSchema.pre("save", async function(next){
    if(!this.isModified("contraseña")) return next();
    const salt = await bcrypt.genSalt(10);  // Numero rondas sal
    this.contraseña = await bcrypt.hash(this.contraseña, salt);
    next();
})

//Comprobamos contraseña ingresada con la almacenada
usuarioSchema.methods.CompararContraseña = async function(contraseñaIngresada){
    return await bcrypt.compare(contraseñaIngresada, this.contraseña);
};

module.exports = mongoose.model("Usuario",usuarioSchema,"usuarios");