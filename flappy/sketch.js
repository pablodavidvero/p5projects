let bird;
let fin = false;
let radioBird = 25;
let anchuraJuego = 800;
let alturaJuego = 600;
let obstaculosPasados = 0;
function setup() {
  createCanvas(anchuraJuego, alturaJuego);
  bird = new Bird(50,random(100,alturaJuego-100),radioBird);
  
}

function draw() {
  background(3,190,252);
  
  bird.show();
  verificarLimites();
  mostrarObstaculosPasados();
  if(fin) {
    mostrarFin();
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
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    bird.saltar();
  }
}