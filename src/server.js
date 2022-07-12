const express = require("express");
const config = require("./config.js");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const flash = require("connect-flash");
const cluster = require("cluster");
const compression = require("compression");
const logger = require("./utils/logger.utils.js");
const loggerRoutes = require("./middlewares/logger.middlewares.js");
const http = require("http");
const { Server: Socket } = require("socket.io");
const {
    sessionMiddleware,
    wrap,
} = require("./middlewares/session.middlewares.js");
const User = require("./persistencia/models/user.models.js");

const app = express();
const server = http.createServer(app);
const io = new Socket(server);

const productosController = require("./controllers/productos.controllers.js");
const mensajesController = require("./controllers/mensajes.controllers.js");
const carritosController = require("./controllers/carritos.controllers.js");

// Middlewares y otros
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./public"));
app.use(compression());
app.use(cookieParser());
app.use(sessionMiddleware);
require("./middlewares/passport.middlewares.js");
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use((req, _res, next) => {
    app.locals.signupMessage = req.flash("signupMessage");
    app.locals.loginMessage = req.flash("loginMessage");
    app.locals.user = req.user;
    next();
});
app.use(loggerRoutes);

//Vistas
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

//Rutas
app.use("/api", require("./routes/randoms.routes.js"));
app.use("/", require("./routes/login.routes.js"));
app.use("/", require("./routes/register.routes.js"));
app.use("/", require("./routes/info.routes.js"));
app.use("/", require("./routes/home.routes.js"));
app.use("/", require("./routes/perfil.routes.js"));
app.use("/", require("./routes/chat.routes.js"));
app.use("/", require("./routes/publicar-productos.routes.js"));
app.use("/", require("./routes/carrito.routes.js"));

app.get("/", (_req, res) => {
    res.redirect("/home");
});

app.use(function (req, res) {
    if (res.status(404)) {
        res.send({
            error: -2,
            descripcion: `ruta ${req.path} método ${req.method} no implementada`,
        });
        logger.warn(`${req.method} ${req.path} no implementado`);
        return;
    }
});

// Socket.io
io.use(wrap(sessionMiddleware));
io.on("connection", async (socket) => {
    if (!socket.request.session.passport) {
        socket.disconnect();
        return;
    }
    const user = await User.findById(
        socket.request.session.passport
            ? socket.request.session.passport.user
            : null
    );
    //Home
    socket.emit("productos", await productosController.getAll());
    socket.on("update", async (producto) => {
        await productosController.save(producto);
        io.sockets.emit("productos", await productosController.getAll());
    });
    //Chat
    socket.emit("mensajes", await mensajesController.getAll());
    socket.on("nuevoMensaje", async (mensaje) => {
        mensaje.autor.id = user.email;
        mensaje.autor.nombre = user.name;
        mensaje.autor.avatar = user.avatar;
        mensaje.fyh = new Date().toLocaleString();
        await mensajesController.save(mensaje);
        io.sockets.emit("mensajes", await mensajesController.getAll());
    });
    //Carrito
    const carrito = await carritosController.getById(user.email);
    let productos = [];
    if (carrito) productos = carrito.productos;
    socket.emit("carrito", productos);
});

// Iniciar servidor
if (cluster.isPrimary && config.modo == "cluster") {
    logger.info(`CANT PROCE ${config.cantProcesadores}`);
    logger.info(`PID MASTER ${process.pid}`);
    for (let i = 0; i < config.cantProcesadores; i++) {
        cluster.fork();
    }
    cluster.on("exit", (worker) => {
        logger.warn(`Worker, ${worker.process.pid} died `);
        cluster.fork();
    });
} else {
    const PORT = config.port;
    server.listen(PORT, () => {
        logger.info(
            `Servidor express escuchando en el puerto ${PORT} - PID WORKER ${process.pid} - DB ${config.persistencia}`
        );
    });
    server.on("error", (err) => {
        logger.error(err);
    });
}
