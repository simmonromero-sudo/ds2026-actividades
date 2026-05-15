async function buscarLibros(query) {
    const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`;
    const respuesta = await fetch(url);

    if (!respuesta.ok) {
        throw new Error(`Error HTTP: ${respuesta.status} ${respuesta.statusText}`);
    }

    const data = await respuesta.json();
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
        contenedor.innerHTML = `<p class="text-center text-muted">No se encontraron libros.</p>`;
        return;
    }

    const fila = document.createElement("div");
    fila.className = "row row-cols-1 row-cols-md-3 g-4";

    libros.slice(0, 12).forEach((libro) => {
        const autor = libro.author_name ? libro.author_name[0] : "Autor desconocido";
        const anio = libro.first_publish_year ?? "Año desconocido";
        const coverId = libro.cover_i;
        const imagen = coverId
            ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
            : `https://via.placeholder.com/200x280?text=Sin+portada`;

        const col = document.createElement("div");
        col.className = "col";
        col.innerHTML = `
            <div class="card h-100">
                <img src="${imagen}" class="card-img-top" alt="${libro.title}" style="height: 280px; object-fit: cover;">
                <div class="card-body">
                    <h5 class="card-title">${libro.title}</h5>
                    <p class="card-text text-muted">${autor}</p>
                    <p class="card-text"><small class="text-muted">Año: ${anio}</small></p>
                    <a href="libro.html" class="btn btn-outline-dark btn-sm">Ver más</a>
                </div>
            </div>
        `;
        fila.appendChild(col);
    });

    contenedor.appendChild(fila);
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
    } catch (err) {
        const mensaje = err instanceof Error ? err.message : "Error desconocido";
        mostrarError(mensaje);
    } finally {
        cargando.style.display = "none";
    }
}

document.getElementById("btn-buscar").addEventListener("click", manejarBusqueda);
document.getElementById("input-busqueda").addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        manejarBusqueda();
    }
});