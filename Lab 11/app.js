// Lab 11: Express
// A01713328 María Fernanda Padmé Lakshmi Martínez Jara

const express    = require('express');
const bodyParser = require('body-parser');
const cancionesRoutes = require('./routes/canciones.routes');
const albumesRoutes = require('./routes/albumes.routes');

const app = express();

// Middleware
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: false }));

// Rutas
app.use('/canciones', cancionesRoutes);
app.use('/albumes', albumesRoutes);

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="es">
      <head>
        <meta charset="utf-8">
        <title>Playlist</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@1.0.4/css/bulma.min.css">
      </head>
      <body>
        <section class="section">
          <div class="container">
            <h1 class="title">Laboratorio 11</h1>
            <p class="subtitle">A01713328 María Fernanda Padmé Lakshmi Martínez Jara</p>
            <a href="/canciones" class="button">Ver canciones</a>
            <a href="/canciones/new" class="button is-primary">Agregar canción</a>
            <h2 class="title is-4 mt-4">¿Qué es package.json?</h2>
            <div class="content">
              <p>Es un archivo de configuración de proyectos en Node.js que guarda información importante como el nombre del proyecto, su versión, las dependencias que usa y los comandos que se pueden ejecutar con npm.</p>
              </ul>
            </div>
          </div>
        </section>
      </body>
    </html>
  `);
});

// 404
app.use((req, res) => {
  res.status(404).send(`
    <!DOCTYPE html>
    <html lang="es">
      <head>
        <meta charset="utf-8">
        <title>404</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@1.0.4/css/bulma.min.css">
      </head>
      <body>
        <section class="section">
          <div class="container">
            <h1 class="title has-text-danger">404</h1>
            <p class="subtitle">Página no encontrada</p>
            <a href="/" class="button is-primary">Volver al inicio</a>
          </div>
        </section>
      </body>
    </html>
  `);
});

app.listen(3000);
console.log('Servidor en http://localhost:3000');