const usuarioSchema = require("../models/Usuario_Schema");
const XLSX = require("xlsx");
const mapUsuarios = require("../excelMappers/mapUsuarios");

exports.renderSubirPagina = (req,res)=>{
    res.render("subir_portafolios");    //Vista .ejs
}

exports.procesarExcel = async (req,res)=>{
    try{
        // Comprobar que el archivo existe 
        if(!req.file) return res.status(400).send("No se subió ningun archivo");
        // Procesar archivo excel en memoria
        const buffer = req.file.buffer;
        // Leer workbook con xlsx
        const workbook = XLSX.read(buffer, {type: "buffer"});
        
        /* Aqui podemos procesar los datos para crear portafolios */
        // Mapeo Usuarios
        const usuarios = mapUsuarios(workbook);
        
        //res.json({message: "Usuarios Generados", usuarios});    
        res.status(200).json({usuarios}); //Devolverlos como json
    }catch(error){
        console.error("Error al procesar Excel:", error);
        res.status(500).send("Error interno al procesar el archivo.");
    }   
}

exports.guardarUsuarios = async(req,res)=>{
    try{
        const usuarios = req.body.usuarios;
        for(const usuario of usuarios){
            const nuevoUsuario = new usuarioSchema(usuario);
            await nuevoUsuario.save();
        }
        res.status(200).json({message: "Usuarios guardados con éxito"});
    }catch(error){
        console.error("Error al guardar usuarios: ",error);
        res.status(500).json({message: "Error al guardar usuarios"})
    }
}