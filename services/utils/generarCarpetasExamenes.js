function generarCarpetasExamenes(asignatura) {
    const creditos = asignatura.creditos || 0;

    const examenesBase = [
        { tipo: "entrada", enunciado: [], solucion: [], asistencia: [], informe: [] },
        { tipo: "primer", enunciado: [], solucion: [], asistencia: [], informe: [] },
        { tipo: "segundo", enunciado: [], solucion: [], asistencia: [], informe: [] }        
    ];
    if (creditos >= 4) {
        examenesBase.push({ tipo: "tercer", enunciado: [], solucion: [], asistencia: [], informe: [] });
    }
    
    return {
        examenes: examenesBase
    };
};

module.exports = generarCarpetasExamenes;
