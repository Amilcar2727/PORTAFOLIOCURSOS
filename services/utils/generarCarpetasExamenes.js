function generarCarpetasExamenes(asignaturas) {
    console.log("Generando carpetas de examenes para asignaturas...");
    return asignaturas.map(asignatura => {
        return {
            asignatura,
            examenes: [
                { tipo: "entrada", enunciado: [], solucion: [], asistencia: [], informe: [] },
                { tipo: "primer", enunciado: [], solucion: [], asistencia: [], informe: [] },
                { tipo: "segundo", enunciado: [], solucion: [], asistencia: [], informe: [] },
                { tipo: "tercer", enunciado: [], solucion: [], asistencia: [], informe: [] }
            ]
        };
    });
    
};

module.exports = generarCarpetasExamenes;
