const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.set("view engine","ejs")

// Servir arhivos estáticos desde /Public
app.use(express.static("public"));
// Middleware para poder leer JSON o formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("✅ Conexión a MongoDB exitosa"))
.catch(err => console.error("❌ Error al conectar a MongoDB:", err));


/*MongoDB*/
//Crear nuevo usuario
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
app.get("/Usuarios",async (req,res)=>{
    try{
        const usuarios = await Usuario.find();
        res.render("test", { usuarios });
    }catch(err){
        console.log(err);
        res.status(500).send("Error al cargar la pagina");
    };
})
app.get("/",(req,res)=>{
    res.render("index");
})

app.listen(3000, (req,res)=>{
    console.log("🚀 Servidor corriendo en http://localhost:3000");
})

// 💥 Manejo de cierre controlado
process.on('SIGINT', async () => {
    await mongoose.connection.close();
    console.log('\n🛑 Conexión a MongoDB cerrada por Ctrl+C');
});