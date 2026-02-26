const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

const rutasvideojuegos = require('./routes/videojuegos.routes');
app.use('/videojuegos', rutasvideojuegos);

app.use((request, response, next) => {
    response.status(404).send("El videojuego no existe");
});

app.listen(3000);
