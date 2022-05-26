class Snake {
	constructor(tamanio, posx, posy) {
		this.posx = posx;
		this.posy = posy;
		this.velx = 0;
		this.vely = 0;
		this.velocidad = 1;
		this.tamanio = tamanio;
		this.r = 255;
		this.g = 255;
		this.b = 255;
		this.detenido = false;
		this.cola = [];
	}
	
	mover(dirx, diry) {
		if(dirx == 0 && diry == 0)
			return;
		this.velx = dirx;
		this.vely = diry;
	}

	show() {
		fill(this.r,this.g,this.b);
		rect(this.posx, this.posy, this.tamanio,this.tamanio);

		this.posx+=this.velx*this.velocidad;
		this.posy+=this.vely*this.velocidad;
	}

	detener() {
		this.detenido = true;		
		this.velx = 0;
		this.vely = 0;
	}
}