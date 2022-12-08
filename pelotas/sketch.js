let alturaTotal = 600;
let anchuraTotal = 600;
let pelotas = [];
let variables = {
	anchuraPelota: 50,
	viscosidadFluido: 0.009,
	fuerzaClick: 120
}


function setup() {
	createCanvas(anchuraTotal, alturaTotal);
	crearPelota();
}

function crearPelota() {
	let pelota = new Pelota(variables, anchuraTotal, alturaTotal);
	pelotas.push(pelota);
	let pelota2 = new Pelota(variables, anchuraTotal, alturaTotal);
	pelotas.push(pelota2);
}

function draw () {
	background(0);
	pelotas.forEach((pelota) => {
		pelota.show();
		if(pelota.moviendose) {
			golpearOtrasPelotas(pelota);
		}
	});
	mostrarVelocidadPelota();
}

function golpearOtrasPelotas(pelota_moviendose) {
	pelotas.forEach((pelota) => {
		pelota.golpearPorPelota(pelota_moviendose);
	});
}

function mouseClicked() {
	// console.log(`mouse posxy -> ${mouseX}, ${mouseY}`);
	if(mouseX < 0 || mouseY < 0)
		return;
	if(mouseX > (anchuraTotal - 0))
		return;
	pelotas.forEach((pelota) => {
		pelota.golpearClick(mouseX, mouseY);
	});
}

function mostrarVelocidadPelota(){
	fill(255);
	textFont('Helvetica',15);
	pelotas.forEach((pelota) => {
		text(`Velocidad (x, y): (${pelota.vectorVelocidad.x}, ${pelota.vectorVelocidad.y})`, anchuraTotal-500, alturaTotal-20);
	});
}