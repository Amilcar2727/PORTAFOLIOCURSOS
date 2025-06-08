const usuarioSchema = require("../models/Usuario_Schema");
const XLSX = require("xlsx");
const mapUsuarios = require("../services/mappers/mapUsuarios");
const mapAsignaturas = require("../services/mappers/mapAsignatura");

const generarPortafoliosCursos = require("../services/utils/generarPortafoliosCursos");
const generarPortafolios = require("../services/utils/generarPortafolios");
const generarSemestre = require("../services/utils/generarSemestre");

exports.renderPagina = (req,res)=>{
    res.render("admin/portafolios/subir");    //Vista .ejs
}

exports.procesarExcel = async (req,res)=>{
    try{
        console.log("➡️ Entrando a procesarExcel...");
        
        console.log("Campos en req.body:", req.body);

        // Comprobar que el archivo existe 
        if(!req.file) return res.status(400).send("No se subió ningun archivo");
        // Procesar archivo excel en memoria
        const buffer = req.file.buffer;
        console.log("Archivo recibido, tamaño buffer:", buffer.length);
        // Leer workbook con xlsx
        const workbook = XLSX.read(buffer, {type: "buffer"});
        console.log("Workbook leído");
        
        /* Llamamos a servicios para transformar los datos */
        // Mapeo Usuarios desde excel
        const usuarios = mapUsuarios(workbook);
        console.log("✅ Usuarios mapeados:", usuarios.length);
        // Mapeo Asignaturas desde excel
        const asignaturas = mapAsignaturas(workbook, usuarios);
        console.log("✅ Asignaturas mapeadas:", asignaturas.length);
        // Validar Semestre
        const semestreTexto = req.body.semestre;  // <- desde el form
        const activoCheckbox = req.body.activo;
        const semestre = generarSemestre(semestreTexto, activoCheckbox);
        console.log("✅ Semestre generado:", semestre);
        // Generacion Portafolios Cursos (Incluye Examenes)
        const portafoliosCursos = generarPortafoliosCursos(asignaturas);
        console.log("✅ Portafolios_Cursos generados:", portafoliosCursos.length);
        // Generacion Portafolios mismos
        const portafolios = generarPortafolios(usuarios, portafoliosCursos, semestre);
        console.log("✅ Portafolios generados:", portafolios.length);
        console.log("💪 Excel procesado correctamente");
        //res.json({message: "Usuarios Generados", usuarios});    
        return res.render("admin/portafolios/vista_previa", {
            usuarios,
            asignaturas,
            semestre,
            portafoliosCursos,
            portafolios
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
        for(const usuario of usuarios){
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