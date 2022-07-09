![NODE](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![EXPRESS](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![MONGO](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![HEROKU](https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white)
![TWILIO](https://img.shields.io/badge/Twilio-F22F46?style=for-the-badge&logo=Twilio&logoColor=white)
![BOOTSTRAP](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)

# **Entrega Final**
[![Coderhouse](./logo_coderhouse.png)](https://www.coderhouse.com/)

* Podés visitar la pagina **[acá](https://entrega-final-backend.herokuapp.com/)**.

* La entrega final del curso de **Back End** de [CoderHouse](https://www.coderhouse.com/) consiste en funcionalidades de un e-commerce basado en [node](http://nodejs.org) y [express](https://www.npmjs.com/package/express).
# **Instalación**

## 1- Clona este repositorio

En la consola de **Git**: `git clone https://github.com/ron2452/entrega-final.git`

## 2- Instala las dependencias

En la consola del proyecto: `npm i --save`
## **Scripts**

Iniciar la app con forever:
`npm run start`
Iniciar la app con nodemon:
`npm run dev`
Iniciar test de autocannon:
`npm run test`

## **Argumentos de entrada**:
```
    --p / --port         se utiliza para definir el puerto
    --m / --mode         se utiliza para elegir entre fork o cluster
    --db / --database    se utiliza para elegir persistencia, mongo, firebase o memoria
```

**Ejemplo:** npm run start --port 8080 --mode fork --database mongo

# **Variables de entorno**

(Archivo .env)

```
PORT=8080

EMAIL= (direccion email emisor para nodemailer)
EMAIL_PASSWORD= (App password del email emisor)

SESSION_SECRET= (Palabra clave para encriptar con bcrypt)

MONGO_ATLAS_URL= (link de base de datos en Mongo Atlas)

TWILIO_ACCOUNT_SID= (Account sid de Twilio)
TWILIO_AUTH_TOKEN= (Auth token de Twilio)
TWILIO_PHONE= (Numero de telefono de Twilio)
PHONE_ADMIN= (Numero del administrador con prefijo internacional incluido)

(Datos de firestore)
FIREBASE_TYPE=
FIREBASE_PROJECT_ID=
FIREBASE_PRIVATE_KEY_ID=
FIREBASE_PRIVATE_KEY=
FIREBASE_CLIENT_EMAIL=
FIREBASE_CLIENT_ID=
FIREBASE_AUTH_URI=
FIREBASE_TOKEN_URI=
FIREBASE_AUTH_PROVIDER_X509_CERT_URL=
FIREBASE_CLIENT_X509_CERT_URL=

```

# **Utilización de dependencias**

## *autocannon*

[**Documentación autocannon**](https://www.npmjs.com/package/autocannon)

Utilizada en *src/utils/benchmark.js* para realizar un test de estres en el servidor.
Se realiza con el servidor corriendo y luego el comando `yarn test`

## *bcrypt*

[**Documentación bcrypt**](https://www.npmjs.com/package/bcrypt)

Utilizada en *src/persistencia/models/user.models.js* para encriptar las claves de los usuarios al momento de registrarse o ingresar.

## *cluster*

[**Documentación cluster**](https://www.npmjs.com/package/cluster)

Cluster es un administrador de servidores multinúcleo extensible para Node.
Es utilizada en *src/server.js*.
Para iniciar el servidor en modo cluster, debe cambiar la configuracion en *src/config.js* (linea 15) *modo: 'fork'* por *modo: 'cluster'*

## *compression*

[**Documentación compression**](https://www.npmjs.com/package/compression)

Compression es un middleware que se encarga de comprimir las response bodies para todas las request que atraviesen el middleware.

## *connect-flash*

[**Documentación connect-flash**](https://www.npmjs.com/package/connect-flash)

Connect-flash es utilizado para generar mensajes que se guardan en la session.
Es utilizada en *src/passport/local-auth.js* como "req.flash".

## *connect-mongo*

[**Documentación connect-mongo**](https://www.npmjs.com/package/connect-mongo)

Connect-mongo nos permite almacenar las sessions en [Mongo Atlas](https://www.mongodb.com/atlas/database).
Es utilizada en *src/config.js*.

## *cookie-parser*

[**Documentación cookie-parser**](https://www.npmjs.com/package/cookie-parser)

Cookie-parser nos permite crear cookies y firmarlas. En este caso la utilizamos para guardar la session ID y fijar el tiempo de vida de la misma.

## *dotenv*

[**Documentación dotenv**](https://www.npmjs.com/package/dotenv)

Dotenv se ocupa de cargar las variables de entorno desde un archivo *.env* al *process.env*.
Esta inicializado en *src/config.js*.

## *ejs & express-handlebars*

[**Documentación ejs**](https://www.npmjs.com/package/ejs)
[**Documentación express-handlebars**](https://www.npmjs.com/package/express-handlebars)

Son motores de plantillas encargados de renderizar las vistas.
Las vistas de ejs se encuentran en *src/views* mientras que las de handlebars se encuentran en *public/plantillas*.

## *express-session*

[**Documentación express-session**](https://www.npmjs.com/package/express-session)

Express-session es utilizada para crear las sessions de los usuarios.
Su configuracion se encuentra en *src/config.js*.
## *firebase & firebase-admin*

[**Documentación firebase**](https://www.npmjs.com/package/firebase)
[**Documentación firebase-admin**](https://www.npmjs.com/package/firebase-admin)

Firebase y firebase-admin son necesarias para utilizar y manejar la base de datos de Firestore.
Su conexión se encuentra en *src/config.js*.
## *forever*

[**Documentación forever**](https://www.npmjs.com/package/forever)

Forever es una herramienta de CLI para asegurarse que la aplicación corra continuamente, incluso despues de un crasheo.

## *mongoose*

[**Documentación mongoose**](https://www.npmjs.com/package/mongoose)

Mongoose es una herramienta para modelado de objetos, es utilizado en *src/persistencia/models* para modelar los schemas.
Su conexión se encuentra en *src/config.js* linea 43.

## *nodemailer*

[**Documentación nodemailer**](https://www.npmjs.com/package/nodemailer)

Nodemailer es utilizado para mandar notificaciones a emails.
Es utilizado en *src/utils/nodemailer.utils.js* para notificar al administrador de registros de usuarios y nuevas ordenes de compra.

## *passport & passport-local*

[**Documentación passport**](https://www.npmjs.com/package/passport)
[**Documentación passport-local**](https://www.npmjs.com/package/passport-local)

Passport se ocupa de autenticar el registro y el ingreso de usuarios, mientras que passport-local es la estrategia de autenticación (en este caso autenticación local).
Las estrategias están definidas en *src/middlewares/passport.middlewares.js*, y es utilizado en *src/routes/login.routes.js* y *src/routes/register.routes.js*

## *socket.io*

[**Documentación socket.io**](https://www.npmjs.com/package/socket.io)

Socket.io permite una comunicación bidireccional (front - back) en tiempo real basada en eventos.
Se utiliza en *src/server.js* y en varios archivos de *public/js*.

## *twilio*

[**Documentación twilio**](https://www.npmjs.com/package/twilio)

Twilio es utilizado para enviar notificaciones como Nodemailer, solo que mediante mensajes de Whatsapp.
Se define en *src/utils/twilio.utils.js*.

## *winston*

[**Documentación winston**](https://www.npmjs.com/package/winston)

Winston es utilizado como logger, para mostrar mensajes info/warn/error en consola y para guardar registros localmente en *src/logs*.
También se utiliza como middleware para mostrar las request de las rutas y sus status.
Está definido en *src/utils/logger.utils.js* y su middleware en *src/middlewares/logger.middlewares.js*.

## *yargs*

[**Documentación yargs**](https://www.npmjs.com/package/yargs)

Yargs se utiliza para recibir argumentos desde la consola al momento de iniciar la aplicación.
Su configuración se encuentra en *src/utils/yargs.utils.js*

# **Otros**

## *International Telephone Input*

[Documentación IntTelInput](https://intl-tel-input.com/)

International Telephone Input es un script utilizado en el registro de usuario para formatear el numero de teléfono con su prefijo dependiendo del país.
Su configuración se encuentra en *public/js/intTelInput/config.js*.

![LOVE](http://ForTheBadge.com/images/badges/built-with-love.svg)