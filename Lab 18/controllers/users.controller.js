const User = require('../models/user.model');
const bcrypt = require('bcryptjs');

exports.get_signup = (req, res, next) => {
    res.render('signup', { tituloPagina: 'Crear cuenta' });
};

exports.post_signup = (req, res, next) => {
    const username = (req.body.username || '').trim();
    const password = (req.body.password || '').trim();
    if (username === '' || password === '') return res.redirect('/users/signup');

    User.fetchOne(username)
        .then(([rows]) => {
            if (rows.length > 0) {
                req.session.error = 'Ese usuario ya existe';
                return res.redirect('/users/signup');
            }
            const usuario = new User(username, password);
            return usuario.save();
        })
        .then(() => {
            res.redirect('/users/login');
        })
        .catch(err => {
            console.log(err);
            next(err);
        });
};

exports.get_login = (req, res, next) => {
    const error = req.session.error || '';
    req.session.error = '';
    res.render('login', {
        tituloPagina: 'Iniciar sesión',
        error: error
    });
};

exports.post_login = (req, res, next) => {
    const username = (req.body.username || '').trim();
    const password = (req.body.password || '').trim();

    User.fetchOne(username)
        .then(([rows]) => {
            if (rows.length === 0) {
                req.session.error = 'Usuario y/o password no coinciden';
                return res.redirect('/users/login');
            }
            return bcrypt.compare(password, rows[0].password)
                .then((doMatch) => {
                    if (doMatch) {
                        req.session.isLoggedIn = true;
                        req.session.username = username;
                        return req.session.save(() => {
                            res.redirect('/canciones');
                        });
                    }
                    req.session.error = 'Usuario y/o password no coinciden';
                    return res.redirect('/users/login');
                });
        })
        .catch(err => {
            console.log(err);
            next(err);
        });
};

exports.get_logout = (req, res, next) => {
    req.session.destroy(() => {
        res.redirect('/users/login');
    });
};