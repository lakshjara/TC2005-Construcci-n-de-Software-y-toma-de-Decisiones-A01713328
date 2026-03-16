const express = require('express');
const router  = express.Router();
const fs      = require('fs');
const ARCHIVO = 'albumes.txt';

function cargarAlbumes() {
  if (!fs.existsSync(ARCHIVO)) {
    const iniciales = [
      { titulo: '20 años',   artista: 'Luis Miguel', anio: '1990', imagen: 'https://i.scdn.co/image/ab67616d0000b273e6cab0ffee915cdbe7c7d85a' },
      { titulo: 'Lover', artista: 'Taylor Swift', anio: '2019', imagen: 'https://resources.sanborns.com.mx/imagenes-sanborns-ii/1200/602577928680.jpg' },
    ];
    guardarAlbumes(iniciales);
    return iniciales;
  }
  return fs.readFileSync(ARCHIVO, 'utf8')
    .split('\n')
    .filter(l => l.trim() !== '')
    .map(linea => {
      const partes = linea.split('|');
      return { titulo: partes[0], artista: partes[1], anio: partes[2], imagen: partes[3] };
    });
}

function guardarAlbumes(albumes) {
  const contenido = albumes.map(a => `${a.titulo}|${a.artista}|${a.anio}|${a.imagen}`).join('\n');
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

// GET para agregar álbum
router.get('/new', (req, res) => {
  res.send(`
    ${header('Nuevo álbum')}
    <h1 class="title">Nuevo álbum</h1>
    <form action="/albumes/new" method="POST">
      <div class="field">
        <label for="titulo" class="label">Título</label>
        <div class="control">
          <input id="titulo" name="titulo" class="input" type="text" placeholder="e.g. Romances">
        </div>
      </div>
      <div class="field">
        <label for="artista" class="label">Artista</label>
        <div class="control">
          <input id="artista" name="artista" class="input" type="text" placeholder="e.g. Luis Miguel">
        </div>
      </div>
      <div class="field">
        <label for="anio" class="label">Año</label>
        <div class="control">
          <input id="anio" name="anio" class="input" type="text" placeholder="e.g. 1997">
        </div>
      </div>
      <div class="field">
        <label for="imagen" class="label">URL de la portada</label>
        <div class="control">
          <input id="imagen" name="imagen" class="input" type="text" placeholder="https://...">
        </div>
      </div>
      <input class="button is-primary" type="submit" value="Guardar álbum">
      <a href="/albumes" class="button is-light">Cancelar</a>
    </form>
    ${footer}
  `);
});

// POST guarda en albumes.txt y redirige
router.post('/new', (req, res) => {
  const titulo  = (req.body.titulo  || '').trim();
  const artista = (req.body.artista || '').trim();
  const anio    = (req.body.anio    || '').trim();
  const imagen  = (req.body.imagen  || '').trim();
  if (titulo) {
    const albumes = cargarAlbumes();
    albumes.push({ titulo, artista, anio, imagen });
    guardarAlbumes(albumes);
  }
  res.redirect('/albumes');
});

// GET listado
router.get('/', (req, res) => {
  const albumes = cargarAlbumes();

  let tarjetas = '';
  for (let album of albumes) {
    tarjetas += `
      <div class="column is-one-quarter-desktop is-half-tablet">
        <div class="card">
          <div class="card-image">
            <figure class="image is-1by1">
              <img src="${album.imagen}" alt="Portada de ${album.titulo}">
            </figure>
          </div>
          <div class="card-content">
            <p class="title is-5">${album.titulo}</p>
            <p class="subtitle is-6">${album.artista}</p>
            <p class="is-size-7 has-text-grey">${album.anio}</p>
          </div>
        </div>
      </div>
    `;
  }

  res.send(`
    ${header('Álbumes')}
    <h1 class="title">Discografía</h1>
    <p class="subtitle">${albumes.length} álbumes guardados</p>
    <div class="buttons mb-5">
      <a href="/albumes/new" class="button is-primary">Agregar álbum</a>
      <a href="/" class="button is-light">Inicio</a>
    </div>
    <div class="columns is-multiline">
      ${tarjetas}
    </div>
    ${footer}
  `);
});

module.exports = router;