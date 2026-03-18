module.exports = (req, res, next) => {
    const privilegios = req.session.privilegios || [];
    for (let p of privilegios) {
        if (p.privilegio === 'crear_canciones') return next();
    }
    req.session.error = 'No tienes privilegios para este recurso.';
    return res.redirect('/users/login');
};