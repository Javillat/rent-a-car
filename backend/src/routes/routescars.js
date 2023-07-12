const express = require('express');
const cars = require('../controllers/cars.js');

// Router for /api/v1/cars endpoint
routerCars = express.Router();
routerCars.post('/newcar', cars.addCar);
console.log('routercars');

/* GET all available car models */  // Route: api/v1/cars (GET
//routerCars.get('/', async function(req, res) {});


module.exports = routerCars;