//const { addDoc, collection } = require("firebase-admin");

const db = require("../db");

addCar = async(req, res) => {

    const carData = req.body;
    const docRef = db.collection('cars');
    try{
        console.log(carData);
        if(carData) {
            //await db.ref('cars').push(carData);
            await docRef.add({
                marca: carData.marca,
                color: carData.color,
                anyo: carData.anyo,
            });
            res.status(201).json({ message: "Nuevo Carro Agregado"});
        }else {
            throw 'No hay datos en el body';
        }

    }catch(error){
        console.log('Error agregando el nuevo carro', error.message);
    }
}

module.exports = {
    addCar,
}