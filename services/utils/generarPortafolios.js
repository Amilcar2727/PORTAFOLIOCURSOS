const generarCarpetasExamenes = require('./generarCarpetasExamenes');

function generarPortafolios(usuarios, asignaturas, semestre) {
    console.log("Generando portafolios para los usuarios...");
    const examenes = generarCarpetasExamenes(asignaturas);
    return;
}

module.exports = generarPortafolios;
