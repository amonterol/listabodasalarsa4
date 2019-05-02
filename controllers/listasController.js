/*
  Este archivo el controlador de la pagina inicial de la aplicacion,
  el metodo homepage renderiza el archivo index del directorio shop
*/
const mongoose = require('mongoose');
const Lista    = require('../models/Lista');

exports.homepage = async (req, res, next) => {
  const listas = await Lista.find();
  //console.log(listas);  
  res.render('shop/index', {title: 'Listas', listas: listas});
};

//Controlador de la vista agregarLista que nos mostrar el formulario
//para tomar los datos de una nueva lista de bodas.
exports.agregarListaBodas = (req, res, next) => {
    res.render('shop/agregarLista', {title: 'Agregar Lista'});
};

//Controlador de la vista crearListaBodas que nos permie almacenar
//en la base de datos la nueva lista de bodas. 
exports.crearListaBodas = async (req, res, next) => {
  const lista = new Lista(req.body);
  await lista.save(); // Almacenamos la nueva lista en mongodb 
  //console.log(req.body);//Solo para corroborar el funcionamiento
  //res.json(req.body); //Solo para corroborar el funcionamiento
  res.redirect('shop/agregarProducto');
};

//Controlador de la vista listas en el cual se muestran todas
//las listas de bodas almancenadas en la base de datos 
//lista:listas -> nombre de la propiedad : nombre de la variable
exports.obtenerListasBodas = async (req, res, next) => {
  const listas = await Lista.find();
  //console.log(listas);
  res.render('shop/listas', {title: 'Listas', listas: listas});
};


//Controlador de la vista modificarListaBodas en el cual se puede actualizar
//la informacion de alguna de las listas registradas en la BD
//lista:listas -> nombre de la propiedad : nombre de la variable
exports.obtenerLista = async (req, res, next) => {
  var productId = req.params.id;
  const lista = await Lista.findById( productId );
  console.log(lista);
  res.render('shop/detalleLista', {title: `Detalle de Lista  ${lista._id}`, lista:lista});
 
};

/*Aun no probado*/
exports.actualizarLista = async (req, res, next) => {
  var productId = req.params.id;
  const lista = await Lista.findOneAndUpdate( productId, 
    req.body, {
      new: trie,
      runValidators: true,
    }).exec();
  res.redirect(`/lista/${lista.id}`);
  };
    /*
  const lista = await Lista.findOneAndUpdate({ 
    _id: req.params.id }, 
    req.body, {
      new: true,
      runValidators: true,
    }).exec();
  res.redirect(`/lista/${lista.id}/edit`);
 
};
*/
