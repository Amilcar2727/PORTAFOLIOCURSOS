document.addEventListener('DOMContentLoaded', () => {
    const boton = document.getElementById('miBoton');
    const mensaje = document.getElementById('mensaje');

    boton.addEventListener('click', () => {
        mensaje.textContent = 'Hola';
    });
});

document.getElementById("form-subida").addEventListener("submit",async function(e){
    console.log("📦 main.js cargado correctamente");
    e.preventDefault();
    const formData = new FormData(this);
    const response = await fetch("/carga_academica/subir_excel",{
        method: "POST",
        body: formData
    });

    if (response.ok){
        const data = await response.json();
        const tbody = document.querySelector("#tabla-usuarios tbody");
        tbody.innerHTML = "";

        data.usuarios.forEach(usuario => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${usuario.codigo}</td>
                <td>${usuario.nombre}</td>
                <td>${usuario.correo}</td>
                <td>${usuario.grado}</td>
                <td>${usuario.rol}</td>
            `;
            tbody.appendChild(row);
        });

        // Habilitar boton de confirmacion
        document.getElementById("btn-confirmar").disabled=false;

        // Guardar datos localmente para posterior confirmacion
        sessionStorage.setItem("usuariosTemporal",JSON.stringify(data.usuarios));
    }else{
        alert("Error al procesar el archivo")
    }
});

document.getElementById("btn-confirmar").addEventListener("click",async()=>{
    const usuarios =JSON.parse(sessionStorage.getItem("usuariosTemporal"));
    const response = await fetch("/carga_academica/guardar-usuarios",{
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({usuarios})
    });

    if(response.ok){
        alert("Usuarios guardados correctamente en MONGODB");
        location.reload();
    }else{
        alert("Error al guardar usuarios");
    }
})
