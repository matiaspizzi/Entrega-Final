socket.on("productos", async (productos) => {
    // const res = await fetch(`http://localhost:8080/api/productos-test`)
    // const prodsMock = await res.json()
    // const arrayProd =  prodsMock.concat(productos)
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
