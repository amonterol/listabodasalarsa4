const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const path = require('path');
const cookieParser = require('cookie-parser');
const expressHbs = require('express-handlebars');
const bodyParser = require('body-parser');
const passport = require('passport');
const promisify = require('es6-promisify');
const flash = require('connect-flash');
const expressValidator = require('express-validator');


const indexRouter = require('./routes/index');
const helpers = require('./helpers');
const errorHandlers = require('./handlers/errorHandlers');
require('./handlers/passport');



//app es una instancia de express la cual nos permite hacer la conexion al servidor, es decir crear una nueva sesion
var app = express();

//Importamos las variables de ambiente desde el archivo variables.env
require('dotenv').config({path:'variables.env'});


//Connexion a la base de datos en este caso MongoDB y usamos mongoose y manejamos los posibles errores en la conexion
mongoose.connect(process.env.DATABASE, {useNewUrlParser: true, useCreateIndex: true });
mongoose.Promise = global.Promise; // Le indicamos a Mongoose que utilice el estandar  ES6 promises
mongoose.connection.on('error', (err) => {
  console.error( '${err.message}');
});

//Importamos todos los modelos definidos en la aplicacion 
require('./models/Lista');
require('./models/Producto');
require('./models/Usuario');



//Registramos el motor de plantillas escogido, en este caso Handlebars
//Al mismo tiempo se define la utilizacion de un layout para la aplicacion
app.engine('.hbs', expressHbs({defaultLayout: 'layout', extname:'.hbs'}));
app.set('view engine', '.hbs');
//app.set('views', path.join(__dirname, 'views')); // this is the folder where we keep our pug files



/*
Analice las partes de  un "request" entrantes en un middleware y nos permite
utilizarlos en algu  manejador disponibles bajo la propiedad "req.body". Todas las propiedades y valores
del objeto "req.body" debe ser validadas.
*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

/*
Para utilizar los archivos estáticos como imágenes, archivos CSS y archivos JavaScript, 
usamos la función de middleware incorporada express.static de Express.
Por lo cual es necesario almacenarlos en el directorio "public"
*/
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname , 'public/css')));
app.use('/images', express.static(path.join(__dirname , 'public/images')));

/*
Presenta varios metodos que nos permiten validar los datos
*/
app.use(expressValidator());

//Permite llenar con informacion cualquier cokies que acompanen un "request"
//app.use(cookieParser);

// Sessions allow us to store data on visitors from request to request
// This keeps users logged in and allows us to send flash messages
/*
app.use(session({
  secret: process.env.SECRET,
  key: process.env.KEY,
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));
*/

//Passport.js es un modulo npm usado para manejar el log in y log out y el registro de usuario
app.use(passport.initialize());
app.use(passport.session());


//Flash.js nos permite construir mensajes para enviar al usuario de la forma req.flash('error', 'mensaje que queremos mostrar')
//El mensaje sera mostrado en la siguiente pagina que el usuario solicite
app.use(flash());



// pass variables to our templates + all requests
/*
app.use((req, res, next) => {
  res.locals.h = helpers;
  res.locals.flashes = req.flash();
  res.locals.user = req.user || null;
  res.locals.currentPath = req.path;
  next();
});

*/

// promisify some callback based APIs
/*
app.use((req, res, next) => {
  req.login = promisify(req.login, req);
  next();
});
*/

//Este middleware se utiza para manejar las rutas que definamos, en este caso el homepage
app.use('/', indexRouter);


// If that above routes didnt work, we 404 them and forward to error handler
//Nos permite manejar el caso de que nos se encuentre un recurso solicitado, mediante el mensaje 404
//que es pasado al manejador de errores  "handlers/errorHandlers"
app.use(errorHandlers.notFound);

//Nos permite manejar el caso de errores de validacion
app.use(errorHandlers.flashValidationErrors);

//Nos permite manejar errores en la etapa de desarrollo, no contemplados en los dos 
//middleware anteriores 
if(process.env.MODE_ENV == 'development') {
    app.use(errorHandlers.developmentErrors);
}

//Manejador de errores en "produccion"
app.use(errorHandlers.productionErrors);

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//Iniciamos el servidor segun el numero definido en el archivo variables.env
app.listen(process.env.PORT, () => console.log(`Example app listening on port ${process.env.PORT}!`));

