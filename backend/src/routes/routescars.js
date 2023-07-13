const express = require('express');
const cars = require('../controllers/cars.js');

// Router for /cars/ endpoint
routerCars = express.Router();

routerCars.post('/newcar', cars.addCar);
//console.log('routercars');
routerCars.get('/getcars', cars.getCars);


module.exports = routerCars;