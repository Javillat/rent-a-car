//const admin = require('firebase-admin');
/**
 * Modelo Car, prepara una colección de autos.
 */

const db = require('../db');

Car = async(carData) => {
    try{
        autoRef = db.collection("cars").doc()
        await autoRef.set(carData);
        return autoRef.id; 

    }catch(error){
        console.error(error.message);
    }
}

module.exports = Car;