// Ejercicio 1: 

const input = document.getElementById("altura") as HTMLInputElement;
const output = document.getElementById("arbol") as HTMLInputElement;

function generarAsteriscos(n: number): string {
    let arbol: string = "";
    for (let i: number = 1; i<= n; i++){
            arbol += "*".repeat(i) + "\n";
    }
    return arbol;
}
function generarArbol(): void{
    const n: number = parseInt(input.value);
    if (isNaN(n) || n < 1){
        output.textContent = "Ingrese un número positivo"
        return;
    }
    
    output.textContent = generarAsteriscos(n);
}