let bird;
let fin = false;
let radioBird = 25;
let anchuraJuego = 400;
let alturaJuego = 600;
let obstaculosPasados = 0;
let frecuenciaObstaculos = 60*4;
let pausado = true;
let obstaculos = [];
let obstaculoIncr = 0;
function setup() {
  createCanvas(anchuraJuego, alturaJuego);
  bird = new Bird(50,random(100,alturaJuego-100),radioBird);
  
}

function draw() {
  background(3,190,252);
  
  bird.show();
  verificarLimites();
  generarObstaculosNuevos();
  renderObstaculos();
  if(fin) {
    mostrarFin();
  }
  
  mostrarObstaculosPasados();
}

function renderObstaculos() {
  for(let i = 0;i < obstaculos.length; i++){
    obstaculos[i].show();
    if((obstaculos[i].posx < bird.posx) && obstaculos[i].contabilizado == false) {
      obstaculosPasados = obstaculosPasados+1;
      obstaculos[i].contabilizado = true;
    }
      
  }
}

function verificarLimites(){
  //arriba
  if(bird.posy-(radioBird/2) <= 0) {
    fin = true;
  }
  //abajo
  if(bird.posy+(radioBird/2) >= alturaJuego){
    fin = true;
  }
}

function mostrarFin(){
  fill(0);
  textFont('Helvetica',70);
  text("FIN",anchuraJuego/2-50,alturaJuego/2);
  bird.detenido = true;
}

function mostrarObstaculosPasados(){
  fill(0);
  textFont('Helvetica',15);
  text("Tuberías: " + obstaculosPasados,anchuraJuego-130,alturaJuego-20);
  text("Frame: " + frameCount,anchuraJuego-130,alturaJuego-40);
}

function generarObstaculosNuevos() {
  if(frameCount % frecuenciaObstaculos == 0/*  && pausado == false */) {
  // if(frameCount == 100) {
    print('creando tuberia 1');
    let nuevoObstaculo = new Obstaculo(anchuraJuego+50, alturaJuego, bird);
    obstaculos[obstaculoIncr++] = nuevoObstaculo;
  }
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    this.pausado = false;
    bird.saltar();
  }
}