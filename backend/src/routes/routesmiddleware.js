const express = require('express');
const cars = require('../controllers/carsfn.js');
const users = require('../controllers/usersfn.js');
const rental = require("../controllers/rentalfn.js");


// Router middleware endpoint
routerMiddleware = express.Router();

//middleware cars
routerMiddleware.post('/newcar', cars.addCar);
routerMiddleware.get('/getcars', cars.getCars);
routerMiddleware.get('/:id', cars.getCarById);
//middleware users
routerMiddleware.post('/newuser', users.addUser);

//middleware rental
routerMiddleware.post('/newrental', rental.addRentals);


module.exports = routerMiddleware;