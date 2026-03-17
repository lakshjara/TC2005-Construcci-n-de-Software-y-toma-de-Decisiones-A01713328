// Lab 14: Manejo de sesiones y cookies
// A01713328 María Fernanda Padmé Lakshmi Martínez Jara

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');

const cancionesRoutes = require('./routes/canciones.routes');
const albumesRoutes = require('./routes/albumes.routes');
const usersRoutes = require('./routes/users.routes');

const app = express();

// Configuración
app.set('view engine', 'ejs');
app.set('views', 'views');

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'lab14 string secreto largo para canciones y albumes',
  resave: false,
  saveUninitialized: false
}));

// Rutas
app.use('/users', usersRoutes);
app.use('/canciones', cancionesRoutes);
app.use('/albumes', albumesRoutes);

app.get('/', (req, res) => {
  res.render('index', {
    tituloPagina: 'Laboratorio 14',
    nombre: 'A01713328 María Fernanda Padmé Lakshmi Martínez Jara',
    username: req.session?.username || ''
  });
});

// 404
app.use((req, res) => {
  res.status(404).render('404', {
    tituloPagina: '404',
    username: req.session?.username || ''
  });
});

app.listen(3000, () => {
  console.log('Servidor en http://localhost:3000');
});