const XLSX = require("xlsx");

function mapUsuarios(workbook){
    console.log("📄 Mapeando los usuarios");
    //* Hoja 4: Datos Docentes*/
    const sheetNameDocentes = workbook.SheetNames[3];
    const workSheetDocentes = workbook.Sheets[sheetNameDocentes];
    const datosDocentes = XLSX.utils.sheet_to_json(workSheetDocentes,{defval: null, range:1});
    
    //* Hoja 2: Datos con grados academicos*/
    const sheetNameGrados = workbook.SheetNames[1];
    const workSheetGrados = workbook.Sheets[sheetNameGrados];
    const encabezadoGrado = workSheetGrados["B2"]?.v?.toString().trim() || "GRADO";
    const encabezadoNombre = workSheetGrados["C2"]?.v?.toString().trim() || "NOMBRES Y APELLIDOS";
    
    const datosGrados = XLSX.utils.sheet_to_json(workSheetGrados,{
        range: "B5:C81",
        header: [encabezadoGrado, encabezadoNombre],
        defval: null
    });
    //--- Extraemos nombres unicos de docentes de la hoja 4
    const docentesUnicos = [...new Set(
        datosDocentes.map(d=> d["DOCENTE"]?.toString().trim()).filter(Boolean)
    )];

    //--- Mapeamos grados a docente para rápido acceso
    const gradoMap = {};
    datosGrados.forEach(g=>{
        const nombre = g["NOMBRES Y APELLIDOS"]?.toString().trim();
        const grado = g["GRADO"]?.toString().trim();
        if (nombre && grado) {
            gradoMap[nombre] = grado;
        }
    })

    const usuarios = docentesUnicos
        .filter(nombre=>gradoMap[nombre])
        .map((nombreDocente, index)=>{
            const contraseñaPlano = nombreDocente.toLowerCase().replace(/\s+/g, "");

        return{
            codigo: (index + 1).toString().padStart(4, "0"),
            nombre: nombreDocente,
            correo: "-",
            grado: gradoMap[nombreDocente] || "Lic.",
            rol: "Docente",
            contraseña: contraseñaPlano,
        };
    });
    return usuarios;
}

module.exports = mapUsuarios;