const db = require('../util/database');

module.exports = class Album {
    constructor(titulo, artista, anio, imagen) {
        this.titulo = titulo;
        this.artista = artista;
        this.anio = anio;
        this.imagen = imagen;
    }

    save() {
        return db.execute(
            'INSERT INTO albumes (titulo, artista, anio, imagen) VALUES (?, ?, ?, ?)',
            [this.titulo, this.artista, this.anio, this.imagen]
        );
    }

    static fetchAll() {
        return db.execute('SELECT * FROM albumes ORDER BY created_at DESC');
    }

    static findById(id) {
        return db.execute('SELECT * FROM albumes WHERE id = ?', [id]);
    }

    static update(id, titulo, artista, anio, imagen) {
        return db.execute(
            'UPDATE albumes SET titulo = ?, artista = ?, anio = ?, imagen = ? WHERE id = ?',
            [titulo, artista, anio, imagen, id]
        );
    }
};