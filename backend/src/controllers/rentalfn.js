const db = require('../db');
const Rental = require('../models/rental');

/**
 * Crear una nueva renta y guardarla a firestore.
 * Retornar un mensaje de error de presentarse este.
 */

addRentals = async (req, res) => {

    const rentalData = req.body;

    try {
        //Crea una nueva instancia del modelo rental con los datos recibos por body

        if (Object.keys(rentalData).length === 0) {
            return res.sendStatus(204);
        } else {
            let newRentalData = await Rental({ ...rentalData });
            return res.send(201, `Se creó la renta con id ${newRentalData}, correctamente`);
        };
    } catch (error) {
        console.error("Error al agregar la renta: ", error.message);
    };
};

module.exports = {
    addRentals,
}
