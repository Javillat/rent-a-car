const appserver = require('./src/app.js');
const db = require('./src/db.js');
const PORT = process.env.PORT || 3001;

//Sincronizar todos los modelos a la vez con el servidor de firestore.
//db.sync({ force: false}).then(() => {
    //console.log('Modelos sincronizados correctamente.');
    appserver.listen(PORT, () => {
        console.log(`Servidor corriendo en puerto ${PORT}`);
    });
//});
