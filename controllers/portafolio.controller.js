const usuarioSchema = require("../models/Usuario_Schema");
const XLSX = require("xlsx");
const mapUsuarios = require("../services/mappers/mapUsuarios");
const mapAsignaturas = require("../services/mappers/mapAsignatura");

const generarPortafolios = require("../services/utils/generarPortafolios");
const validarSemestre = require("../services/utils/validarSemestre");
exports.renderPagina = (req,res)=>{
    res.render("admin/portafolios/subir");    //Vista .ejs
}

exports.procesarExcel = async (req,res)=>{
    try{
        // Comprobar que el archivo existe 
        if(!req.file) return res.status(400).send("No se subió ningun archivo");
        // Procesar archivo excel en memoria
        const buffer = req.file.buffer;
        // Leer workbook con xlsx
        const workbook = XLSX.read(buffer, {type: "buffer"});
        
        /* Llamamos a servicios para transformar los datos */
        // Mapeo Usuarios desde excel
        const usuarios = mapUsuarios(workbook);
        // Mapeo Asignaturas desde excel
        const asignaturas = mapAsignaturas(workbook, usuarios);
        // Validar Semestre
        const semestre = validarSemestre(req.body.semestre); // <- desde el form
        
        // Generacion Portafolios (Incluye Examenes)
        //const portafolios = generarPortafolios(usuarios, asignaturas, semestre);

        //res.json({message: "Usuarios Generados", usuarios});    
        res.render("admin/portafolios/vista_previa",{
            usuarios,
            asignaturas,
        //    semestre,
        //    examenes,
        //    portafolios
        });
    }catch(error){
        console.error("Error al procesar Excel:", error);
        res.status(500).send("Error interno al procesar el archivo.");
    }   
}

exports.guardarTodo = async(req,res)=>{
    const {usuarios, asignaturas, semestre, examenes, portafolios} = req.body;
    try{
        // Validaciones extras talvez
        // Guardar Usuarios
        for(const usuario of usuarios){s
            const existe = await usuarioSchema.findOne({ codigo: usuario.codigo });
            if (!existe) {
                const nuevoUsuario = new usuarioSchema(usuario);
                await nuevoUsuario.save();
            }
        }
        // TODO: Guardar Asignaturas
        // TODO: Guardar Semestre
        // TODO: Guardar Examenes
        // TODO: Guardar Portafolios

        res.status(200).json({message: "Todo guardado con éxito"});
    }catch(error){
        console.error("Error al guardar: ",error);
        res.status(500).json({message: "Error interno al guardar los datos."});
    }
}