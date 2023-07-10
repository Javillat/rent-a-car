const { initializeApp, applicationDefault, cert }  = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const { credential } = require("firebase-admin");

const DATABASE_URL = process.env.DATABASE_URL;

const serviceAccount = require("../src/config/rentacarvue-firebase-adminsdk-qf1hh-f473c0c142.json");

//Inicializar firebase
const app = initializeApp({
    credential: credential.cert(serviceAccount),
    databaseURL:DATABASE_URL,
});

//Inicializar base de datos en tiempo real y obtener la referencia al servicio.
const db = getFirestore();

module.exports = db;