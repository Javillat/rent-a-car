//const { addDoc, collection } = require("firebase-admin");

const db = require("../db");
const Car = require('../models/car');

addCar = async (req, res) => {

    const carData = req.body;
    console.log("cardata ", carData);
    // const docRef = db.collection('cars');
    try {
        if (Object.keys(carData).length === 0) {
            return res.sendStatus(204);
        } else {
            newCar = await Car(carData)
            return res.send(201, `Se creó el auto con id ${newCar}, correctamente.`);
        }
        // result = await newCar.save()

        //     console.log(carData);
        //     if (carData) {
        //         await docRef.add({
        //             imagen:carData.imagen,
        //             marca: carData.marca,
        //             modelo: carData.modelo,
        //             trasmision: carData.trasmision,
        //             color: carData.color,
        //             anyo: carData.anyo,
        //             disponible: carData.disponible,
        //             preciobase:carData.parseInt(preciobase),
        //         });
        //         res.status(201).json({ message: "Nuevo Carro Agregado" });
        //     } else {
        //         throw 'No hay datos en el body';
        //     }

    } catch (error) {
        console.error('Error agregando el nuevo carro!', error.message);
    }
}

getCars = async (req, res) => {
    let carsList = [];
    try {
        const carsSnapshot = await db.collection('cars').get();
        //for (let i=0 ;i<carsSnapshot.docs.length; i++){}
        if (!carsSnapshot.empty) {
            carsSnapshot.forEach(doc => {
                carsList.push(doc.data());
            });
            console.log('Lista de autos ', carsList);
            return res.status(200).json(carsList)
        } else {
            return res.status(404).json('No existen autos');
        };
    } catch (error) {
        console.log('Error interno del servidor!', error.message);
    };
}

module.exports = {
    addCar,
    getCars,
}