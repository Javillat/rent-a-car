//Requerir express
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('../src/routes/index');

//require('./db.js')
const URLORIGIN = process.env.URLORIGIN;

const server = express();

server.name = 'API';

//middlewares
server.use(bodyParser.urlencoded({extended: false}));
server.use(bodyParser.json()); // parse application/json
server.use(morgan('dev'));
/**
 * Permitir multiples origenes en la peticion hacia la API.
 */
server.use((req, res, next) => { 
    const allowedOrigins = ['http://localhost:8080', URLORIGIN];
    let origin = req.headers['origin'] || '';
    if (allowedOrigins && allowedOrigins.includes(origin)){
        res.setHeader('Access-Control-Allow-Origin', origin);
    };
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Authorization, Accept');
    res.header('Access-Control-Allow-Credentials', true);
    return next();
});

server.use('/', routes);
//Si ocurre algun error tomarlo acá, procesar el stack y mostrarlo.
server.use((err, req, res, next) => {
    console.error(`Error ${res.statusCode || 500}:`, err.stack);
    res.status(500).send('Error interno del servidor!');
});

module.exports = server;