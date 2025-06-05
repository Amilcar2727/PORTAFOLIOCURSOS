const mongoose = require("mongoose");

const conectarDB = async() => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ Conexión a MongoDB exitosa");
    }catch(err){
        console.error("❌ Error al conectar a MongoDB: ", err)
        process.exit(1);
    }
};

const cerrarConexion = async() => {
    try{
        await mongoose.connection.close();
        console.log("🛑 Conexión a MongoDB cerrada");
    }catch(err){
        console.error("⚠ Error cerrando MongoDB: ",err);
    }
};

module.exports = {conectarDB, cerrarConexion};