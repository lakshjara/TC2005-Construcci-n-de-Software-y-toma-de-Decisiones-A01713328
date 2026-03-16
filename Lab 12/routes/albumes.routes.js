const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const ARCHIVO = path.join(__dirname, '..', 'albumes.txt');

function cargarAlbumes() {
  if (!fs.existsSync(ARCHIVO)) {
    const iniciales = [
      {
        titulo: '20 años',
        artista: 'Luis Miguel',
        anio: '1990',
        imagen: 'https://i.scdn.co/image/ab67616d0000b273e6cab0ffee915cdbe7c7d85a'
      },
      {
        titulo: 'Lover',
        artista: 'Taylor Swift',
        anio: '2019',
        imagen: 'https://resources.sanborns.com.mx/imagenes-sanborns-ii/1200/602577928680.jpg'
      }
    ];
    guardarAlbumes(iniciales);
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
        anio: partes[2],
        imagen: partes[3]
      };
    });
}

function guardarAlbumes(albumes) {
  const contenido = albumes
    .map(a => `${a.titulo}|${a.artista}|${a.anio}|${a.imagen}`)
    .join('\n');

  fs.writeFileSync(ARCHIVO, contenido, 'utf8');
}

router.get('/', (req, res) => {
  const albumes = cargarAlbumes();

  res.render('albumes', {
    tituloPagina: 'Álbumes',
    albumes: albumes
  });
});

router.get('/new', (req, res) => {
  res.render('newalbum', {
    tituloPagina: 'Nuevo álbum'
  });
});

router.post('/new', (req, res) => {
  const titulo = (req.body.titulo || '').trim();
  const artista = (req.body.artista || '').trim();
  const anio = (req.body.anio || '').trim();
  const imagen = (req.body.imagen || '').trim();

  if (titulo !== '') {
    const albumes = cargarAlbumes();
    albumes.push({ titulo, artista, anio, imagen });
    guardarAlbumes(albumes);
  }

  res.redirect('/albumes');
});

module.exports = router;