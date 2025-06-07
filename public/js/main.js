document.addEventListener('DOMContentLoaded', () => {
    const boton = document.getElementById('miBoton');
    const mensaje = document.getElementById('mensaje');
    if(boton && mensaje){
        boton.addEventListener('click', () => {
        mensaje.textContent = 'Hola';
        });
    }

    const formSubida = document.getElementById('form-subida');
    if(formSubida){
        console.log("📦 main.js cargado correctamente");

        // formSubida.addEventListener('submit', async (e) => {
        //     e.preventDefault();
        //     const formData = new FormData(e.target);
        //     const response = await fetch("/admin/portafolios/procesar",{
        //         method: "POST",
        //         body: formData
        //     });

        //     if (response.ok){
        //         const data = await response.json();
        //         const tbody = document.querySelector("#tabla-previa tbody");
        //         tbody.innerHTML = "";

        //         data.asignaturas.forEach(asignatura => {
        //             const usuario = data.usuarios.find(u => u.codigo === asignatura.codigoDocente);
        //             const row = document.createElement("tr");
        //             row.innerHTML = `
        //                 <td>${asignatura.idPortafolioCurso}</td>
        //                 <td>${usuario?.codigo || "?"}</td>
        //                 <td>${usuario?.nombre || "Desconocido"}</td>
        //                 <td>${asignatura.codigo}</td>
        //                 <td>${asignatura.nombre}</td>
        //             `;
        //             tbody.appendChild(row);
        //         });

        //         // Habilitar boton de confirmacion
        //         document.getElementById("btn-generar").disabled=false;

        //         // Guardar datos localmente para posterior confirmacion
        //         sessionStorage.setItem("asignaturasTemporal",JSON.stringify(data.asignaturas));
        //         sessionStorage.setItem("usuariosTemporal", JSON.stringify(data.usuarios));
        //         sessionStorage.setItem("semestreTemporal", JSON.stringify(data.semestre));
        //     }else{
        //         alert("Error al procesar el archivo")
        //     }
        // });

    }

    const btnGenerar = document.getElementById("btn-generar");
    if(btnGenerar){
        btnGenerar.addEventListener("click", async () => {
            const asignaturas = JSON.parse(sessionStorage.getItem("asignaturasTemporal"));
            const usuarios = JSON.parse(sessionStorage.getItem("usuariosTemporal"));
            const semestre = JSON.parse(sessionStorage.getItem("semestreTemporal"));

            const response = await fetch("/admin/portafolios/confirmar", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ asignaturas, usuarios, semestre })
            });

            if (response.ok) {
                alert("Portafolios generados correctamente");
                location.reload();
            } else {
                alert("Error al guardar portafolios");
            }
        });
    }
});
