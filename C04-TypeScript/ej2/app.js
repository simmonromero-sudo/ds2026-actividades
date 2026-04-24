"use strict";
const lista = document.getElementById("listado");
const stats = document.getElementById("stats");
const inputAutor = document.getElementById("filtroAutor");
const catalogo = [
    { isbn: "001", titulo: "El Quijote", autor: "Cervantes", precio: 1500, disponible: true, genero: "Novela" },
    { isbn: "002", titulo: "Cien años de soledad", autor: "García Márquez", precio: 2000, disponible: false, genero: "Novela" },
    { isbn: "003", titulo: "Ficciones", autor: "Borges", precio: 1200, disponible: true, genero: "Cuento" },
    { isbn: "004", titulo: "El Aleph", autor: "Borges", precio: 1100, disponible: false, genero: "Cuento" },
    { isbn: "005", titulo: "Rayuela", autor: "Cortázar", precio: 1800, disponible: true, genero: "Novela" },
];
// Función renderizar
function renderizar(libro) {
    lista.innerHTML = ""; //Limpiamos
    for (let l of libro) {
        const li = document.createElement("li");
        li.textContent = `${l.titulo} - ${l.autor} - ${l.precio} - ${l.genero} - ${l.disponible ? "Disponible" : "No disponible"}`;
        lista.appendChild(li);
    }
    // Promedio
    let suma = 0;
    for (let l of libro) {
        suma += l.precio;
    }
    const promedio = libro.length > 0 ? suma / libro.length : 0;
    stats.textContent = `Total: ${libro.length} libros - Precio promedio: $${promedio};`;
}
function filtrar() {
    const autor = inputAutor.value;
    const resultado = [];
    for (let l of catalogo) {
        if (l.autor === autor) {
            resultado.push(l);
        }
    }
    renderizar(resultado);
}
function soloDisponibles() {
    const resultado = [];
    for (let l of catalogo) {
        if (l.disponible === true) {
            resultado.push(l);
        }
    }
    renderizar(resultado);
}
function verTodos() {
    renderizar(catalogo);
}
renderizar(catalogo);
