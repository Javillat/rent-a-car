//const { addDoc, collection } = require("firebase-admin");
const admin = require('firebase-admin');
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
            return res.send(200, `Se creó el auto con id ${newCar}, correctamente.`);
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
        const availableRef = db.collection('cars');
        const carsSnapshot = await availableRef.where('available', '==', true).get();
        
        if (!carsSnapshot.empty) {
            carsSnapshot.forEach(doc => {
                carsList.push({id:doc.id, marca: doc.data().marca, tipo: doc.data().tipo, color: doc.data().color, disponible: doc.data().available, año: doc.data().anyo});
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
    //console.log('Cars id ',id);
    try {
        const carDoc = db.collection("cars").doc(id);
        const carsSnapshot = await carDoc.get();
        if (!carsSnapshot.exists) {
            throw new Error("El auto no existe");
        } else {
            return res.status(200).json({ id: carsSnapshot.id, ...carsSnapshot.data() })
        };
    } catch (error) {
        console.log(`Hubo un problema al obtener el auto con id ${id}`, error.message);
    };
};

/**
 * Eliminar un auto desde firestore.
 */

deleteCar = async (req, res) => {
    let { id } = req.params;
    try {
        let findDoc;
        // Buscar documento a eliminar en la colección "cars" y guardar su id
        findDoc = db.collection("cars").doc(id);
        const carsSnapshot = await findDoc.get();
        (carsSnapshot.exists) ? deleteDoc = await findDoc.delete() & res.sendStatus(200) : res.sendStatus(404, `No se encontró el auto con id ${id}`);
    } catch (error) {
        console.error(error.message);
    }
};

/**
 * Actualizar campos en firestore en la collection cars
 */
updateCar = async (req, res) => {
    let { id } = req.params;
    let bodyData = JSON.parse(JSON.stringify(req.body));

    try {
        findDoc = db.collection('cars').doc(id);
        await findDoc.update(bodyData);
        res.sendStatus(200);
    } catch (error) {
        console.error(error.message);
    }
    


};

// Exportamos las funciones
module.exports = {
    addCar,
    getCars,
    getCarById,
    deleteCar,
    updateCar,
}