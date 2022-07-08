const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
})

const mailerNewUser = (newUser) => {
    transporter.sendMail({
        from: "Node Mailer",
        to: process.env.EMAIL,
        subject: "New User",
        html: `<h1>New User</h1>
        <img src="${newUser.avatar}" width=100 alt="">
        <ul>
            <li><p><b>Name:</b> ${newUser.name}</p></li>
            <li><p><b>Email:</b> ${newUser.email}</p></li>
            <li><p><b>Tel:</b> ${newUser.tel}</p></li>
            <li><p><b>Address:</b> ${newUser.address}</p></li>
            <li><p><b>Age:</b> ${newUser.age}</p></li>
        </ul>`
    })
}

const mailerNewOrder = (productos, user) => {
    const productosHtml = productos.map(producto => {
        stringId = `${producto.id}`
        return `<tr>
            <td>${producto.title}</td>
            <td>${producto.price}</td>
            <td>x${producto.cantidad}</td>
            <td>${stringId}</td>
        </tr>`
    }).join('')

    transporter.sendMail({
        from: "Node Mailer",
        to: process.env.EMAIL,
        subject: `Nuevo pedido de ${user.name}, ${user.email}`,
        html: `<h2>Productos:</h2>
        <table>
            <tr>
                <th>Producto</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Id</th>
            </tr>
            ${productosHtml}
        </table>
        <hr>
        <p>Total: $${productos.reduce((total, producto) => total + (producto.price * producto.cantidad), 0)}</p>`
    })
}

module.exports = { mailerNewUser, mailerNewOrder }