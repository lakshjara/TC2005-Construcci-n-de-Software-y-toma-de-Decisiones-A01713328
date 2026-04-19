// Lab 22: Archivos
// A01713328 María Fernanda Padmé Lakshmi Martínez Jara

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const csrf = require('csurf');
const multer = require('multer');

const cancionesRoutes = require('./routes/canciones.routes');
const albumesRoutes = require('./routes/albumes.routes');
const usersRoutes = require('./routes/users.routes');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  multer({
    storage: fileStorage
  }).single('imagen')
);

app.use(session({
  secret: 'lab22 string secreto largo para canciones y albumes',
  resave: false,
  saveUninitialized: false
}));

const csrfProtection = csrf();
app.use(csrfProtection);

app.use((req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  res.locals.isLoggedIn = req.session.isLoggedIn || false;
  res.locals.username = req.session.username || '';
  next();
});

app.use('/users', usersRoutes);
app.use('/canciones', cancionesRoutes);
app.use('/albumes', albumesRoutes);

app.get('/', (req, res) => {
  res.render('index', {
    tituloPagina: 'Laboratorio 24',
    nombre: 'A01713328 María Fernanda Padmé Lakshmi Martínez Jara'
  });
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).render('404', { tituloPagina: 'Error' });
});

app.use((req, res) => {
  res.status(404).render('404', { tituloPagina: '404' });
});

app.listen(3000, () => {
  console.log('Servidor en http://localhost:3000');
});