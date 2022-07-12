const inputMensaje = document.getElementById('inputMensaje')
const formPublicarMensaje = document.getElementById('formPublicarMensaje')

formPublicarMensaje.addEventListener('submit', e => {
    e.preventDefault()
    const mensaje = {
        texto: inputMensaje.value,
        autor: { id: " ", nombre: " ", avatar: " " },
    }
    socket.emit('nuevoMensaje', mensaje)
    formPublicarMensaje.reset()
    inputMensaje.focus()
})

socket.on('mensajes', async mensajes => {
    const html = await showMensajes(mensajes)
    document.getElementById('mensajes').innerHTML = html
})

function showMensajes(mensajes) {
    return fetch('../plantillas/mensajes.hbs')
        .then(respuesta => respuesta.text())
        .then(plantilla => {
            const template = Handlebars.compile(plantilla)
            const html = template({ mensajes: mensajes })
            return html
        })
}
