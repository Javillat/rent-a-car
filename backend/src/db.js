require('dotenv').config();
//const { initializeApp, applicationDefault, cert }  = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const admin = require('firebase-admin');

const DATABASE_URL = process.env.DATABASE_URL;
console.log(DATABASE_URL);

const serviceAccount = require("../src/config/rentacarvue-firebase-adminsdk-qf1hh-f473c0c142.json");

//Inicializar firebase
const app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL:DATABASE_URL,
});
//console.log(app);

//Inicializar base de datos en tiempo real y obtener la referencia al servicio.
const db = getFirestore(app);
console.log(db);

module.exports = db;