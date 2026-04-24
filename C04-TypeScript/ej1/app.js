"use strict";
// Ejercicio 1: 
const input = document.getElementById("altura");
const output = document.getElementById("arbol");
function generarAsteriscos(n) {
    let arbol = "";
    for (let i = 1; i <= n; i++) {
        arbol += "*".repeat(i) + "\n";
    }
    return arbol;
}
function generarArbol() {
    const n = parseInt(input.value);
    if (isNaN(n) || n < 1) {
        output.textContent = "Ingrese un número positivo";
        return;
    }
    output.textContent = generarAsteriscos(n);
}
