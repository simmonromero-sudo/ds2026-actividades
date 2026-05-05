"use strict";
// Interface
async function obtenerUsuario() {
    const respuesta = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!respuesta.ok) {
        throw new Error(`Error HTTP: ${respuesta.status} ${respuesta.statusText}`);
    }
    return (await respuesta.json());
}
async function main() {
    const cargando = document.getElementById("cargando");
    const lista = document.getElementById("lista-usuario");
    const error = document.getElementById("error");
    try {
        cargando.style.display = "block";
        const usuarios = await obtenerUsuario();
        cargando.style.display = "none";
        usuarios.forEach((usuario) => {
            const li = document.createElement("li");
            li.textContent = `${usuario.name} - ${usuario.email}`;
            lista.appendChild(li);
        });
    }
    catch (err) {
        cargando.style.display = "none";
        const mensaje = err instanceof Error ? err.message : "Error desconocido";
        error.textContent = `${mensaje}`;
        error.style.display = "block";
    }
}
main();
