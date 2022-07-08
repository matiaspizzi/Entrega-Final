
socket.on("carrito", (productos) => {
    showProductsCarrito(productos).then((html) => {
        document.getElementById("listaProductosCarritos").innerHTML = html;
    });
});

async function showProductsCarrito(productos) {
    return await fetch('../plantillas/carritoProductos.hbs')
        .then(respuesta => respuesta.text())
        .then(plantilla => {
            const template = Handlebars.compile(plantilla)
            if (productos.length > 0) {
                let precioTotal = 0
                productos.forEach(producto => {
                    precioTotal += (producto.price*producto.cantidad)
                });
                const html = template({ productos, precioTotal })
                return html
            } else {
                return `<h2 class="alert alert-warning">
                    No hay productos en el carrito
                </h2>`
            }
        })
}