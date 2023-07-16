const express = require('express');
const cars = require('../controllers/carsfn.js');
const users = require('../controllers/usersfn.js');

// Router for /cars/ endpoint
routerMiddleware = express.Router();

//middleware cars
routerMiddleware.post('/newcar', cars.addCar);
routerMiddleware.get('/getcars', cars.getCars);
//middleware users
routerMiddleware.post('/newuser', users.addUser);


module.exports = routerMiddleware;