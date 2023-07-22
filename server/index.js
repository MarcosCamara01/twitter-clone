// Importar dependencias
const connection = require("./database/connection");
const express = require("express");
const cors = require("cors");
require('dotenv').config();

// Conexion a bbdd
connection();

// Crear servidor node
const app = express();
const puerto = process.env.PORT || 3900;

// Configurar cors
app.use(cors({
  origin: 'http://localhost:5173'
}));

// Convertir los datos del body a objetos js
app.use(express.json());
app.use(express.urlencoded({extended: true})); 

// Cargar conf rutas
const UserRoutes = require("./routes/user");
const PublicationRoutes = require("./routes/publication");
const FollowRoutes = require("./routes/follow");

app.use("/api/user", cors(), UserRoutes);
app.use("/api/publication", cors(), PublicationRoutes);
app.use("/api/follow", cors(), FollowRoutes);

// Poner servidor a escuchar peticiones http
app.listen(puerto, "0.0.0.0", () => {
    console.log("Servidor de node corriendo en el puerto: ", puerto);
});