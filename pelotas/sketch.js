let alturaTotal = 600;
let anchuraTotal = 600;
let pelotas = [];
let variables = {
	anchuraPelota: 50,
	viscosidadFluido: 1,
	fuerzaClick: 80
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

function mouseClicked() {
	// console.log(`mouse posxy -> ${mouseX}, ${mouseY}`);
	if(mouseX < 0 || mouseY < 0)
		return;
	if(mouseX > (anchuraTotal - 0))
		return;
	pelotas.forEach((pelota) => {
		pelota.golpear(mouseX, mouseY);
	});
  }