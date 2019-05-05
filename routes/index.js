//Importamos modulos de terceros requeridos
const express = require('express');
const router = express.Router();

//Importamos archivos propios de la aplicacion
const listasController = require('../controllers/listasController');
const productosController = require('../controllers/productosController');
const usuarioController = require('../controllers/usuarioController');
const authController = require('../controllers/authController');

//Importamos y creamos una instancia del objeto capturaErrores
const { capturaErrores } = require('../handlers/errorHandlers');


/* Definimos la respuesta cuando un  GET request es hecho a la pagina de 
inicio de la aplicacion, en este caso renderizamos la pagina index del directorio
shop*/
router.get('/', listasController.homepage);


/* Definimos la respuesta cuando un  GET request es hecho a la pagina de 
inicio de la aplicacion, en este caso renderizamos la pagina index del directorio
shop*/
router.get('/listas', listasController.obtenerListasBodas);
router.get('/agregarLista', listasController.agregarListaBodas);
router.post('/agregarLista', capturaErrores(listasController.crearListaBodas));

/* Ruta para rederizar el detalla de la lista, cuando el usuario hace click en una lista
la respuesta sera enviarlo a la pagina "detalleLista" que muestra la informacion del evento
de la boda y los productos asociados a la lista seleccionada*/
router.get('/detalleLista/:id', listasController.obtenerLista);


router.get('/modificarLista/:id', listasController.obtenerLista);
router.post('/modificarLista/:id', capturaErrores(listasController.actualizarLista));




/* Definimos la respuesta cuando un  GET request es hecho a la pagina de 
inicio de la aplicacion, en este caso renderizamos la pagina index del directorio
shop*/

router.get('/productosEnLista', productosController.obtenerProductos);
router.get('/agregarProducto', productosController.agregarProducto);
router.post('/agregarProducto', productosController.crearProducto);



/* Ruta para renderizar el formulario de login*/
router.get('/loginForm', usuarioController.loginForm);
router.post('/usuario/loginForm', authController.login);

router.get('/logoutForm', authController.logout);


router.get('/registerForm', usuarioController.registerFormGet);
router.post('/usuario/registerForm',
 usuarioController.validateRegister,
 usuarioController.register,
 authController.login
);



//Exportamos el modulo para que pueda ser usado en la aplicacion app.js
module.exports = router;