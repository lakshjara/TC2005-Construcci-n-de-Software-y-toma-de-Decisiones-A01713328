// Laboratorio 8 - Introducción a Backend con Node.js
// A01713328 María Fernanda Padmé Lakshmi Martínez Jara

// Ejercicio 1
// Función que recibe un arreglo de números y devuelve su promedio
function calcularPromedio(nums) {
    let suma = 0;
    for (let i = 0; i < nums.length; i++) {
        suma += nums[i];
    }
    return suma / nums.length;
}

const calificaciones = [78, 85, 92, 60, 74, 88, 95, 70, 83, 91];
console.log("Laboratorio 8: Backend con Node.js");
console.log("\nEjercicio 1: Promedio de un arreglo de calificaciones");
console.log("Arreglo: [78, 85, 92, 60, 74, 88, 95, 70, 83, 91]");
console.log("Promedio: " + calcularPromedio(calificaciones));

// Ejercicio 2
// Función que recibe un string y lo escribe en un archivo de texto usando fs
const fs = require("fs");

function escribirArchivo(texto) {
    fs.writeFileSync("salida.txt", texto);
    console.log("\nEjercicio 2: Archivo salida.txt creado correctamente");
}

escribirArchivo("Hola desde Node");

// Ejercicio 3
// Problema elegido: convertir temperaturas entre Celsius y Fahrenheit, resuelto antes en Python en otra clase

function celsiusAFahrenheit(c) {
    return (c * 9/5) + 32;
}

function fahrenheitACelsius(f) {
    return (f - 32) * 5/9;
}

const temperaturas = [0, 100, 37, -40, 22];
console.log("\nEjercicio 3: Conversión de temperaturas (Celsius <-> Fahrenheit)");
for (let temp of temperaturas) {
    let enF = celsiusAFahrenheit(temp);
    let deVuelta = fahrenheitACelsius(enF).toFixed(2);
    console.log(`${temp}°C = ${enF}°F  |  De vuelta: ${deVuelta}°C`);
}

// Ejercicio 4
// Servidor web que responde con el archivo index.html
const http = require("http");

const server = http.createServer((request, response) => {
    console.log("\nPetición recibida:", request.url);
    const html = fs.readFileSync("index.html", "utf-8");
    response.setHeader("Content-Type", "text/html");
    response.write(html);
    response.end();
});

server.listen(3000);
console.log("\nServidor corriendo en http://localhost:3000");