const { Router } = require('express');
const routerMiddleware = require('./routesmiddleware.js');
//const routerUsers = require('./routesusers.js')

const routerMain = Router();

//routerMain.use('/', routerUsers); 
routerMain.use('/cars', routerMiddleware);
routerMain.use('/users', routerMiddleware);
//console.log('routermain');


module.exports = routerMain;