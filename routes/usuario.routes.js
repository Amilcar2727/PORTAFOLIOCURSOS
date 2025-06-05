const express = require("express");
const router = express.Router();
const Usuario = require("../models/Usuario_Schema");
const mongoose = require("mongoose");

//Page -> Crear nuevo usuario
router.get("/crear-usuario",async (req,res)=>{
    if (mongoose.connection.readyState !== 1) {
        return res.status(500).send("❌ Error: No hay conexión al Servidor.");
    }
    const nuevoUsuario = new Usuario({
        codigo: "200822",
        nombre: "Amilcar Estacio",
        correo: "bambino.amil.27@gmail.com",
        rol: "Evaluador",
        contraseña: "123456"
    });
    await nuevoUsuario.save();
    res.send("✅ Usuario creado y guardado en MongoDB");
    console.log("✅ Usuario creado y guardado en MongoDB");
})

//Page -> Main Page
router.get("/",async(req,res)=>{
    if (mongoose.connection.readyState !== 1) {
        return res.status(500).send("❌ Error: No hay conexión al Servidor.");
    }
    try{
        const usuarios = await Usuario.find();
        res.render("usuarios_page.ejs", { usuarios });
    }catch(err){
        console.log(err);
        res.status(500).send("Error al cargar la pagina");
    };
})

module.exports = router;
