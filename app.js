const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const path = require('path');
const cookieParser = require('cookie-parser');
const expressHbs = require('express-handlebars');
const bodyParser = require('body-parser');
const passport = require('passport');
//const promisify = require('es6-promisify');
const flash = require('connect-flash');
const expressValidator = require('express-validator');






const indexRouter = require('./routes/index');
const helpers = require('./helpers');
const errorHandlers = require('./handlers/errorHandlers');


//app es una instancia de express la cual nos permite hacer la conexion al servidor
var app = express();

//Importamos las variables de ambiente desde el archivo variables.env
require('dotenv').config({path:'variables.env'});

//Connexion a la base de datos
// Connect to our Database and handle any bad connections
mongoose.connect(process.env.DATABASE, {useNewUrlParser: true });
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on('error', (err) => {
console.error( '${err.message}');
});


//Importamos todos los modelos definidos
require('./models/Lista');




//Registramos el motor de plantillas escogido, en este caso handlebars
//Al mismo tiempo se define la utilizacion de un layout para la aplicacion
app.engine('.hbs', expressHbs({defaultLayout: 'layout', extname:'.hbs'}));
app.set('view engine', '.hbs');


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
app.use('/styles', express.static(path.join(__dirname , 'public','styles')));
app.use('/images', express.static(path.join(__dirname , 'public/images')));

/*
Presenta varios metodos que nos permiten validar los datos
*/
//app.use(expressValidator());

//Permite llenar con informacion cualquier cokies que acompanen un "request"
//app.use(cookieParser);


//Passport.js es un modulo npm usado para manejar el sign in y sign up
//app.use(passport.initialize());
//app.use(passport.session());

//Flash.js nos permite construir mensajes para enviar al usuario
//app.use(flash());

//Este middleware se utiza para manejar la ruta o endpoint del homepage
app.use('/', indexRouter);



//Nos permite manejar el caso de que nos se encuentre un recurso solicitado
app.use(errorHandlers.notFound);

//Nos permite manejar el caso de errores de validacion
app.use(errorHandlers.flashValidationErrors);

//Manejador de errores no contemplados 
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

//Iniciamos el servidor 
app.listen(process.env.PORT, () => console.log('Example app listening on port ${process.env.PORT}!'));

