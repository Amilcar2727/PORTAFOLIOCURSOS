function generarPortafolios(usuarios, portafoliosCursos, semestre) {
    const portafolios = [];

    console.log("🗂 Generando portafolios...");
    usuarios.forEach(usuario => {
        // Filtrar portafoliosCursos cuyo asignaturaId incluye el usuario._id (es lo que pusiste al final del id)
        const cursosDelDocente = portafoliosCursos.filter(curso => {
            return curso.asignaturaId.includes(usuario.codigo);
        });

         // Extraer el id del curso, asignaturaId simula el id del curso
        const cursosIds = cursosDelDocente.map(curso => curso.asignaturaId);

        // Crear el portafolio
        const nuevoPortafolio = {
            docenteId: usuario.codigo,
            semestre: semestre,
            creadoEn: new Date(),
            presentacion: {
                caratula: [],
                cargaAcademica: [],
                filosofiaDoc: [],
                cv: []
            },
            cursos: cursosIds
        };

        portafolios.push(nuevoPortafolio);
    });

    return portafolios;
}

module.exports = generarPortafolios;