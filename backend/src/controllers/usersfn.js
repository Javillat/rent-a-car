
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
            res.status(201).json({ message: "Usuario registrado satisfactoriamente con uid", uid: credencial.uid });
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
    // console.log('Authentication ',auth);
    // console.log("Email y password ",email);
    try {
        const auth = getAuth();
        const { email, password } = req.body;

        const user = await auth.getUserByEmail(email, password);
        console.log("Resultado user", user.uid)
        //const isPasswordCorrect = await bcrypt.compare(password, user.passwordHash);
        //console.log(isPasswordCorrect);
        //.then(() => {
        //console.log("Compare result ", isPasswordCorrect);
        //if(!isPasswordCorrect){
        const tokenUser = await auth.createCustomToken(user.uid);
        //console.log('Token ', tokenUser);
        return res.status(200).json({ tokenUser });
        //return res.status(401).json({error: "Credenciales invalidas"});
        //}else{
    }

    //const token = await signin.user.getIdToken();
    //console.log(`Usuario ${signin.user.displayName}, ha iniciado sesión, con token ${token}`);

    // }else{
    //     res.status(204).json({error:"Los campos no pueden estar vacios"});
    // }

    catch (error) {
        //console.log(error.message, error.code);
        return res.status(400).json({ Mensaje: error.message, Error: error.code });
    }

};

module.exports = {
    addUser,
    signinUser,
};