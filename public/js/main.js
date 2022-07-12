socket.on("productos", (productos) => {
    showProductsHome(productos).then((html) => {
        document.getElementById("listaProductos").innerHTML = html;
    });
});

async function showProductsHome(productos) {
    return await fetch("../plantillas/homeProductos.hbs")
        .then((respuesta) => respuesta.text())
        .then((plantilla) => {
            const template = Handlebars.compile(plantilla);
            const html = template({ productos });
            return html;
        });
}
