//const { addDoc, collection } = require("firebase-admin");

const db = require("../db");

addCar = async (req, res) => {

    const carData = req.body;
    const docRef = db.collection('cars');
    try {
        console.log(carData);
        if (carData) {
            await docRef.add({
                marca: carData.marca,
                color: carData.color,
                anyo: carData.anyo,
            });
            res.status(201).json({ message: "Nuevo Carro Agregado" });
        } else {
            throw 'No hay datos en el body';
        }

    } catch (error) {
        console.log('Error agregando el nuevo carro!', error.message);
    }
}

getCars = async (req, res) => {
    let carsList = [];
    //const carsSnapshot = db.collection('cars');
    try {
        const carsSnapshot = await db.collection('cars').get();
        //for (let i=0 ;i<carsSnapshot.docs.length; i++){}
        if (!carsSnapshot.empty) {
            carsSnapshot.forEach(doc => {
                carsList.push(doc.data()); 
            });
            console.log('Lista de autos ',carsList);    
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