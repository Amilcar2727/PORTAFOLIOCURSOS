function generarSemestre(semestreTexto, activoCheckbox) {
    if (!semestreTexto) throw new Error("El semestre no puede estar vacío.");

    const regex = /^[0-9]{4}-(I|II)$/;
    if (!regex.test(semestreTexto)) {
        throw new Error("Formato de semestre inválido. Usa formato 2025-I o 2025-II");
    }

    return {
        nombre: semestreTexto.toUpperCase(),
        activo: activoCheckbox === 'on'
    };
}

module.exports = generarSemestre;