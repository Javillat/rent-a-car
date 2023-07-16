/**
 * Modelo Rental, prepara una coleccion de rentas.
 */

const db = require('../db');

Rental = async(rentalData) => {
    try{
        rentalRef = db.collection("rental").doc();
        await rentalRef.set(rentalData);
        return rentalRef.id;
    }catch(error){
        console.error(error.message);
    };
};

module.exports = Rental;