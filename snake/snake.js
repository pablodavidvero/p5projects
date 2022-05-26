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
		if(dirx < 0 & this.velx > 0 || dirx > 0 & this.velx < 0)
			return;
		if(diry < 0 & this.vely > 0 || diry > 0 & this.vely < 0)
			return;
		
		this.velx = dirx;
		this.vely = diry;
	}

	show() {
		fill(this.r,this.g,this.b);
		rect(this.posx, this.posy, this.tamanio,this.tamanio);

		for (let index = 0; index < this.cola.length; index++) {
			let pedazo = this.cola[index];
			fill(this.r,this.g,this.b);
			rect(pedazo.posx, pedazo.posy, this.tamanio,this.tamanio);

			if(index != 0) {
				pedazo.posx = this.cola[index-1].posx;
				pedazo.posy = this.cola[index-1].posy;
			} else {
				pedazo.posx = snake.posx;
				pedazo.posy = snake.posy;
			}
		}

		this.posx+=this.velx*this.velocidad;
		this.posy+=this.vely*this.velocidad;
	}

	detener() {
		this.detenido = true;		
		this.velx = 0;
		this.vely = 0;
	}

	comer() {
		let posx = this.posx;
		let posy = this.posy;

		if(this.cola.length>0) {
			posx = this.cola[this.cola.length-1].posx;
			posy = this.cola[this.cola.length-1].posy;
		}

		if(this.velx > 0) {
			posx-=this.tamanio;
		}
		if(this.velx < 0) {
			posx+=this.tamanio;
		}
		if(this.vely > 0) {
			posy-=this.tamanio;
		}
		if(this.vely < 0) {
			posy+=this.tamanio;
		}
		this.cola[this.cola.length] = {posx, posy}
	}
}