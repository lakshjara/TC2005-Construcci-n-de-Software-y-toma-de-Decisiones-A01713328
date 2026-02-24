//console.log("hola desde node!");

//const filesystem = require('fs'); 

//filesystem.writeFileSync('hola.txt', 'Hola desde node!');

//setTimeout(() => {
//    console.log("jojo te hackié");
//}, 15000);

// imprimir números en orden con funciones asincrónicas
//const arreglo = [500, 60, 90, 100, 10, 20, 10000, 0, 120, 2000, 340, 1000, 50];
//for (let item of arreglo) {
//    setTimeout(() => {console.log(item);}, item); // primer parámetro es una función y el segundo es un valor
//}


//const http = require('http');

//const server = http.createServer( (request, response) => {
    // console.log(request);
    //console.log(request.url);
    // console.log(response);
    //response.setHeader('Content-Type', 'text/html');
    //response.write("html");
    //response.end();
//});

// Lab 10 
const http = require('http');

const html = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Hello Bulma!</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@1.0.4/css/bulma.min.css">
  </head>
  <body>
  <section class="section">
    <div class="container">
      <h1 class="title">
        Videojuegos
      </h1>
      <p class="subtitle">
        My first website with <strong>Bulma</strong>!
      </p>
      <div class="columns">
        <div class="column">
            <div id="halo"></div>
        </div>
        <div class="column">
            Minecraft
            <figure class="image">
                <img class="is-rounded" src="https://store-images.s-microsoft.com/image/apps.58378.13850085746326678.826cc014-d610-46af-bdb3-c5c96be4d22c.64287a91-c69e-4723-bb61-03fecd348c2a?q=90&w=480&h=270" />
            </figure>
        </div>    
        <div class="column">      
                    <li>Cyberpunk</li>
                    <li>Doom</li>
                    <li>Gears of war</li>
        </div>
      </div>
    </div>
  </section>
  <script src="js/comportamientos.js"></script>
  </body>
</html>`

if (request.url == "/") {
  Response.setHeader('Content-Type', 'text/html');
  Response.write(html);
  Response.end();
} else if (request.url == "/new") {
  Response.setHeader('Content-Type', 'text/html');
  Response.write("Aquí ")
}

server.listen(3000);