const db = require('../util/database');

module.exports = class Cancion {
    constructor(titulo, artista, imagen) {
        this.titulo = titulo;
        this.artista = artista;
        this.imagen = imagen;
    }

    save() {
        return db.execute(
            'INSERT INTO canciones (titulo, artista, imagen) VALUES (?, ?, ?)',
            [this.titulo, this.artista, this.imagen]
        );
    }

    static fetchAll() {
        return db.execute('SELECT * FROM canciones ORDER BY created_at DESC');
    }

    static findById(id) {
        return db.execute('SELECT * FROM canciones WHERE id = ?', [id]);
    }

    static update(id, titulo, artista, imagen) {
        return db.execute(
            'UPDATE canciones SET titulo = ?, artista = ?, imagen = ? WHERE id = ?',
            [titulo, artista, imagen, id]
        );
    }

    static deleteById(id) {
        return db.execute('DELETE FROM canciones WHERE id = ?', [id]);
    }

    static findByArtist(artista) {
        return db.execute(
            'SELECT * FROM canciones WHERE artista LIKE ?',
            [`%${artista}%`]
        );
    }
};

