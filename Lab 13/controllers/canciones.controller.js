const Cancion = require('../models/cancion.model');

exports.get_list = (req, res, next) => {

    const canciones = Cancion.fetchAll();

    res.render('canciones', {
        tituloPagina: 'Canciones',
        canciones: canciones
    });

};

exports.get_new = (req, res, next) => {

    res.render('newcancion', {
        tituloPagina: 'Nueva canción'
    });

};

exports.post_new = (req, res, next) => {

    const titulo = (req.body.titulo || '').trim();
    const artista = (req.body.artista || '').trim();
    const imagen = (req.body.imagen || '').trim();

    if (titulo !== '') {

        const cancion = new Cancion(titulo, artista, imagen);
        cancion.save();

    }

    res.redirect('/canciones');
};

exports.post_delete = (req, res, next) => {

    const titulo = (req.body.titulo || '').trim();

    if (titulo !== '') {
        Cancion.deleteByTitle(titulo);
    }

    res.redirect('/canciones');
};