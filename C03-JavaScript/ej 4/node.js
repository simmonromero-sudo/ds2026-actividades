const nums = [1, 2, 3, 4, 5, 6, 7, 8]

// Filtrar numero mayor y numero menor

let suma = 0;
let mayor = nums[0];
let menor = nums[0];

for (const n of nums) {
    suma += n;
    if (n > mayor) mayor = n;
    if (n < menor) menor = n;
}

const promedio = suma / nums.length;

console.log(`Suma: ${suma}, Promedio: ${promedio}, Mayor: ${mayor}, Menor: ${menor}`);

// Generar un string con n asteriscos seguidos

function generarAsteriscos(n) {
    let resultado = "";
    for (let i = 0; i < n; i++){
        resultado += "*";
    }

    return resultado;
}

console.log(generarAsteriscos(5));
console.log(generarAsteriscos(10));