const XLSX = require("xlsx");

function mapAsignaturas(workbook, usuarios) {
    const sheetName = workbook.SheetNames[3]; // Hoja 4
    const workSheet = workbook.Sheets[sheetName];

    const datos = XLSX.utils.sheet_to_json(workSheet, { defval: null, range: 1 });
    console.log("📝 Mapeando asignaturas");
    const agrupadas = {};

    const regexCodigoValido = /^IF\d{3}[A-Z]{3}$/;

    datos.forEach((fila, index) => {
        const codigo = fila["CODIGO"]?.toString().trim() || `NO-COD-${index}`;
        const tipo = fila["TIPO"]?.toString().trim() || "T";
        const grupo = fila["GPO"]?.toString().trim() || "A";
        const nombre = fila["CURSO"]?.toString().trim();
        const carrera = fila["CARRERA"]?.toString().trim();

        // Validar si es una fila valida
        const filaValida = (regexCodigoValido.test(codigo) || (nombre && carrera));
        if (!filaValida) return;

        const codigoFinal = codigo || `NO-COD-${index}`;
        const nombreFinal = nombre || "-";
        const carreraFinal = carrera || "-";

        const nombreDocente = fila["DOCENTE"]?.toString().trim();
        const docente = usuarios.find(u => u.nombre.trim().toLowerCase() === nombreDocente?.toLowerCase());
        const docenteId = docente ? docente.codigo : null;

        const clave = `${codigo}_${grupo}_${tipo}_${docenteId}_${nombre}`;

        // Matriculados
        const numMatriculados = Number(fila["Matriculados"] || 0);
        const desactivadoPorMatricula = numMatriculados === 0 || numMatriculados < 7;
        const desactivadoManual = fila["DESACTIVADO"]?.toString().trim().toLowerCase() === "desactivado";
        const desactivado = desactivadoPorMatricula || desactivadoManual;

        if (!agrupadas[clave]) {
            agrupadas[clave] = {
                codigo: codigoFinal,
                carrera: carreraFinal,
                nombre: nombreFinal,
                creditos: Number(fila["CRED"] || 0),
                tipo,
                grupo,
                horasTeoricas: Number(fila["HT"] || 0),
                horasPracticas: Number(fila["HP"] || 0),
                dias: [],
                horaInicio: fila["HORA\r\nINICIO"] != null ? String(fila["HORA\r\nINICIO"]).trim() : "00",
                horaFin: fila["HORA\r\nFIN"] != null ? String(fila["HORA\r\nFIN"]).trim() : "00",
                aula: fila["AULA"]?.toString().trim() || "-",
                aforoLimite: Number(fila["AFORO LÍMITE"] || 0),
                numMatriculados: Number(fila["Matriculados"] || 0),
                docenteId,
                desactivado
            };
        }

        const dia = fila["DIA"]?.toString().trim();
        if (dia && !agrupadas[clave].dias.includes(dia)) {
            agrupadas[clave].dias.push(dia);
        }
    });
    return Object.values(agrupadas);
}

module.exports = mapAsignaturas;
