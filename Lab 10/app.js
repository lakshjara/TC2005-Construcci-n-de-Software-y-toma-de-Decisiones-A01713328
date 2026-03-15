// Lab 10: Rutas y formas
// A01713328 María Fernanda Padmé Lakshmi Martínez Jara

const http = require('http');
const fs   = require('fs');

// plantilla HTML
const html_header = `
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Playlist para pasar el bloque</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@1.0.4/css/bulma.min.css">
    <link rel="stylesheet" href="/style.css">
  </head>
  <body>
    <section class="section">
      <div class="container">
`;

const html_footer = `
      </div>
    </section>
  </body>
</html>
`;

// formulario para agregar una nueva canción
const html_form = `
  <h1 class="title">Nueva canción</h1>

  <form action="/new" method="POST">
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
`;

// persistencia en canciones.txt 
function cargarCanciones() {
  if (!fs.existsSync('canciones.txt')) {
    const iniciales = [
      {
        titulo:  'Inolvidable',
        artista: 'Luis Miguel',
        imagen:  'https://cdn-images.dzcdn.net/images/cover/dc937566c6e1d6a00d8c9e2ddb26ed8e/1900x1900-000000-80-0-0.jpg'
      },
      {
        titulo:  'Hasta que me olvides',
        artista: 'Luis Miguel',
        imagen:  'https://i.scdn.co/image/ab67616d0000b273780268564c65ca302786e6ff'
      },
    ];
    guardarCanciones(iniciales);
    return iniciales;
  }

  return fs.readFileSync('canciones.txt', 'utf8')
    .split('\n')
    .filter(l => l.trim() !== '')
    .map(linea => {
      const partes = linea.split('|');
      return {
        titulo:  partes[0],
        artista: partes[1],
        imagen:  partes[2],
      };
    });
}

function guardarCanciones(canciones) {
  const contenido = canciones.map(c => `${c.titulo}|${c.artista}|${c.imagen}`).join('\n');
  fs.writeFileSync('canciones.txt', contenido, 'utf8');
}

// servidor

const server = http.createServer((request, response) => {

  if (request.url === '/style.css' && request.method === 'GET') {
    response.setHeader('Content-Type', 'text/css; charset=utf-8');
    response.write(fs.readFileSync('style.css', 'utf8'));
    response.end();
    return;
  }

  // GET Página de inicio
  if (request.url === '/' && request.method === 'GET') {
    const html_index = `
      <h1 class="title">Laboratorio 10</h1>
      <p class="subtitle">A01713328 Padmé Lakshmi Jara</p>
      <a href="/canciones" class="button is-warning">Ver canciones</a>
      <a href="/new"       class="button is-primary">Agregar canción</a>
    `;

    response.setHeader('Content-Type', 'text/html; charset=utf-8');
    response.write(html_header + html_index + html_footer);
    response.end();
    return;
  }

  // GET Listado de canciones
  if (request.url === '/canciones' && request.method === 'GET') {
    const canciones = cargarCanciones();

    let html_canciones = `
      <h1 class="title">Playlist para pasar el bloque con 100</h1>
      <p class="subtitle">${canciones.length} canciones guardadas</p>
      <a href="/new" class="button is-primary mb-5">Agregar canción</a>
      <div class="columns is-multiline">
    `;

    for (let cancion of canciones) {
      html_canciones += `
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

    html_canciones += `</div>`;

    response.setHeader('Content-Type', 'text/html; charset=utf-8');
    response.write(html_header + html_canciones + html_footer);
    response.end();
    return;
  }

  // GET Formulario para nueva canción
  if (request.url === '/new' && request.method === 'GET') {
    response.setHeader('Content-Type', 'text/html; charset=utf-8');
    response.write(html_header + html_form + html_footer);
    response.end();
    return;
  }

  // POST Guardar canción en canciones.txt
  if (request.url === '/new' && request.method === 'POST') {
    const datos_completos = [];

    request.on('data', (data) => {
      datos_completos.push(data);
    });

    request.on('end', () => {
      const params  = new URLSearchParams(Buffer.concat(datos_completos).toString());
      const titulo  = (params.get('titulo')  || '').trim();
      const artista = (params.get('artista') || '').trim();
      const imagen  = (params.get('imagen')  || '').trim();

      if (titulo) {
        const canciones = cargarCanciones();
        canciones.push({ titulo, artista, imagen });
        guardarCanciones(canciones);
      }

      response.writeHead(302, { Location: '/canciones' });
      response.end();
    });

    return;
  }

  // 404
  const html_404 = `
    <h1 class="title has-text-danger">404</h1>
    <p class="subtitle">Página no encontrada</p>
    <a href="/" class="button is-primary">Volver al inicio</a>
  `;

  response.setHeader('Content-Type', 'text/html; charset=utf-8');
  response.writeHead(404);
  response.write(html_header + html_404 + html_footer);
  response.end();

});

server.listen(3000);
console.log('Servidor en http://localhost:3000');