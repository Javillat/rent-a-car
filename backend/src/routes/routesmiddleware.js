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
routerMiddleware.delete('/delete/:id', cars.deleteCar) ;
routerMiddleware.put('/update/:id', cars.updateCar);

//middleware users
routerMiddleware.post('/signup', users.addUser);
routerMiddleware.post('/login', users.signinUser); // login user and return

//middleware rental
routerMiddleware.post('/newrental', rental.addRentals);


module.exports = routerMiddleware;