//Importamos modulos de terceros requeridos
const express = require('express');
const router = express.Router();

//Importamos archivos propios de la aplicacion
const listasController = require('../controllers/listasController');
//Importamos y creamos una instancia del objeto capturaErrores
const { capturaErrores } = require('../handlers/errorHandlers');


/* Definimos la respuesta cuando un  GET request es hecho a la pagina de 
inicio de la aplicacion, en este caso renderizamos la pagina index del directorio
shop*/
router.get('/', listasController.homepage);
router.get('/agregarLista', listasController.agregarListaBodas);
router.post('/agregarLista', capturaErrores(listasController.crearListaBodas));


//Exportamos el modulo para que pueda ser usado en la aplicacion app.js
module.exports = router;