function listar(){

    const input = document.getElementById("producto");
    const nombre = input.value.trim(); 
    if (nombre === "") return;

    const li = document.createElement("li");
    
    const btn = document.createElement("button");
    btn.textContent = "Eliminar";
    btn.addEventListener("click", () => {
        li.remove();
        actualizarContador();
    });

    li.textContent = nombre + " ";
    li.appendChild(btn);

    document.getElementById("lista").appendChild(li);

    input.value = "";
    actualizarContador();
}    

function actualizarContador(){
    const total = document.querySelectorAll("#lista li").length;
    document.getElementById("contador").textContent = `Total de productos: ${total}`;
}

