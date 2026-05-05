"use strict";
async function buscarLibros(query) {
    const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`;
    const respuesta = await fetch(url);
    if (!respuesta.ok) {
        throw new Error(`Error HTTP: ${respuesta.status} ${respuesta.statusText}`);
    }
    const data = (await respuesta.json());
    return data.docs;
}
function mostrarError(mensaje) {
    const errorEl = document.getElementById("error");
    errorEl.textContent = mensaje;
    errorEl.style.display = "block";
}
function ocultarError() {
    const errorEl = document.getElementById("error");
    errorEl.textContent = "";
    errorEl.style.display = "none";
}
function renderizarLibros(libros) {
    const contenedor = document.getElementById("resultados");
    contenedor.innerHTML = "";
    if (libros.length === 0) {
        contenedor.textContent = "No se encontraron libros.";
        return;
    }
    libros.forEach((libro) => {
        const card = document.createElement("div");
        card.className = "card";
        const autor = libro.author_name ? libro.author_name[0] : "Autor desconocido";
        const anio = libro.first_publish_year ?? "Año desconocido";
        card.innerHTML = `
            <h3>${libro.title}</h3>
            <p><strong>Autor:</strong> ${autor}</p>
            <p><strong>Año:</strong> ${anio}</p>
        `;
        contenedor.appendChild(card);
    });
}
async function manejarBusqueda() {
    const input = document.getElementById("input-busqueda");
    const query = input.value.trim();
    const cargando = document.getElementById("cargando");
    const contenedor = document.getElementById("resultados");
    if (query === "") {
        mostrarError("Por favor, ingresá un término de búsqueda.");
        return;
    }
    ocultarError();
    contenedor.innerHTML = "";
    cargando.style.display = "block";
    try {
        const libros = await buscarLibros(query);
        renderizarLibros(libros);
    }
    catch (err) {
        const mensaje = err instanceof Error ? err.message : 'Error desconocido';
        mostrarError(`${mensaje}`);
    }
    finally {
        cargando.style.display = "none";
    }
}
document
    .getElementById("btn-buscar")
    .addEventListener("click", manejarBusqueda);
document
    .getElementById("input-busqueda")
    .addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        manejarBusqueda();
    }
});
