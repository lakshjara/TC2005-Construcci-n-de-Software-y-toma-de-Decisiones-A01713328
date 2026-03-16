const express = require('express');
const router  = express.Router();
const fs      = require('fs');
const ARCHIVO = 'canciones.txt';

function cargarCanciones() {
  if (!fs.existsSync(ARCHIVO)) {
    const iniciales = [
      { titulo: 'Inolvidable',        artista: 'Luis Miguel', imagen: 'https://cdn-images.dzcdn.net/images/cover/dc937566c6e1d6a00d8c9e2ddb26ed8e/1900x1900-000000-80-0-0.jpg' },
      { titulo: 'Hasta que me olvides', artista: 'Luis Miguel', imagen: 'https://i.scdn.co/image/ab67616d0000b273780268564c65ca302786e6ff' },
    ];
    guardarCanciones(iniciales);
    return iniciales;
  }
  return fs.readFileSync(ARCHIVO, 'utf8')
    .split('\n')
    .filter(l => l.trim() !== '')
    .map(linea => {
      const partes = linea.split('|');
      return { titulo: partes[0], artista: partes[1], imagen: partes[2] };
    });
}

function guardarCanciones(canciones) {
  const contenido = canciones.map(c => `${c.titulo}|${c.artista}|${c.imagen}`).join('\n');
  fs.writeFileSync(ARCHIVO, contenido, 'utf8');
}

const header = (title) => `
  <!DOCTYPE html>
  <html lang="es">
    <head>
      <meta charset="utf-8">
      <title>${title}</title>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@1.0.4/css/bulma.min.css">
    </head>
    <body>
      <section class="section">
        <div class="container">
`;

const footer = `
        </div>
      </section>
    </body>
  </html>
`;

// GET agregar canción
router.get('/new', (req, res) => {
  res.send(`
    ${header('Nueva canción')}
    <h1 class="title">Nueva canción</h1>
    <form action="/canciones/new" method="POST">
      <div class="field">
        <label for="titulo" class="label">Título</label>
        <div class="control">
          <input id="titulo" name="titulo" class="input" type="text" placeholder="e.g. La Incondicional">
        </div>
      </div>
      <div class="field">
        <label for="artista" class="label">Artista</label>
        <div class="control">
          <input id="artista" name="artista" class="input" type="text" placeholder="e.g. Luis Miguel">
        </div>
      </div>
      <div class="field">
        <label for="imagen" class="label">URL de la portada</label>
        <div class="control">
          <input id="imagen" name="imagen" class="input" type="text" placeholder="https://...">
        </div>
      </div>
      <input class="button is-primary" type="submit" value="Guardar canción">
      <a href="/canciones" class="button is-light">Cancelar</a>
    </form>
    ${footer}
  `);
});

// POST guarda en canciones.txt y redirige
router.post('/new', (req, res) => {
  const titulo  = (req.body.titulo  || '').trim();
  const artista = (req.body.artista || '').trim();
  const imagen  = (req.body.imagen  || '').trim();
  if (titulo) {
    const canciones = cargarCanciones();
    canciones.push({ titulo, artista, imagen });
    guardarCanciones(canciones);
  }
  res.redirect('/canciones');
});

// GET listado
router.get('/', (req, res) => {
  const canciones = cargarCanciones();

  let tarjetas = '';
  for (let cancion of canciones) {
    tarjetas += `
      <div class="column is-one-quarter-desktop is-half-tablet">
        <div class="card">
          <div class="card-image">
            <figure class="image is-1by1">
              <img src="${cancion.imagen}" alt="Portada de ${cancion.titulo}">
            </figure>
          </div>
          <div class="card-content">
            <p class="title is-5">${cancion.titulo}</p>
            <p class="subtitle is-6">${cancion.artista}</p>
          </div>
        </div>
      </div>
    `;
  }

  res.send(`
    ${header('Canciones')}
    <h1 class="title">Playlist para pasar el bloque con 100</h1>
    <p class="subtitle">${canciones.length} canciones guardadas</p>
    <div class="buttons mb-5">
      <a href="/canciones/new" class="button is-primary">Agregar canción</a>
      <a href="/" class="button is-light">Inicio</a>
    </div>
    <div class="columns is-multiline">
      ${tarjetas}
    </div>
    ${footer}
  `);
});

module.exports = router;