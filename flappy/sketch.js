let bird;
let fin = false;
let radioBird = 25;
let anchuraJuego = 400;
let alturaJuego = 600;
let obstaculosPasados = 0;
let frecuenciaObstaculos = 60*4;
let pausado = true;
let obstaculos = [];

function setup() {
  createCanvas(anchuraJuego, alturaJuego);
  Reiniciar();
  
}

function draw() {
  background(3,190,252);
  
  bird.show();
  verificarLimites();
  generarObstaculosNuevos();
  renderObstaculos();
  if(fin == true) {
    mostrarFin();
  }
  
  mostrarObstaculosPasados();
}

function renderObstaculos() {
  for(let i = 0;i < obstaculos.length; i++){
    obstaculos[i].show(fin == false);
    //VERIFICAR CONTEO DE OBSTACULOS
    if((obstaculos[i].posx < bird.posx) && obstaculos[i].contabilizado == false) {
      obstaculosPasados = obstaculosPasados+1;
      obstaculos[i].contabilizado = true;
    }
    //VERIFICAR COLISIÓN CON EL BIRD
    if(obstaculos[i].verificarColisionBird() == true){
      finalizar();
    }
  }
}

function finalizar() {
  fin = true;
}

function verificarLimites(){
  if(fin == true){
    return;
  }
  //arriba
  if(bird.posy-(radioBird/2) <= 0) {
    finalizar();
  }
  //abajo
  if(bird.posy+(radioBird/2) >= alturaJuego){
    finalizar();
  }
}

function mostrarFin(){
  fill(0);
  textFont('Helvetica',70);
  text("FIN",anchuraJuego/2-50,alturaJuego/2);
  bird.detenido = true;
}

function mostrarObstaculosPasados(){
  fill(255);
  textFont('Helvetica',15);
  text("Puntos: " + obstaculosPasados,anchuraJuego-130,alturaJuego-20);
  // text("Frame: " + frameCount,anchuraJuego-130,alturaJuego-40);
}

function generarObstaculosNuevos() {
  if(fin == true){
    return;
  }
  if(frameCount % frecuenciaObstaculos == 0  && pausado == false ) {
  // if(frameCount == 100) {
    print('creando tuberia 1');
    let nuevoObstaculo = new Obstaculo(anchuraJuego+5, alturaJuego, bird);
    obstaculos[obstaculos.length] = nuevoObstaculo;
  }
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    pausado = false;
    bird.saltar();
  }
  if (keyCode === DOWN_ARROW) {
    Reiniciar();
  }
}

function Reiniciar() {
  bird = new Bird(50,random(100,alturaJuego-100),radioBird);
  pausado = true;
  obstaculosPasados = 0;
  obstaculos = [];
  fin = false;

}