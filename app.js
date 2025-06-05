const express = require("express");
require("dotenv").config();
const {conectarDB, cerrarConexion} = require("./config/mongoose");
// Configurar dependencias
const app = express();
app.set("view engine","ejs");

// Middleware global
app.use(express.static("public")); // Servir arhivos estáticos desde /Public
app.use(express.json());    // Para poder leer JSON o formularios
app.use(express.urlencoded({ extended: true }));

// Conectar a MongoDB
conectarDB();

/* Conectamos rutas */
const usuarioRoutes = require("./routes/usuario.routes");
const cargaAcademicaRoutes = require("./routes/cargaAcademica.routes");

app.use("/carga_academica",cargaAcademicaRoutes);
app.use("/usuarios",usuarioRoutes);

// ==>> Pagina Principal <<==
app.get("/", (req, res) => {
    res.render("index.ejs");
});

//Iniciar el servidor
const server = app.listen(3000, () => {
    console.log("🚀 Servidor corriendo en http://localhost:3000");
});


//Para matar procesos zombies
//netstat -ano | findstr :3000
//taskkill /PID 9840 /F

// Manejo de cierre controlado
process.on('SIGINT', async () => {
    console.log('\n🛑 Cerrando servidor...');
    await cerrarConexion();
    server.close(() => process.exit(0));
});