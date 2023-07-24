const { Router } = require('express');
const routerMiddleware = require('./routesmiddleware.js');
//const routerUsers = require('./routesusers.js')

const routerMain = Router();

//routerMain.use('/', routerUsers); 
routerMain.use('/cars', routerMiddleware);      //Ruta principal cars
routerMain.use('/users', routerMiddleware);     //Ruta principal users
routerMain.use('/rental', routerMiddleware);    //Ruta principal rental
//console.log('routermain');


module.exports = routerMain;