interface LibroOL {

    title: string;
    author_name?: string [];
    first_publish_year?: number;
}

interface RespuestaOL {
    docs: LibroOL[];
}

async function buscarLibros(query: string): Promise<LibroOL[]> {
    const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`;
    const respuesta = await fetch(url);

    if(!respuesta.ok){

        throw new Error(`Error HTTP: ${respuesta.status} ${respuesta.statusText}`);

    }

    const data = (await respuesta.json()) as RespuestaOL;
    return data.docs;


}

function mostrarError(mensaje: string): void {
  const errorEl = document.getElementById("error") as HTMLParagraphElement;
  errorEl.textContent = mensaje;
  errorEl.style.display = "block";
}


function ocultarError(): void{
    const errorEl = document.getElementById("error") as HTMLParagraphElement;
    errorEl.textContent = "";
    errorEl.style.display = "none";
}

function renderizarLibros(libros: LibroOL[]): void {
    const contenedor = document.getElementById("resultados") as HTMLDivElement;
    contenedor.innerHTML = "";
    
    if(libros.length === 0){
        contenedor.textContent = "No se encontraron libros.";
        return;
    }

    libros.forEach((libro: LibroOL) => {
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

async function manejarBusqueda(): Promise<void> { 
    const input = document.getElementById("input-busqueda") as HTMLInputElement;
    const query = input.value.trim();
    const cargando = document.getElementById("cargando") as HTMLDivElement;
    const contenedor = document.getElementById("resultados") as HTMLDivElement;

    if (query === ""){
        mostrarError("Por favor, ingresá un término de búsqueda.");
        return;
    }
    ocultarError();
    contenedor.innerHTML = "";
    cargando.style.display = "block";

    try {

    const libros: LibroOL[] = await buscarLibros(query);
    renderizarLibros(libros);

    } catch (err: unknown){
        const mensaje = err instanceof Error ? err.message : 'Error desconocido';
        mostrarError(`${mensaje}`);

    } finally{
        
        cargando.style.display = "none";
    }

}

document
    .getElementById("btn-buscar")!
    .addEventListener("click", manejarBusqueda);

document
    .getElementById("input-busqueda")!
    .addEventListener("keypress", (event: KeyboardEvent) => {
        if (event.key === "Enter") {
            manejarBusqueda();
        }
    });

