const db = require('../util/database');
const bcrypt = require('bcryptjs');

module.exports = class User {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }

    save() {
        return bcrypt.hash(this.password, 12).then((password_cifrado) => {
            return db.execute(
                'INSERT INTO users (username, password) VALUES (?, ?)',
                [this.username, password_cifrado]
            );
        });
    }

    static fetchOne(username) {
        return db.execute('SELECT * FROM users WHERE username = ?', [username]);
    }

    static getPrivilegios(username) {
        return db.execute(
            `SELECT privilegio FROM tiene t, roles r, otorga o, privilegios p
             WHERE id_usuario = ? AND t.id_rol = r.id AND r.id = o.id_rol AND id_privilegio = p.id`,
            [username]
        );
    }
};