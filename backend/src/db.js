const { initializeApp, applicationDefault, cert }  = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

const DATABASE_URL = process.env.DATABASE_URL;

const firebaseConfig = {
    databaseURL: "DATABASE_URL",
};

//Inicializar firebase
const app = initializeApp(firebaseConfig);

//Inicializar base de datos en tiempo real y obtener la referencia al servicio.
const db = getDatabase();

module.exports = db;