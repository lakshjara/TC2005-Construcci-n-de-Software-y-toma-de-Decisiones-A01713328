const Album = require('../models/album.model');

exports.get_list = (req, res, next) => {

    const albumes = Album.fetchAll();

    res.render('albumes', {
        tituloPagina: 'Álbumes',
        albumes: albumes,
        username: req.session?.username || ''
    });

};

exports.get_new = (req, res, next) => {

    res.render('newalbum', {
        tituloPagina: 'Nuevo álbum',
        username: req.session?.username || ''
    });

};

exports.post_new = (req, res, next) => {

    const titulo = (req.body.titulo || '').trim();
    const artista = (req.body.artista || '').trim();
    const anio = (req.body.anio || '').trim();
    const imagen = (req.body.imagen || '').trim();

    if (titulo !== '') {
        const album = new Album(titulo, artista, anio, imagen);
        album.save();
    }

    res.redirect('/albumes');
};