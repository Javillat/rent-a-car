
const db = require("../db");
const User = require("../models/user");

/**
 * Crear un nuevo usuario y guardarlo a firestore.
 * Retornar un mensaje de error si el error ocurre.
 */

addUser = async (req, res) => {
    
    const userData = req.body;

    try {
        //Crea una nueva instancia del modelo user con los datos recibidos en req.body

        if(Object.keys(userData).length === 0){
            return res.sendStatus(204);
        }else{
            let newUser = await User({...userData});
            return res.send(201, `Se creó el usuario con id ${newUser}, correctamente.`);
        }
    } catch(error){
        console.error("Error al crear el usuario: ", error.message);
    };
}

module.exports = {    
    addUser
};