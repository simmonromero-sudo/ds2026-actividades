function clasificarNota(nota) {
    if (nota < 4) 
        return "Desaprobado";
    else if (nota >= 4 && nota < 6)
        return "Aprobado";
    else return "Promoción";
}

// Función dia de la semana

function diaSemana(dia) {
    switch (dia) {
        case 1:
            return "Lunes";     
        case 2:
            return "Martes";
        case 3:
            return "Miércoles";
        case 4:
            return "Jueves";
        case 5:
            return "Viernes";
        case 6:
            return "Sábado";
        case 7:
            return "Domingo";   
        default:
            return "Número de día inválido";
    }
}

console.log(clasificarNota(3)); // Desaprobado
console.log(clasificarNota(5));
console.log(diaSemana(3)); // Miércoles
console.log(diaSemana(7)); // Domingo