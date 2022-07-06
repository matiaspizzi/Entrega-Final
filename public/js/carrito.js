socket.on('carrito', productos => {
    showProductsCarrito(productos).then(html => {
        document.getElementById('productosCarrito').innerHTML = html
    })
})

async function showProductsCarrito(carrito) {
    return await fetch('../plantillas/carritoProductos.hbs')
        .then(respuesta => respuesta.text())
        .then(plantilla => {
            const template = Handlebars.compile(plantilla)
            const productos = carrito.productos
            if (productos) {
                let precioTotal = 0
                console.log(productos)
                productos.forEach(producto => {
                    precioTotal += producto.price
                });
                console.log(precioTotal)
                const html = template({ productos, precioTotal })
                return html
            } else {
                return `<h2 class="alert alert-warning">
                    No hay productos en el carrito
                </h2>`
            }
        })
}

function removeProduct(productId) {
    socket.emit('removeProduct', productId)
}

function addProduct(productId) {
    socket.emit('addProduct', productId)
}

function checkout() {
    socket.emit('checkout')
    document.getElementById('productosCarrito').innerHTML = `<h1 class="alert alert-success">
        Pedido de compra enviado. Muchas gracias!
    </h1>`
}