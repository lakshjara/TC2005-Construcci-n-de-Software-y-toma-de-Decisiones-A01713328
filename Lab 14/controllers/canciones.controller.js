const Cancion = require('../models/cancion.model');

exports.get_list = (req, res, next) => {

    const canciones = Cancion.fetchAll();

    res.render('canciones', {
        tituloPagina: 'Canciones',
        canciones: canciones,
        username: req.session?.username || ''
    });

};

exports.get_new = (req, res, next) => {

    res.render('newcancion', {
        tituloPagina: 'Nueva canción',
        username: req.session?.username || ''
    });

};

exports.post_new = (req, res, next) => {

    const titulo = (req.body.titulo || '').trim();
    const artista = (req.body.artista || '').trim();
    const imagen = (req.body.imagen || '').trim();

    if (titulo !== '') {
        const cancion = new Cancion(titulo, artista, imagen);
        cancion.save();

        res.setHeader('Set-Cookie', `ultima_cancion=${titulo}; HttpOnly`);
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