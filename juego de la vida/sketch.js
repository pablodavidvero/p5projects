let framesPerSecond = 10;
let anchuraTotal = 800;
let anchuraDashboardInfo = 200;
let alturaTotal = 600;
let tamanioCasilla = 20;
let conteoCelulas = 0;

let cant_x = (anchuraTotal - anchuraDashboardInfo) / tamanioCasilla;
let cant_y = alturaTotal / tamanioCasilla;

let celulasActuales = [];//Estructura lineal

function setup() {
	frameRate(framesPerSecond);
	createCanvas(anchuraTotal, alturaTotal);
	inicializarCelulasVacias();
	crearSemillaInicialAleatoria();
}

function draw() {
	background(0);
	dibujarDashboardInfo();
	dibujarMatrixVacia();
	dibujarCelulas();
}

function dibujarMatrixVacia() {
	stroke(145);
	strokeWeight(1);
	//lineas verticales
	for (let posx = 1; posx < cant_x; posx++) {
		line(tamanioCasilla*posx, 0, tamanioCasilla*posx, alturaTotal);
	}
	//lineas horizontales
	for (let posy = 1; posy < cant_y; posy++) {
		line(0, tamanioCasilla*posy, (anchuraTotal-anchuraDashboardInfo), tamanioCasilla*posy);
	}
}

function dibujarCelulas() {
	fill(255);
	noStroke();
	conteoCelulas = 0;
	celulasActuales.forEach( (celula, pos) => {
		if(celula != 1)
			return;
		let posy = pos / cant_x ;
		let posx = pos % cant_x; 
		conteoCelulas++;
		rect(posx * cant_x, posy * cant_y, tamanioCasilla, tamanioCasilla);
	});
}

function inicializarCelulasVacias() {
	for (let posLineal = 0; posLineal <= cant_x * cant_y; posLineal++) {
		celulasActuales[posLineal] = 0;
	}
}

function crearSemillaInicialAleatoria () {
	let tamanioLineal = cant_x * cant_y;
	let maxCelulasAleatorias = 20;

	let cantCelulasIniciales = int(random(maxCelulasAleatorias));
	for (let celula = 0; celula < cantCelulasIniciales; celula++) {
		let poslineal = int(random(tamanioLineal));
		celulasActuales[poslineal] = 1;
	}
}

function dibujarDashboardInfo() {
	let desfaceIzq = 20;
	let tamanioFila = 30;
	let filaActual = 1;
	noFill();
	strokeWeight(4);
	stroke(255);
	line((anchuraTotal-anchuraDashboardInfo), 0, (anchuraTotal-anchuraDashboardInfo), alturaTotal);
	textSize(16);
	text(`Generación: ${frameCount}`, (anchuraTotal-anchuraDashboardInfo) + desfaceIzq, tamanioFila*filaActual++);
	text(`Células: ${conteoCelulas}`, (anchuraTotal-anchuraDashboardInfo) + desfaceIzq, tamanioFila*filaActual++);
}

function getPosLineal(posx, posy) {
	//matriz 3*3 = linea 9 
	//pos x, y -> 2,2 -> 5 -> 3*(2-1) + 2
	if(posx < 1 || posy < 1)
		return -1;
	if(posx > (cant_x) || posy > (cant_y))
		return -1;
	return cant_x * (posy) + posx;
}