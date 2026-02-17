// consola (log, info, warn, error, asert)
console.log("hola amigibbys!");
console.info("Esto es infromación");
console.warn("Esto es una advertencia");
console.error("Esto es un error");
console.assert(1==true); // == compara valores (ej. en valor son equivalentes)
console.assert(1===true); // === compara valor y tipo de dato (ej. en tipo de dato no son equivalentes y sale falso)

// forma antigua de declarar variables, NO recomendada
var videojuego_1 = "Animal Crossing"; 

// forma de declarar variables en menor alcance
let videojuego_2 = "Smash"; 

// para que no se pueda cambiar 
const precio = 55;
// let precio = 55 (si se puede modificar)

// Alcance de las variables 
{
    var minecraft = "5 estrellas" 
    let halo = "4 estrellas" // let viven en el ambito donde fueron declaradas 
}

//la variable minecraft sigue viviendo fuera del ámbito en el que fue declarada
console.log(minecraft); 

// la línea lanza un error porque la variable halo, murió al terminat el ámbito en el que fue declarada
console.log(halo);

// alert, promt, confirm

alert("hola gamers!");

const favorito = propmt("¿Cuál es tu juego favorito?");

console.log("Tu juego favorito es: "+ favorito);

const ganas_jugar = confirm("¿Tienes ganas de jugar?"); // confirm te devuelve true o false

if (ganas_jugar) {
    console.log("¡A jugar!");
} else {
    console.log("¡A comer!");
}

// funciones tradicionales 
function is_precio() {
}
console.log(is_precio());

// funciones modernas 
() => {} // siempre son anónimas

const vidas = () => {
console.log("Te quedan 3 vidad");
}

vidas(); // puedo usar una variable como si fuera una función

// arreglos
const videojuegos = ["Minecraft"];

const jugadores = new Array();

// areglo.push("Otro elemento");
// areglo[10] = "Uno más";

for(let i=0; i <)

// recorridos alternativos del arreglo
for(let juego in videojuegos) {
    console.log(juego);
}

// objetos
const objeto = {};

const videojuego = {
    nombre: "Minecraft",
    genero: "sandbox",
    plataforma: ["pc", "nintendo", "xbox", "Playstation", "mobile"],
}