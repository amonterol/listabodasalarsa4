//Importamos modulos de terceros requeridos
const express = require('express');
const router = express.Router();

//Importamos archivos propios de la aplicacion
const listasController = require('../controllers/listasController');
const productosController = require('../controllers/productosController');
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

/* Definimos la respuesta cuando un  GET request es hecho a la pagina de 
inicio de la aplicacion, en este caso renderizamos la pagina index del directorio
shop*/

router.get('/productosEnLista', productosController.obtenerProductos);
router.get('/agregarProducto', productosController.agregarProducto);
router.post('/agregarProducto', productosController.crearProducto);


//Exportamos el modulo para que pueda ser usado en la aplicacion app.js
module.exports = router;