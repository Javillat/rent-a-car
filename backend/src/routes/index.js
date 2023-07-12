const { Router } = require('express');
const routerCars = require('./routescars.js');
//const routerUsers = require('./routesusers.js')

const routerMain = Router();

//routerMain.use('/', routerUsers); 
routerMain.use('/cars', routerCars);
console.log('routermain');


module.exports = routerMain;