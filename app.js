const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const multer = require("multer");
const path = require("path");
const XLSX = require("xlsx");

// Configurar dependencias
const app = express();
app.set("view engine","ejs");
const storage = multer.memoryStorage();
const upload = multer({storage: storage});

app.post("/subir_excel",upload.single("archivoExcel"),(req, res)=>{
    // Comprobar que el archivo existe 
    if(!req.file) return res.status(400).send("No se subió ningun archivo");
    // Procesar archivo excel en memoria
    const buffer = req.file.buffer;
    // Leer workbook con xlsx
    const workbook = XLSX.read(buffer, {type: "buffer"});

    // Asumiendo que queremos la primera hoja
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    
    // Convertir hoja a JSON
    const datos = XLSX.utils.sheet_to_json(worksheet);

    // datos => arreglo de objetos con las filas
    console.log(datos);

    /* Aqui podemos procesar los datos para crear portafolios */
    //Ex: res.json(datos);

    res.send("Archivo procesado con exito");
})


// Servir arhivos estáticos desde /Public
app.use(express.static("public"));
// Middleware para poder leer JSON o formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("✅ Conexión a MongoDB exitosa"))
.catch(err => console.error("❌ Error al conectar a MongoDB:", err));

/* PAGINAS */
//Page -> Crear nuevo usuario
const Usuario = require("./models/Usuario_Schema")
app.get("/crear-usuario",async (req,res)=>{
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
//Page -> Listar Usuarios
app.get("/Usuarios",async (req,res)=>{
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
//Page -> Subir Catalogo
app.get("/Subir_Portafolios",(req,res)=>{
    res.render("subir_portafolios");
})

//Page -> Main Page
app.get("/",(req,res)=>{
    res.render("index.ejs");
})

//Para matar procesos zombies
//netstat -ano | findstr :3000
//taskkill /PID 9840 /F
app.listen(3000, (req,res)=>{
    console.log("🚀 Servidor corriendo en http://localhost:3000");
})

// Manejo de cierre controlado
process.on('SIGINT', async () => {
    console.log('\n🛑 Cerrando servidor...')
    await mongoose.connection.close()
        .then(()=>console.log('\n🛑 Conexión a MongoDB cerrada'))
        .catch(err => console.log("⚠ Error cerrando MongoDB:", err))
    process.exit(0);
});