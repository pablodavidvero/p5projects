let snake;
let fin = false;
let anchuraJuego = 400;
let alturaJuego = 600;
let pausado = true;
let comidos = 0;
let frecuenciaSubidaNivel = 60*5;
let finalizarChocandoConBordes = false;
let comida ;
let tamanio = 10;
let frames = 12;
let cant_x = anchuraJuego / tamanio;
let cant_y = alturaJuego / tamanio;

function setup() {
  frameRate(frames);
  createCanvas(anchuraJuego, alturaJuego);
  Reiniciar();
}

function draw() {
  background(0);
  snake.show();
  verificarLimites();
  generarComida();
  verificarComida();
  if(fin == true) {
    mostrarFin();
  }
}

function verificarComida() {
  if(comida == null) {
    return;
  }

  if(snake.posx+tamanio < comida.posx || snake.posx > comida.posx+tamanio) {
    return;
  }

  if(snake.posy+tamanio < comida.posy || snake.posy > comida.posy+tamanio) {
    return;
  }
  
  snake.comer();
  comida = null;
}

function generarComida() {
  if(frameCount % frecuenciaSubidaNivel == 0  && pausado == false ) {
    let posx = int(random(cant_x))*tamanio;
    let posy = int(random(cant_y))*tamanio;
    comida = {posx: posx, posy: posy};
  }

  //mostrando comida
  if(comida != null) {
    fill(255,0,0);
		rect(comida.posx, comida.posy, tamanio, tamanio);

  }
}

function verificarLimites(){
  if(fin == true){
    return;
  }
  if(finalizarChocandoConBordes == true) {
    //ARRIBA
    if(snake.posy <= 0) {
      finalizar();
    }
    //ABAJO
    if(snake.posy+(snake.tamanio) >= alturaJuego){
      finalizar();
    }
    //IZQUIERDA
    if(snake.posx <= 0) {
      finalizar();
    }
    //DERECHA
    if(snake.posx+(snake.tamanio) >= anchuraJuego){
      finalizar();
    }
  }

  // ABAJO
  if(snake.posy >= alturaJuego && snake.vely>0){
    snake.posy = 0;
  }
  // ARRIBA
  if(snake.posy+(snake.tamanio) < 0 && snake.vely<0){
    snake.posy = alturaJuego-snake.tamanio;
  }
  // DERECHA
  if(snake.posx >= anchuraJuego && snake.velx>0){
    snake.posx = 0;
  }
  // IZQUIERDA
  if(snake.posx+(snake.tamanio) < 0 && snake.velx<0){
    snake.posx = anchuraJuego-snake.tamanio;
  }
  
}

function finalizar() {
  fin = true;
}

function keyPressed() {
  pausado = false;
  if (keyCode === UP_ARROW) {
    snake.mover(0,-tamanio);
  }
  if (keyCode === DOWN_ARROW) {
    snake.mover(0,tamanio);
  }
  if (keyCode === LEFT_ARROW) {
    snake.mover(-tamanio,0);
  }
  if (keyCode === RIGHT_ARROW) {
    snake.mover(tamanio,0);
  }
}

function Reiniciar() {
  let posx = int(random(cant_x))*tamanio;
  let posy = int(random(cant_y))*tamanio;
  // print("cantx: " + cant_x + ", canty: " + cant_y);
  // print("posx: " + posx + ", posy: " + posy);
  snake = new Snake(tamanio, posx, posy);
  pausado = true;
  fin = false;
  comidos = 0;
}

function mostrarFin(){
  fill(255);
  textFont('Helvetica',70);
  text("FIN",anchuraJuego/2-50,alturaJuego/2);
  snake.detener();
}