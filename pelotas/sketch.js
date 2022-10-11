let alturaTotal = 600;
let anchuraTotal = 600;
let pelotas = [];
let variables = {
	anchuraPelota: 50,
	viscosidadFluido: 5
}


function setup() {
	createCanvas(anchuraTotal, alturaTotal);
	crearPelota();
}

function crearPelota() {
	let pelota = new Pelota(variables, anchuraTotal, alturaTotal);
	pelotas.push(pelota);
}

function draw () {
	background(0);
	pelotas.forEach((pelota) => {
		pelota.show();
	});
}