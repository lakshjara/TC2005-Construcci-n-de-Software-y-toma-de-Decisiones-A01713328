const fs = require('fs');
const path = require('path');

const ARCHIVO = path.join(__dirname, '..', 'albumes.txt');

module.exports = class Album {

    constructor(titulo, artista, anio, imagen) {
        this.titulo = titulo;
        this.artista = artista;
        this.anio = anio;
        this.imagen = imagen;
    }

    save() {

        const albumes = Album.fetchAll();

        albumes.push(this);

        const contenido = albumes
            .map(a => `${a.titulo}|${a.artista}|${a.anio}|${a.imagen}`)
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
                    anio: partes[2],
                    imagen: partes[3]
                };

            });
    }
}