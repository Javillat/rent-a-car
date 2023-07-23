const { FieldValue } = require('firebase-admin/firestore');
const db = require('../db');
const Rental = require('../models/rental');

/**
 * Crear una nueva renta y guardarla a firestore.
 * Retornar un mensaje de error de presentarse este.
 */

addRentals = async (req, res) => {

    try {
        //Crea una nueva instancia del modelo rental con los datos recibos por body
        //const rentalData = req.body;
        const carId = req.params.carId;
        const userId = req.user.uid;

        if (Object.keys(carId).length === 0) {
            return res.sendStatus(204);
        } else {
            //Verficar si el auto esta disponible para alquiler
            const carRef = db.collection('cars').doc(carId);
            const carDoc = await carRef.get();
            if(!carDoc.exists){
                return res.status(404).json({error: 'El auto no existe.'});
            }
            if(!carDoc.data().available){
                return res.status(409).json({error:'Este auto ya está en uso'});
            }

            // Crear el registro de alquiler en la coleccion rental.
            const rentalData = {
                userId,
                carId,
                rentalDate: FieldValue.serverTimestamp,
                completed: false
            };

            let newRentalData = await Rental({ ...rentalData });
            //let rentalId = newRentalData.id;
            //Actualizar estado del auto a ocupado y guardar cambios en base de datos.
            await carRef.update({available:false});
            return res.status(201).json({message:`Se creó la renta con id ${newRentalData}, correctamente`});
        };
    } catch (error) {
        console.error("Error al agregar la renta: ", error.message);
        res.status(500).json({error: 'Error al realizar el alquiler.'});
    };
};

/**
 * 
 */

module.exports = {
    addRentals,
}
