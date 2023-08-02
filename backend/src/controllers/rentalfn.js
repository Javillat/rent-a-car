const { FieldValue } = require('firebase-admin/firestore');
const db = require('../db');
const Rental = require('../models/rental');

/**
 * Crear una nueva renta y guardarla a firestore.
 * Retornar un mensaje de error de presentarse este.
 */

addRentals = async (req, res) => {

    try {
        /**
         * Crea una nueva instancia del modelo rental con los datos recibos por params/middleware authenticate
         * agregando una nueva renta.
         */

        const carId = req.params.carId;
        //console.log('Request ',req);
        const userId = req.user;
        console.log('UserId ', userId);
        console.log('UserId uid', userId.uid);

            //Verficar si el auto esta disponible para alquiler
            const carRef = db.collection('cars').doc(carId);
            const carDoc = await carRef.get();
            console.log('CarDoc ',carDoc);
            if(!carDoc.exists){
                return res.status(404).json({error: 'El auto no existe.'});
            }
            if(!carDoc.data().available){
                return res.status(409).json({error:'Este auto ya está en uso'});
            }

            // Crear el registro de alquiler en la coleccion rental.
            const rentalData = {
                userId: userId.uid,
                carId,
                marca:carDoc.data().marca,
                tipo:carDoc.data().tipo,
                año:carDoc.data().anyo,
                //rentalDate: FieldValue.serverTimestamp,
                rentalData: new Date(),
                completed: false
            };

            let newRentalData = await Rental({ ...rentalData });
            //let rentalId = newRentalData.id;
            //Actualizar estado del auto a ocupado y guardar cambios en base de datos.
            await carRef.update({available:false});
            return res.status(200).json({message:`Se creó la renta con id ${newRentalData}, correctamente`});
    } catch (error) {
        console.error("Error al agregar la renta: ", error.message);
        res.status(500).json({error: 'Error al realizar el alquiler.'});
    };
};

/**
 * Agrega una nueva devolucion del auto alquilado con anterioridad.
 * 
 */

addReturnCar = async(req, res) => {
    try{
        const rentalId = req.params.rentalId;
        const userId = req.user;

        //Verificar si el alquiler pertenece al usuario autenticado.
        const rentalRef = db.collection('rental').doc(rentalId);
        const rentalDoc = await rentalRef.get();
        if(!rentalDoc.exists){
            return res.status(404).json({error:'El alquiler no existe.'});
        }
        if(rentalDoc.data().userId !== userId){
            return res.status(403).json({error:"No tienes permiso para devolver este auto"});
        }

        //Verificar si el alquiler ya ha sido completado (devuelto)
        if(rentalDoc.data().completed === true ){
            return res.status(409).json({error:'Este alquiler ya está devuelto'});
        }

        //Marcar el alquiler como completado y guardar la fecha de devolucion.
        await rentalRef.update({
            //returnDate:FieldValue.serverTimestamp(),
            returnDate: new Date(),
            completed :true
        });

        //Marcar el auto como disponible nuevamente
        let carId = rentalDoc.data().carId;
        let carRef = db.collection('cars').doc(carId);
        await carRef.update({available: true});

        res.json({message: 'Devolucion del auto realizada con exito.'});
    }catch(error){
        console.log('Error en la devolucion del auto');
        res.status(500).json({error: 'Error al realizar la devolucion del auto.'});
    };
}

/**
 * Obtener la lista de autos rentados.
 */
getRentalList =  async (req, res) => {
    const carRented = [];
    try{
        const availableRef = db.collection('cars');
        const snapshot = await availableRef.where('available', '==', false).get();
        if(snapshot.empty){
            console.log('No hay autos alquilados');
            return res.json({message: 'No hay autos rentados'});
        }
        snapshot.forEach(doc => {
            //console.log(doc.id, '=>', doc.data() );
            carRented.push({id:doc.id, marca: doc.data().marca, tipo: doc.data().tipo, color: doc.data().color, disponible: doc.data().available, año: doc.data().anyo});
        });
        console.log(carRented);
        return res.status(200).json(carRented);
    }catch(error){
        console.log(error);
    }
}

/**
 * Obtener las rentas por usuario.
 */

getRentByUser = async (req, res) => {
    try {
        const { userId } = req.params;
        //userId = req.user['userId'];
        console.log('Usuario uid', userId);
        userRents = [];
        const availableRef = db.collection('rental');
        const snapshot = await availableRef.where('userId', '==', userId).get();
        //const snapshot = await availableRef.get();
        if(snapshot.empty){
            return res.send('No hay rentas para el usuario');
        }else{
            snapshot.forEach(doc => {
                userRents.push({
                    idRent: doc.id, 
                    carId: doc.data().carId, 
                    completed: doc.data().completed, 
                    rentDate: doc.data().rentalData, 
                    userId: doc.data().userId 
                })
            })
        }
        return res.status(200).json(userRents);
        
    } catch (error) {
        console.error(error.message);
    }

}

//Funciones exportadas
module.exports = {
    addRentals,
    addReturnCar,
    getRentalList,
    getRentByUser,
}
