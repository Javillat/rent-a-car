
const firebase = require('firebase-admin');
const User = require("../models/user");


/**
 * Crear un nuevo usuario y guardarlo a firestore.
 * Retornar un mensaje de error si el error ocurre.
 */

addUser = async (req, res) => {

    const {email, password} = req.body;

    try {
        if(email && password){
            const credencial = await firebase.auth().createUser({email, password});
            //console.log(credencial);
            res.sendStatus(201);
        }else{
            res.status(204).send("Los campos no pueden estar vacios");
        }
    } catch (error) {

        //console.error("Error al crear el usuario: ", error.message, error.code);
        return res.status(400).send(error);
    };
}

module.exports = {
    addUser
};