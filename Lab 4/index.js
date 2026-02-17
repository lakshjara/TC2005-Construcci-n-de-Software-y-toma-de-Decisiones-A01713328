// Tabla n, n², n³ con document.write 
document.getElementById("script-01").addEventListener("click", () => {
  const entrada = prompt("Ingresa un número (entero positivo):");
  const n = Number(entrada);

  if (!Number.isInteger(n) || n <= 0) {
    alert("Entrada inválida");
    console.warn("Ej1 entrada inválida:", entrada);
    return;
  }

  document.write("<h2>Tabla del 1 al " + n + "</h2>");
  document.write("<table border='1'>");
  document.write("<tr><th>n</th><th>n²</th><th>n³</th></tr>");

  for (let i = 1; i <= n; i++) {
    document.write("<tr>");
    document.write("<td>" + i + "</td>");
    document.write("<td>" + (i * i) + "</td>");
    document.write("<td>" + (i * i * i) + "</td>");
    document.write("</tr>");
  }

  document.write("</table>");
  document.write('<br><br><button onclick="window.location.reload()">Volver al inicio</button>');
});

// Suma aleatoria + tiempo 
document.getElementById("script-02").addEventListener("click", () => {
  const a = Math.floor(Math.random() * 100);
  const b = Math.floor(Math.random() * 100);

  // Date para medir tiempo 
  const inicio = new Date();
  const entrada = prompt(`¿Cuánto es ${a} + ${b}?`);
  const fin = new Date();

  const respuesta = Number(entrada);
  const correcto = respuesta === (a + b);
  const tiempo = ((fin - inicio) / 1000).toFixed(2);

  // salida visible en HTML
  document.getElementById("out2").innerHTML =
    `Resultado correcto: <strong>${a + b}</strong><br>
     Tu respuesta: <strong>${entrada}</strong><br>
     Estado: <strong>${correcto ? "Correcto" : "Incorrecto"}</strong><br>
     Tiempo: <strong>${tiempo}</strong> segundos`;
});

// contador(arr) + pruebas 
function contador(arr) {
  let negativos = 0;
  let ceros = 0;
  let positivos = 0;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < 0) negativos++;
    else if (arr[i] === 0) ceros++;
    else positivos++;
  }

  return { negativos, ceros, positivos };
}

// pruebas automáticas (console.assert)
console.assert(contador([-1, 0, 2]).negativos === 1, "contador: negativos mal");
console.assert(contador([-1, 0, 2]).ceros === 1, "contador: ceros mal");
console.assert(contador([-1, 0, 2]).positivos === 1, "contador: positivos mal");

document.getElementById("script-03").addEventListener("click", () => {
  const datos = [-3, 0, 5, 2, -1, 0, 7, -9, 0];
  const res = contador(datos);

  document.getElementById("out3").textContent =
    "Arreglo: " + JSON.stringify(datos) + "\n" +
    "Resultado: " + JSON.stringify(res, null, 2);
});

// promedios(matriz) + pruebas 
function promedios(matriz) {
  const resultado = [];

  for (let i = 0; i < matriz.length; i++) {
    let suma = 0;
    for (let j = 0; j < matriz[i].length; j++) {
      suma += matriz[i][j];
    }
    resultado.push(suma / matriz[i].length);
  }

  return resultado;
}

// pruebas
const pruebaProm = promedios([[10, 10, 10], [5, 5]]);
console.assert(pruebaProm[0] === 10, "promedios: fila 1 mal");
console.assert(pruebaProm[1] === 5, "promedios: fila 2 mal");

document.getElementById("script-04").addEventListener("click", () => {
  const m = [
    [10, 20, 30],
    [5, 5],
    [2, 4, 6],
    [100]
  ];

  const res = promedios(m);

  document.getElementById("out4").textContent =
    "Matriz: " + JSON.stringify(m) + "\n" +
    "Promedios: " + JSON.stringify(res);
});

// inverso(numero) + pruebas 
function inverso(numero) {
  const n = Number(numero);
  if (!Number.isFinite(n)) return null;

  const signo = n < 0 ? -1 : 1;
  const invertido = String(Math.abs(n)).split("").reverse().join("");
  return signo * Number(invertido);
}

// pruebas
console.assert(inverso(123) === 321, "inverso: 123 mal");
console.assert(inverso(-45) === -54, "inverso: -45 mal");
console.assert(inverso(1000) === 1, "inverso: 1000 mal");

document.getElementById("script-05").addEventListener("click", () => {
  const entrada = prompt("Ingresa un número para invertirlo (puede ser negativo):");
  const res = inverso(entrada);

  if (res === null) {
    alert("Entrada inválida");
    return;
  }

  document.getElementById("out5").textContent =
    "Original: " + entrada + "\n" +
    "Invertido: " + res;
});

// Riego de plantas (objeto + constructor + 2 métodos) 

function Planta(tamano, temperatura) {
  this.tamano = tamano;
  this.temperatura = Number(temperatura);

  // Método 1: calcular agua necesaria (ml)
  this.calcularAgua = function () {
    let base = 0;

    if (this.tamano === "pequena") base = 200;
    else if (this.tamano === "mediana") base = 400;
    else base = 700; // grande

    // si hace calor necesita más agua
    if (this.temperatura > 30) base += 150;
    else if (this.temperatura < 15) base -= 50;

    return base;
  };

  // Método 2: frecuencia de riego (días)
  this.frecuenciaRiego = function () {
    if (this.temperatura > 30) return "Cada 1 día";
    if (this.temperatura >= 20) return "Cada 2 días";
    return "Cada 3 días";
  };
}

// evento botón
document.getElementById("script-06").addEventListener("click", () => {

  const tam = document.getElementById("tamPlanta").value;
  const temp = Number(document.getElementById("tempPlanta").value);

  if (!Number.isFinite(temp)) {
    document.getElementById("out6").innerHTML =
      "<p style='color:red'>Temperatura inválida</p>";
    return;
  }

  const miPlanta = new Planta(tam, temp);

  const agua = miPlanta.calcularAgua();
  const frecuencia = miPlanta.frecuenciaRiego();

  // mostrar resultados en HTML
  document.getElementById("out6").innerHTML = `
    <h4>Resultado del riego</h4>
    <p><strong>Tamaño:</strong> ${tam}</p>
    <p><strong>Temperatura:</strong> ${temp} °C</p>
    <p><strong>Agua recomendada:</strong> ${agua} ml</p>
    <p><strong>Frecuencia:</strong> ${frecuencia}</p>
  `;

  // pruebas automáticas
  console.assert(typeof agua === "number", "Agua debe ser número");
  console.assert(agua > 0, "Agua debe ser positiva");
});
