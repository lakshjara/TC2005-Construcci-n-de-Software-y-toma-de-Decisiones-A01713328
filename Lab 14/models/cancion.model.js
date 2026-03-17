const fs = require('fs');
const path = require('path');

const ARCHIVO = path.join(__dirname, '..', 'canciones.txt');

module.exports = class Cancion {

    constructor(titulo, artista, imagen) {
        this.titulo = titulo;
        this.artista = artista;
        this.imagen = imagen;
    }

    save() {

        const canciones = Cancion.fetchAll();
        canciones.push(this);

        const contenido = canciones
            .map(c => `${c.titulo}|${c.artista}|${c.imagen}`)
            .join('\n');

        fs.writeFileSync(ARCHIVO, contenido, 'utf8');
    }

    static fetchAll() {

        if (!fs.existsSync(ARCHIVO)) {
            return [];
        }

        return fs.readFileSync(ARCHIVO, 'utf8')
            .split('\n')
            .filter(linea => linea.trim() !== '')
            .map(linea => {

                const partes = linea.split('|');

                return {
                    titulo: partes[0],
                    artista: partes[1],
                    imagen: partes[2]
                };

            });
    }

    static deleteByTitle(titulo) {

        const canciones = Cancion.fetchAll()
            .filter(c => c.titulo !== titulo);

        const contenido = canciones
            .map(c => `${c.titulo}|${c.artista}|${c.imagen}`)
            .join('\n');

        fs.writeFileSync(ARCHIVO, contenido, 'utf8');
    }

}