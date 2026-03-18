const Album = require('../models/album.model');

exports.get_list = (req, res, next) => {
    Album.fetchAll()
        .then(([rows]) => {
            res.render('albumes', {
                tituloPagina: 'Álbumes',
                albumes: rows,
                privilegios: req.session.privilegios || [],
                username: req.session?.username || ''
            });
        })
        .catch(err => {
            console.log(err);
            next(err);
        });
};

exports.get_detail = (req, res, next) => {
    const id = req.params.album_id;
    Album.findById(id)
        .then(([rows]) => {
            if (rows.length === 0) {
                return res.status(404).render('404', {
                    tituloPagina: '404',
                    username: req.session?.username || ''
                });
            }
            res.render('album', {
                tituloPagina: rows[0].titulo,
                album: rows[0],
                username: req.session?.username || ''
            });
        })
        .catch(err => {
            console.log(err);
            next(err);
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
    if (titulo === '') return res.redirect('/albumes/new');

    const album = new Album(titulo, artista, anio, imagen);
    album.save()
        .then(() => {
            res.redirect('/albumes');
        })
        .catch(err => {
            console.log(err);
            next(err);
        });
};

exports.get_edit = (req, res, next) => {
    const id = req.params.album_id;
    Album.findById(id)
        .then(([rows]) => {
            if (rows.length === 0) {
                return res.status(404).render('404', {
                    tituloPagina: '404',
                    username: req.session?.username || ''
                });
            }
            res.render('editalbum', {
                tituloPagina: 'Editar álbum',
                album: rows[0],
                username: req.session?.username || ''
            });
        })
        .catch(err => {
            console.log(err);
            next(err);
        });
};

exports.post_edit = (req, res, next) => {
    const id = req.params.album_id;
    const titulo = (req.body.titulo || '').trim();
    const artista = (req.body.artista || '').trim();
    const anio = (req.body.anio || '').trim();
    const imagen = (req.body.imagen || '').trim();
    if (titulo === '') return res.redirect(`/albumes/${id}/edit`);

    Album.update(id, titulo, artista, anio, imagen)
        .then(() => {
            res.redirect('/albumes');
        })
        .catch(err => {
            console.log(err);
            next(err);
        });
};