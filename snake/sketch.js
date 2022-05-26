let snake;
let fin = false;
let anchuraJuego = 400;
let alturaJuego = 600;
let pausado = true;
let comidos = 0;
let frecuenciaSubidaNivel = 60*5;
let finalizarChocandoConBordes = false;

function setup() {
  createCanvas(anchuraJuego, alturaJuego);
  Reiniciar();
}

function draw() {
  background(0);
  snake.show();
  verificarLimites();
  subirNivel();

  if(fin == true) {
    mostrarFin();
  }
}

function subirNivel() {
  if(frameCount % frecuenciaSubidaNivel == 0  && pausado == false ) {
    snake.aumentarVelocidad();
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
    snake.mover(0,-1);
  }
  if (keyCode === DOWN_ARROW) {
    snake.mover(0,1);
  }
  if (keyCode === LEFT_ARROW) {
    snake.mover(-1,0);
  }
  if (keyCode === RIGHT_ARROW) {
    snake.mover(1,0);
  }
}

function Reiniciar() {
  snake = new Snake(random(10,anchuraJuego-10), (random(10,alturaJuego-10)));
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