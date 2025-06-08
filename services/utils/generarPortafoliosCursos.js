const generarCarpetasExamenes = require('./generarCarpetasExamenes');

function generarPortafoliosCursos(asignaturas) {
    console.log("📚 Generando portafoliosCursos...");
    const portafoliosCursos = asignaturas.map(asignatura => {
        const creditos = asignatura.creditos || 0;
        // Generar examenes basados en creditaje
        const examenes = generarCarpetasExamenes(asignatura);

        // Generar material enseñanza basado en creditaje
        const materialEnseñanza = {
            primerParcial: [],
            segundoParcial: [],
        }
        if (creditos >= 4) {
            materialEnseñanza.tercerParcial = [];
        }

        return{
            asignaturaId: `${asignatura.codigo}_${asignatura.tipo}_${asignatura.grupo}_${asignatura.docenteId}`,
            silabos: {
                silaboUNSAAC: [],
                silaboICACIT: [],
                registroEntrega: []
            },
            avanceAcademico: [],
            materialEnseñanza, //Tambien depende del creditaje
            asignaciones: [],
            enunciadoExamenes: examenes, //Depende del creditaje de la asignatura
            trabajosEstudiantes:{
                excelente: [],
                bueno: [],
                regular: [],
                malo: [],
                pobre: []
            },
            archivosDoc:{
                asistenciaAlumnos: [],
                registroNotasCC: [],
                cierrePortafolio: []
            }
        };
    });
    return portafoliosCursos;
}

module.exports = generarPortafoliosCursos;
