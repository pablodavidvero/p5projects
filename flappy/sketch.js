let bird;
let fin = false;
let radioBird = 25;
let anchuraJuego = 800;
let alturaJuego = 600;
let obstaculosPasados = 0;
let frecuenciaObstaculos = 60*2;
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
  mostrarObstaculosPasados();
  generarObstaculosNuevos();
  renderObstaculos();
  if(fin) {
    mostrarFin();
  }
}

function renderObstaculos() {
  for(let i = 0;i < this.obstaculoIncr; i++){
    this.obstaculos[i].show();
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
  text("FIN",200,200);
  bird.detenido = true;
}

function mostrarObstaculosPasados(){
  fill(0);
  textFont('Helvetica',15);
  text("Tuberías: " + obstaculosPasados,anchuraJuego-130,alturaJuego-20);
  text("Frame: " + frameCount,anchuraJuego-130,alturaJuego-40);
}

function generarObstaculosNuevos() {
  if(frameCount % frecuenciaObstaculos == 0 && pausado == false) {
    let nuevoObstaculo = new Obstaculo(/* anchuraJuego+ */300,this.alturaJuego, this.bird);
    this.obstaculos[obstaculoIncr++] = nuevoObstaculo;
  }
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    this.pausado = false;
    bird.saltar();
  }
}