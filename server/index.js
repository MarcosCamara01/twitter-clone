const connection = require("./database/connection");
const express = require("express");
const cors = require("cors");
require('dotenv').config();

connection();

const app = express();
const puerto = process.env.PORT || 3900;

app.use(cors({
  origin: 'https://twitter-clone-aca36.web.app'
}));

app.use(express.json());
app.use(express.urlencoded({extended: true})); 

const UserRoutes = require("./routes/user");
const PublicationRoutes = require("./routes/publication");
const FollowRoutes = require("./routes/follow");

app.use("/api/user", cors(), UserRoutes);
app.use("/api/publication", cors(), PublicationRoutes);
app.use("/api/follow", cors(), FollowRoutes);

app.listen(puerto, "0.0.0.0", () => {
    console.log("Servidor de node corriendo en el puerto: ", puerto);
});