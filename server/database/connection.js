const mongoose = require("mongoose");
require('dotenv').config();

mongoose.set('strictQuery', false);

const uri = process.env.MONGODB_URI;

const connection = async () => {

    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log("Conectado correctamente.");

    } catch (error) {
        console.log(error);
        throw new Error("No se ha podido conectar a la base de datos.");
    }

}

module.exports = connection;
