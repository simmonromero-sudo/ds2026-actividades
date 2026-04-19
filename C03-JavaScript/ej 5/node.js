function generarArbol(){
    const input = document.getElementById("altura");
    const n = parseInt(input.value);

    if (isNaN(n) || n < 1) {
        document.getElementById("arbol").textContent = "Por favor, ingresa un número entero positivo.";
        return;
    }

    let arbol = "";
    for (let i = 1; i <= n; i++){
        arbol += "*".repeat(i) + "\n";
    }
    document.getElementById("arbol").textContent = arbol;
}