const express = require('express');
const cars = require('../controllers/carsfn.js');
const users = require('../controllers/usersfn.js');
const rental = require("../controllers/rentalfn.js");


// Router middleware endpoint
routerMiddleware = express.Router();

//middleware cars
routerMiddleware.post('/newcar', users.authenticate, cars.addCar);          // Agregar un nuevo auto
routerMiddleware.get('/getcars', users.authenticate, cars.getCars);         // Obtener todos los autos
routerMiddleware.get('/getcar/:id', users.authenticate, cars.getCarById);   // Obtener un auto por su Id
routerMiddleware.delete('/delete/:id', users.authenticate, cars.deleteCar); // Eliminar un auto
routerMiddleware.put('/update/:id', users.authenticate, cars.updateCar);    // Actualizar un auto

//middleware users
routerMiddleware.post('/signup', users.addUser);   // Registrar usuario
routerMiddleware.post('/login', users.signinUser); // loguear usuario
routerMiddleware.put('/logout', users.signoutUser);// Desloguear usuario

//middleware rental
routerMiddleware.post('/:carId', users.authenticate, rental.addRentals);                // Agregar una renta
routerMiddleware.get('/auth/:userId', users.authenticate, rental.getRentByUser);        // Obtener las rentas de un usuario       
routerMiddleware.post('/return/:rentalId', users.authenticate, rental.addReturnCar);    // Rerornar un auto
routerMiddleware.get('/allrental', users.authenticate, rental.getRentalList);           // Obtener autos rentados


module.exports = routerMiddleware;