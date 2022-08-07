let framesPerSecond = 1;
let anchuraTotal = 900;
let anchuraDashboardInfo = 200;
let alturaTotal = 700;
let tamanioCasilla = 25;
let conteoCelulas = 0;
let maxCelulasAleatorias = 40;
let pausado = true;
let generacion = 0;

let cant_x = (anchuraTotal - anchuraDashboardInfo) / tamanioCasilla;
let cant_y = alturaTotal / tamanioCasilla;

let celulasActuales = [];//Estructura lineal

function setup() {
	frameRate(framesPerSecond);
	createCanvas(anchuraTotal, alturaTotal);
	inicializarCelulasVacias(celulasActuales);
	//crearSemillaInicialAleatoria();
}

function keyPressed() {
	if (keyCode === ENTER) {
		pausado = !pausado;
	}
}

function mouseClicked() {
	console.log(`mouse posxy -> ${mouseX}, ${mouseY}`);
	if(mouseX < 0 || mouseY < 0)
		return;
	if(mouseX > (anchuraTotal - anchuraDashboardInfo))
		return;
	let posx = int(mouseX / tamanioCasilla)+1;
	let posy = int(mouseY / tamanioCasilla);
	let postemp = getPosLineal(posx, posy);
	if(!(postemp > 0)) {
		return;
	}
	console.log(`postemp -> ${postemp}`);
	celulasActuales[postemp] = celulasActuales[postemp] == 0 ? 1 : 0;
  }

function draw() {
	background(0);
	dibujarMatrixVacia();
	dibujarCelulas();
	dibujarDashboardInfo();
	generarNuevaGeneracion ();
}

function generarNuevaGeneracion () {
	if(pausado)
		return;
		
	let nuevaGeneracion = [];
	inicializarCelulasVacias(nuevaGeneracion);
	celulasActuales.forEach((activa, pos) => {
		// if(activa == 0)
		// 	return;
		let cant_vecinas_vivas = obtenerCantCelulasVecinasVivas(pos);
		//primera regla
		if(activa == 1 && (cant_vecinas_vivas == 2 || cant_vecinas_vivas == 3 ))
			nuevaGeneracion[pos] = 1;
		//segunda regla
		if(activa == 0 && (cant_vecinas_vivas == 3 ))
			nuevaGeneracion[pos] = 1;
		//tercera regla
		if(activa == 1 && (cant_vecinas_vivas > 3 ))
			nuevaGeneracion[pos] = 0;
		if(activa == 1 && cant_vecinas_vivas < 2)
			nuevaGeneracion[pos] = 0;
	});
	generacion++;
	// pausado = true;
	// return;
	celulasActuales = nuevaGeneracion;
}

function obtenerCantCelulasVecinasVivas(pos) {
	let cant = 0;
	let posy = int((pos-1) / cant_x) + 1;
	let posx = (pos-1) % cant_x + 1; 
	let postemp
	postemp = getPosLineal(posx + 1, posy);
	if(postemp > 0 && celulasActuales[postemp] > 0)
		cant++;
	postemp = getPosLineal(posx + 1, posy + 1);
	if(postemp > 0 && celulasActuales[postemp] > 0)
		cant++;
	postemp = getPosLineal(posx, posy + 1);
	if(postemp > 0 && celulasActuales[postemp] > 0)
		cant++;
	postemp = getPosLineal(posx - 1, posy);
	if(postemp > 0 && celulasActuales[postemp] > 0)
		cant++;
	postemp = getPosLineal(posx - 1, posy - 1);
	if(postemp > 0 && celulasActuales[postemp] > 0)
		cant++;
	postemp = getPosLineal(posx, posy - 1);
	if(postemp > 0 && celulasActuales[postemp] > 0)
		cant++;
	postemp = getPosLineal(posx + 1, posy - 1);
	if(postemp > 0 && celulasActuales[postemp] > 0)
		cant++;
	postemp = getPosLineal(posx - 1, posy + 1);
	if(postemp > 0 && celulasActuales[postemp] > 0)
		cant++;
	console.log(`cant de celulas vecinas vivas de pos ${pos} -> posxy (${posx}, ${posy}) : ${cant}`);
	return cant;	
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
	stroke(255);
	// noStroke();
	strokeWeight(1);
	conteoCelulas = 0;
	celulasActuales.forEach((celula, pos) => {
		if(celula != 1)
			return;
		let posy = int((pos-1) / cant_x);
		let posx = (pos-1) % cant_x; 
		// console.log(`poslineal: ${pos}, celula: ${celula}, posx: ${posx}, posy: ${posy}, modulo esperado: ${34 % 20}`);
		conteoCelulas++;
		// console.log(`pos rect: ${posx * tamanioCasilla}, ${posy * tamanioCasilla}, ${tamanioCasilla}, ${tamanioCasilla}`);
		rect(posx * tamanioCasilla, posy * tamanioCasilla, tamanioCasilla, tamanioCasilla);
	});
}

function inicializarCelulasVacias(arregloCelulas) {
	for (let posLineal = 0; posLineal <= cant_x * cant_y; posLineal++) {
		arregloCelulas[posLineal] = 0;
	}
}

function crearSemillaInicialAleatoria () {
	let tamanioLineal = cant_x * cant_y;

	let cantCelulasIniciales = int(random(maxCelulasAleatorias));
	for (let celula = 0; celula < cantCelulasIniciales; celula++) {
		let poslineal = int(random(tamanioLineal));
		console.log(`pos lineal semilla: ${poslineal}`);
		celulasActuales[poslineal] = 1;
	}
}

function dibujarDashboardInfo() {
	let desfaceIzq = 20;
	let tamanioFila = 30;
	let filaActual = 1;
	noFill();
	strokeWeight(2);
	stroke(255);
	line((anchuraTotal-anchuraDashboardInfo), 0, (anchuraTotal-anchuraDashboardInfo), alturaTotal);
	textSize(16);
	text(`Generación: ${generacion}`, (anchuraTotal-anchuraDashboardInfo) + desfaceIzq, tamanioFila*filaActual++);
	text(`Células: ${conteoCelulas}`, (anchuraTotal-anchuraDashboardInfo) + desfaceIzq, tamanioFila*filaActual++);
	text(`Pausado: ${pausado ? 'si' : 'no'}`, (anchuraTotal-anchuraDashboardInfo) + desfaceIzq, tamanioFila*filaActual++);
	text(`Matriz: ${cant_x}x${cant_y}`, (anchuraTotal-anchuraDashboardInfo) + desfaceIzq, tamanioFila*filaActual++);
}

function getPosLineal(posx, posy) {
	//matriz 3*3 = linea 9 
	//pos x, y -> 2,2 -> 5 -> 3*(2-1) + 2
	//console.log(`${posx}, ${posy}`);
	if(posx < 1 || posy < 1)
		return -1;
	if(posx > (cant_x) || posy > (cant_y))
		return -1;
	return cant_x * (posy) + posx;
}