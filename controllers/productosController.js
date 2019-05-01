/*
  Este archivo el controlador de la pagina inicial de la aplicacion,
  el metodo homepage renderiza el archivo index del directorio shop
*/
const mongoose = require('mongoose');
const Producto = require('../models/Producto');




//Controlador de la vista agregarLista que nos mostrar el formulario
//para tomar los datos de una nueva lista de bodas.
exports.agregarProducto = (req, res, next) => {
    res.render('shop/agregarProducto', {title: 'Agregar Producto'});
};

//Controlador de la vista crearListaBodas que nos permie almacenar
//en la base de datos la nueva lista de bodas. 
exports.crearProducto = async (req, res, next) => {
  const producto = new Producto(req.body);
  await producto.save(); // Almacenamos la nueva lista en mongodb 
  console.log(req.body);//Solo para corroborar el funcionamiento
  //res.json(req.body); //Solo para corroborar el funcionamiento
  res.redirect('/');
};

//Controlador de la vista listas en el cual se muestran todas
//las listas de bodas almancenadas en la base de datos 
//productos: productos -> nombre de la propiedad : nombre de la variable
exports.obtenerProductos = async (req, res, next) => {
  const productos = await Producto.find();
  console.log(productos);
  res.render('shop/productosEnLista', {title: 'Productos', productos: productos});
};