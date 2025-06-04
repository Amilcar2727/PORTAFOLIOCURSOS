const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.set("view engine","ejs")

// Middleware para poder leer JSON o formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("✅ Conexión a MongoDB exitosa"))
.catch(err => console.error("❌ Error al conectar a MongoDB:", err));

/*MongoDB*/
const Usuario = require("./models/Usuario")
app.get("/crear-usuario",async (req,res)=>{
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
/*Obtener paginas web*/
app.get("/Portafolio",(req,res)=>{
    Usuario.find({}).
    then(function(users){
        res.render("test",{usuarios: users});
    }).catch(err=>{
        console.log(err);
        res.status(500).send("Error al cargar la pagina");
    });
})
app.get("/Test",(req,res)=>{
    res.render("test");
})

//EJS -> Template engine - Node

app.listen(3000, (req,res)=>{
    console.log("Corriendo desde el puerto 3000");
})