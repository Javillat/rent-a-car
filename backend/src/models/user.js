/**
 * Modelo User, prepara una colección de usuarios
*/

const db = require('../db');

User = async(userData) => {
    try{
        userRef =db.collection("users").doc();
        await userRef.set(userData);
        return userRef.id;
    }catch(error){
        console.error('Error creando el usuario:', error.message);
    };
};

module.exports = User;