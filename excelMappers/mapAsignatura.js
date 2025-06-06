const XLSX = require("xlsx");

/**
 * 
 * @param {*} workbook 
 * @param {*} usuarios Lista de usuarios ya mapeados, para hacer match por nombre con el docente
 * @returns 
 * 
 */

function mapAsignaturas(workbook, usuarios) {
    const sheetName = workbook.SheetNames[3]; // Hoja 4
    const workSheet = workbook.Sheets[sheetName];
    const datos = XLSX.utils.sheet_to_json(workSheet, { defval: null, range: 1 });

    console.log("Mapeando asignaturas desde hojas: ", sheetName);

    const asignaturas = datos.map((fila, index) => {
        const dias = fila["DIA"] ? [fila["DIA"].toString().trim()] : [];

        // Match del docente con los usuarios ya mapeados
        const nombreDocente = fila["DOCENTE (Nombre)"]?.toString().trim();
        const docente = usuarios.find(u => u.nombre.trim().toLowerCase() === nombreDocente?.toLowerCase());
        
        return {
            //TODO: Semestre: Asignarlo fuera del mapeo, mediante input del usuario
            codigo: fila["CODIGO"]?.toString().trim() || `NO-COD-${index}`,
            //TODO: categoria: "EG" // Lo vamos a implementar lueeeego
            carrera: fila["CARRERA"]?.toString().trim() || "-",
            nombre: fila["CURSO"]?.toString().trim() || "-",
            creditos: Number(fila["CRED"] || 0),
            grupo: fila["GPO"]?.toString().trim() || "A",
            horasTeoricas: Number(fila["HT"] || 0),
            dias,
            horaInicio: fila["HORA INICIO"]?.toString().trim() || "00",
            horaFin: fila["HORA FIN"]?.toString().trim() || "00",
            aula: fila["AULA"]?.toString().trim() || "-",
            aforoLimite: Number(fila["AFORO LÍMITE"] || 0),
            numMatriculados: Number(fila["Matriculados"] || 0),
            docenteId: docente ? docente._id || null : null, // Si ya existe en Mongo, se puede usar _id real, // se asignará luego cuando se crucen con los usuarios
            desactivado: fila["DESACTIVADO"]?.toString().trim() === "desactivado"
        };
    });

    console.log("Total de Asignaturas mapeadas: ", asignaturas.length);
    return asignaturas;
}

module.exports = mapAsignaturas;
