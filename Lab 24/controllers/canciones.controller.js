const Cancion = require('../models/cancion.model');

exports.get_list = (req, res, next) => {
  Cancion.fetchAll()
    .then(([rows]) => {
      res.render('canciones', {
        tituloPagina: 'Canciones',
        canciones: rows,
        privilegios: req.session.privilegios || [],
        username: req.session?.username || ''
      });
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};

exports.get_detail = (req, res, next) => {
  const id = req.params.cancion_id;
  Cancion.findById(id)
    .then(([rows]) => {
      if (rows.length === 0) {
        return res.status(404).render('404', {
          tituloPagina: '404',
          username: req.session?.username || ''
        });
      }

      res.render('cancion', {
        tituloPagina: rows[0].titulo,
        cancion: rows[0],
        username: req.session?.username || ''
      });
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};

exports.get_new = (req, res, next) => {
  res.render('newcancion', {
    tituloPagina: 'Nueva canción',
    username: req.session?.username || ''
  });
};

exports.post_new = (req, res, next) => {
    console.log('BODY:', req.body);
    console.log('FILE:', req.file);
  
    const titulo = (req.body.titulo || '').trim();
    const artista = (req.body.artista || '').trim();
  
    if (titulo === '') {
      return res.redirect('/canciones/new');
    }
  
    const imagen = req.file ? req.file.filename : null;
  
    const cancion = new Cancion(titulo, artista, imagen);
    cancion.save()
      .then(() => {
        res.setHeader('Set-Cookie', `ultima_cancion=${titulo}; HttpOnly`);
        res.redirect('/canciones');
      })
      .catch((err) => {
        console.log(err);
        next(err);
      });
  };

exports.get_edit = (req, res, next) => {
  const id = req.params.cancion_id;
  Cancion.findById(id)
    .then(([rows]) => {
      if (rows.length === 0) {
        return res.status(404).render('404', {
          tituloPagina: '404',
          username: req.session?.username || ''
        });
      }

      res.render('editcancion', {
        tituloPagina: 'Editar canción',
        cancion: rows[0],
        username: req.session?.username || ''
      });
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};

exports.post_edit = (req, res, next) => {
  const id = req.params.cancion_id;
  const titulo = (req.body.titulo || '').trim();
  const artista = (req.body.artista || '').trim();
  const imagenActual = (req.body.imagenActual || '').trim();

  if (titulo === '') {
    return res.redirect(`/canciones/${id}/edit`);
  }

  const imagen = req.file ? req.file.filename : imagenActual;

  Cancion.update(id, titulo, artista, imagen)
    .then(() => {
      res.redirect('/canciones');
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};

exports.post_delete = (req, res, next) => {
  const id = (req.body.id || '').trim();

  if (!id) {
    return res.redirect('/canciones');
  }

  Cancion.deleteById(id)
    .then(() => {
      res.redirect('/canciones');
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};

exports.post_search_ajax = (req, res, next) => {
  const artista = (req.body.artista || '').trim();

  Cancion.findByArtist(artista)
      .then(([rows]) => {
          res.status(200).json({
              canciones: rows
          });
      })
      .catch(err => {
          console.log(err);
          res.status(500).json({ mensaje: 'Error' });
      });
};