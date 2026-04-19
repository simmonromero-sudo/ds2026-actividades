function calcularPrecioFinal (monto, mediopago) {
    let descuento = 0;
    if (monto < 200) {
        descuento = 0;
    } else if (monto <= 400){
        if (mediopago === "E") descuento = 0.30;
        else if (mediopago === "D") descuento = 0.20;
        else if (mediopago === "C") descuento = 0.10;
    } else {
        descuento = 0.40;
    }

    const final = monto - (monto * descuento);
    return final;
}

const casos = [
    [100, "E"],
    [300, "E"],
    [300, "D"],
    [300, "C"],
    [500, "E"],
];

casos.forEach(([monto, pago])=>{
    const final = calcularPrecioFinal(monto, pago);
    console.log(`Monto: ${monto}, Medio de pago: ${pago}, Precio final: ${final}`);
});