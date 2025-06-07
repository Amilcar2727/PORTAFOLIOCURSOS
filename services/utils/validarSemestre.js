function validarSemestre(semestreTexto) {
    if (!semestreTexto) return null;

    const regex = /^[0-9]{4}-(I|II)$/;
    if (!regex.test(semestreTexto)) {
        throw new Error("Formato de semestre inválido. Usa formato 2025-I o 2025-II");
    }

    return semestreTexto.toUpperCase(); // opcionalmente forzar mayúsculas
}

module.exports = validarSemestre;
