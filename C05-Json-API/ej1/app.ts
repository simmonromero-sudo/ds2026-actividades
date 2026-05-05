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


const usuarios = (await respuesta.json()) as Usuario[];
return usuarios;
}

async function main(): Promise<void> {
    console.log("Consultando usuarios en JSONPlaceholder... \n");

    try {
        const usuarios: Usuario[] = await obtenerUsuario();
        console.log (`${usuarios.length} usuarios recibidos: \n`);

        usuarios.forEach((usuario: Usuario) => {
            console.log(`[${usuario.id}] ${usuario.name}`);
            console.log(`${usuario.email}`);
            console.log(`${usuario.phone}`);
            console.log("-".repeat(45));

        });
    
} catch (error: unknown){
    if (error instanceof Error){
        console.error("Error al obtener usuarios:", error.message);
    } else {
        console.error("Error desconocido", error);
    }
    }   
}

main();