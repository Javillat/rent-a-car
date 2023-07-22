
const admin = require('firebase-admin');
const bcrypt = require('bcrypt');
const User = require("../models/user");
const { getAuth } = require("firebase-admin/auth")
//console.log(signInWithEmailAndPassword);


/**
 * Crear un nuevo usuario y guardarlo a firestore.
 * Retornar un mensaje de error si el error ocurre.
 */

addUser = async (req, res) => {

    try {
        const { email, password, phoneNumber, displayName, photoURL, disabled } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        if (email && password) {
            const credencial = await admin.auth().createUser({ 
                email, 
                password: hashedPassword, 
                phoneNumber,  
                displayName,
                photoURL: photoURL || "https://www.citypng.com/photo/20794/free-round-flat-male-portrait-avatar-user-icon-png",
                disabled
            });
            //console.log(credencial);
            res.status(201).json({message:"Usuario registrado satisfactoriamente con uid ", uid:credencial.uid});
        } else {
            res.status(204).send("Los campos no pueden estar vacios");
        }
    } catch (error) {

        //console.error("Error al crear el usuario: ", error.message, error.code);
        return res.status(400).send(error);
    };
}

/**
 * Hacer login al usuario y manejar errores. 
 */

signinUser = async (req, res) => {
    const auth = getAuth();
    console.log('Authentication ',auth);
    const { email, password } = req.body;
    console.log("Email y password ",email);
    try {

        if(email && password){
            const signin = await auth.getUserByEmail(email, password);
            console.log("Signin", signin);
            //const token = await signin.user.getIdToken();
            //console.log(`Usuario ${signin.user.displayName}, ha iniciado sesión, con token ${token}`);
            res.sendStatus(200);

        }else{
            res.status(204).send("Los campos no pueden estar vacios");
        }
        
    } catch (error) {
        console.log(error.message, error.code);
        return res.status(400).send(error);
    }

};

module.exports = {
    addUser,
    signinUser,
};