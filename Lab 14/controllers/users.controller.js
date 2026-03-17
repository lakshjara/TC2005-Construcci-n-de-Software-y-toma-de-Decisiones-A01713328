exports.get_login = (req, res, next) => {
    res.render('login', {
        tituloPagina: 'Iniciar sesión',
        username: req.session?.username || ''
    });
};

exports.post_login = (req, res, next) => {
    req.session.username = req.body.username;
    res.redirect('/canciones');
};

exports.get_logout = (req, res, next) => {
    req.session.destroy(() => {
        res.redirect('/users/login');
    });
};