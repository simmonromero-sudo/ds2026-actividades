// Interface

interface Usuario{
    id: number;
    name: string;
    email: string;
    phone: string;
}

async function obtenerUsuario(): Promise<Usuario[]> {
    const respuesta = await fetch("https://jsonplaceholder.typicode.com/users")

    if(!respuesta.ok){
        throw new Error(`Error HTTP: ${respuesta.status} ${respuesta.statusText}`);

    }

    return (await respuesta.json()) as Usuario[];


}

async function main(): Promise<void> {
    const cargando = document.getElementById("cargando") as HTMLParagraphElement;
    const lista = document.getElementById("lista-usuario") as HTMLUListElement;
    const error = document.getElementById("error") as HTMLParagraphElement; 

    try {
        cargando.style.display = "block";

        const usuarios: Usuario[] = await obtenerUsuario();
        cargando.style.display = "none";

        usuarios.forEach((usuario: Usuario) => {
            const li = document.createElement("li");
            li.textContent = `${usuario.name} - ${usuario.email}`;
            lista.appendChild(li);
        });
    } catch (err: unknown){
        cargando.style.display = "none";

        const mensaje = err instanceof Error ? err.message : "Error desconocido";
        error.textContent = `${mensaje}`;
        error.style.display = "block";
    }
}

main();