interface Libro{
    isbn: string;
    titulo: string;
    autor: string;
    precio: number;
    disponible: boolean;
    genero?: string; // Opcional
}

const lista = document.getElementById("listado") as HTMLElement;
const stats = document.getElementById("stats") as HTMLElement;
const inputAutor = document.getElementById("filtroAutor") as HTMLInputElement;

// Inputs del FORM

const inTitulo = document.getElementById("inTitulo") as HTMLInputElement;
const inAutor = document.getElementById("inAutor") as HTMLInputElement;
const inPrecio = document.getElementById("inPrecio") as HTMLInputElement;
const inGenero = document.getElementById("inGenero") as HTMLInputElement;
const inDisponible = document.getElementById("inDisponible") as HTMLInputElement;

const errorForm = document.getElementById("error") as HTMLElement;

const catalogo: Libro[] = [
    { isbn: "001", titulo: "El Quijote",         autor: "Cervantes",  precio: 1500, disponible: true,  genero: "Novela"  },
    { isbn: "002", titulo: "Cien años de soledad",autor: "García Márquez", precio: 2000, disponible: false, genero: "Novela"  },
    { isbn: "003", titulo: "Ficciones",           autor: "Borges",     precio: 1200, disponible: true,  genero: "Cuento"  },
    { isbn: "004", titulo: "El Aleph",            autor: "Borges",     precio: 1100, disponible: false, genero: "Cuento"  },
    { isbn: "005", titulo: "Rayuela",             autor: "Cortázar",   precio: 1800, disponible: true,  genero: "Novela"  },
];

// Función renderizar
function renderizar (libro: Libro[]): void{
    lista.innerHTML = ""; //Limpiamos

    for (let l of libro){
        const li = document.createElement("li");
        li.textContent = `${l.titulo} - ${l.autor} - ${l.precio} - ${l.genero} - ${l.disponible ? "Disponible" : "No disponible"}`;
        
        // Botón de eliminar

        const btn = document.createElement("button");
        btn.textContent= "Eliminar";

        btn.onclick = () => eliminarLibro(l.isbn);
        li.appendChild(btn);
        lista.appendChild(li);
    }

    // Promedio

    let suma: number = 0
    for (let l of libro) {

        suma += l.precio;

    }
    const promedio: number = libro.length > 0 ? suma / libro.length : 0;
    stats.textContent = `Total: ${libro.length} libros - Precio promedio: $${promedio};` 


}

function filtrar(): void {

    const autor: string = inputAutor.value; 
    const resultado: Libro[] = [];

    for (let l of catalogo) {

        if (l.autor === autor) {
            resultado.push(l);
        }
    }

    renderizar(resultado);

}

function soloDisponibles(): void {

    const resultado: Libro[] = [];

    for (let l of catalogo){

        if (l.disponible === true){
            resultado.push(l);
        }
    }
    renderizar(resultado);
}

function verTodos(): void {

    renderizar(catalogo);
}

// Eliminar

function eliminarLibro(isbn: string): void {

    for (let i = 0; i < catalogo.length; i++) {
        if (catalogo[i].isbn === isbn) {
            catalogo.splice(i,1);
            break;
        }
    }
    renderizar(catalogo);
}

// Validar formulario

function validarFormulario(): Libro | null {
    const titulo: string = inTitulo.value;
    const autor: string = inAutor.value;
    const precio: number = parseFloat(inPrecio.value);
    const genero: string = inGenero.value;
    const disponible: boolean = inDisponible.checked;

    // Validación de no vacíos

    if (titulo === "" || autor === "" || isNaN(precio) || precio <= 0 ){
        errorForm.textContent = "Completá todos los campos correctamente.";
        return null;
    }

    errorForm.textContent = ""; // Limpiar mensaje de error

    return{

        isbn: "AUTO-" + Date.now(),
        titulo: titulo,
        autor: autor,
        precio: precio,
        disponible: disponible,
        genero: genero 
    };

}

function agregarLibro(libro: Libro): void {
    catalogo.push(libro);
    renderizar(catalogo);
}

function agregar(): void{
    const libro = validarFormulario();
    if (libro === null) return;

    agregarLibro(libro);

    inTitulo.value = "";
    inAutor.value = "";
    inPrecio.value = "";
    inGenero.value = "";
    inDisponible.checked = false;

}

renderizar(catalogo);

