//const { addDoc, collection } = require("firebase-admin");

const db = require("../db");
const Car = require('../models/car');

/**
 * Agregar un auto a la coleccion.
 */

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
    } catch (error) {
        console.error('Error agregando el nuevo carro!', error.message);
    }
}

/**
 * Obtener todos los autos/documentos de la coleccion.
 */
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

/**
 * Obtener un auto por id
 */

getCarById = async (req, res) => {
    const { id } = req.params;
    console.log('Cars id ',id);
    try{
        const carDoc = db.collection("cars").doc(id);
        const carsSnapshot = await carDoc.get();
        if(!carsSnapshot.exists){
            throw new Error("El auto no existe");
        }else{
            return res.status(200).json({id:carsSnapshot.id, ...carsSnapshot.data()})
        }
    }catch(error){
        console.log(`Hubo un problema al obtener el auto con id ${id}`, error.message);
    }
}

module.exports = {
    addCar,
    getCars,
    getCarById,
}