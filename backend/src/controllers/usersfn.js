
const admin = require('firebase-admin');
const bcrypt = require('bcrypt');
const User = require("../models/user");
const { getAuth, signOut } = require("firebase-admin/auth")
const jwt = require('jsonwebtoken');
const { SECRET } = process.env;


/**
 * Crear un nuevo usuario y guardarlo a firestore.
 * Retornar un mensaje de error si el error ocurre.
 */

addUser = async (req, res) => {

    try {
        const { email, password, phoneNumber, displayName, photoURL, disabled } = req.body;
        //const hashedPassword = await bcrypt.hash(password, 10);
        if (email && password) {
            const credencial = await admin.auth().createUser({
                email,
                password,
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
 * Middleware para autenticar al usuario mediante las rutas protegidas.
 */
authenticate = async (req, res, next) => {
    try {
        const auth = getAuth();
        const { authorization } = req.headers;
        console.log('Autorizacion ',authorization);
        if (!authorization || !authorization.startsWith('Bearer ')) {
            return res.status(403).json({ message: "Acceso prohibido!" });
        }else {
            const token = authorization.split(' ')[1];
            jwt.verify(token, SECRET, (err, data) => {
                if(!data || err){
                    res.status(401).json({message:'Error de autenticación!'})
                }else{
                    console.log('Datos del usuario ', data);
                    //res.json({data:data})
                    next();
                };
            });
            //const decodeToken = await auth.verifyIdToken(token);
        }
    } catch (error) {
        console.log(error);
        return res.status(403).json({ message: "Acceso prohibido" });
    };

};

/**
 * Hacer login al usuario y manejar errores. 
 */

signinUser = async (req, res) => {
    // console.log('Authentication ',auth);
    // console.log("Email y password ",email);
    try {
        const auth = getAuth();
        const { email, password } = req.body;

        //const user =  await auth.getUserByEmail(email,password);
        const user = await auth.getUserByEmail(email);
        console.log("Resultado user", user.uid)
        console.log('Lo que tiene user', user);
        //const isPasswordCorrect = bcrypt.compare(password, user.passwordHash || '');
        bcrypt.compare(password, user.passwordHash, async function (err, result) {
            if (!result && err == null) {
                return res.status(401).json({ error: "Credenciales invalidas" });
            } else {
                //const tokenUser = await auth.createCustomToken(user.uid);
                const tokenUser = jwt.sign({email:user.email, uid:user.uid}, SECRET, {expiresIn:"1h"});
                console.log('userToken', tokenUser);
                return res.status(200).json({ tokenUser });
            }
        });
    }
    catch (error) {
        //console.log(error.message, error.code);
        return res.status(400).json({ Mensaje: error.message, Error: error.code });
    }

};

/**
 * Desloguear al usuario.
 */

signoutUser = async () => {
    try {
        const auth = getAuth();
        signOut(auth);
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = {
    addUser,
    authenticate,
    signinUser,
    signoutUser,
};