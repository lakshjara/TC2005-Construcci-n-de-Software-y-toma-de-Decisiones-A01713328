const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const ARCHIVO = path.join(__dirname, '..', 'canciones.txt');

function cargarCanciones() {
  if (!fs.existsSync(ARCHIVO)) {
    const iniciales = [
      {
        titulo: 'Inolvidable',
        artista: 'Luis Miguel',
        imagen: 'https://cdn-images.dzcdn.net/images/cover/dc937566c6e1d6a00d8c9e2ddb26ed8e/1900x1900-000000-80-0-0.jpg'
      },
      {
        titulo: 'Hasta que me olvides',
        artista: 'Luis Miguel',
        imagen: 'https://i.scdn.co/image/ab67616d0000b273780268564c65ca302786e6ff'
      }
    ];
    guardarCanciones(iniciales);
    return iniciales;
  }

  return fs.readFileSync(ARCHIVO, 'utf8')
    .split('\n')
    .filter(linea => linea.trim() !== '')
    .map(linea => {
      const partes = linea.split('|');
      return {
        titulo: partes[0],
        artista: partes[1],
        imagen: partes[2]
      };
    });
}

function guardarCanciones(canciones) {
  const contenido = canciones
    .map(c => `${c.titulo}|${c.artista}|${c.imagen}`)
    .join('\n');

  fs.writeFileSync(ARCHIVO, contenido, 'utf8');
}

router.get('/', (req, res) => {
  const canciones = cargarCanciones();

  res.render('canciones', {
    tituloPagina: 'Canciones',
    canciones: canciones
  });
});

router.get('/new', (req, res) => {
  res.render('newcancion', {
    tituloPagina: 'Nueva canción'
  });
});

router.post('/new', (req, res) => {
  const titulo = (req.body.titulo || '').trim();
  const artista = (req.body.artista || '').trim();
  const imagen = (req.body.imagen || '').trim();

  if (titulo !== '') {
    const canciones = cargarCanciones();
    canciones.push({ titulo, artista, imagen });
    guardarCanciones(canciones);
  }

  res.redirect('/canciones');
});

module.exports = router;