// Lab 12: HTML dinámico
// A01713328 María Fernanda Padmé Lakshmi Martínez Jara

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const cancionesRoutes = require('./routes/canciones.routes');
const albumesRoutes = require('./routes/albumes.routes');

const app = express();

// Configuración
app.set('view engine', 'ejs');
app.set('views', 'views');

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
app.use('/canciones', cancionesRoutes);
app.use('/albumes', albumesRoutes);

app.get('/', (req, res) => {
  res.render('index', {
    tituloPagina: 'Laboratorio 12',
    nombre: 'A01713328 María Fernanda Padmé Lakshmi Martínez Jara'
  });
});

// 404
app.use((req, res) => {
  res.status(404).render('notfound', {
    tituloPagina: '404'
  });
});

app.listen(3000, () => {
  console.log('Servidor en http://localhost:3000');
});