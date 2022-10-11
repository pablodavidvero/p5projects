class Pelota {
	constructor (variables, anchuraTotal, alturaTotal) {
		this.tamanio = variables.anchuraPelota;	
		this.r = random(0,255);
        this.g = random(0,255);
        this.b = random(0,255);
		this.posx = random(0+this.tamanio/2, anchuraTotal - this.tamanio/2);
		this.posy = random(0+this.tamanio/2, alturaTotal - this.tamanio/2);
	}

	show() {
		noStroke();
		fill(this.r,this.g,this.b);
		ellipse(this.posx, this.posy, this.tamanio, this.tamanio);
	}
}