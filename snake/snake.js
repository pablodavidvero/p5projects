class Snake {
	constructor(sketch, tamanio, posx, posy) {
		this.sketch = sketch;
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
		this.comido = false;
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

	show(comida) {
		fill(this.r,this.g,this.b);
		rect(this.posx, this.posy, this.tamanio,this.tamanio);

		for (let index = 0; index < this.cola.length; index++) {
			let pedazo = this.cola[index];
			fill(this.r,this.g,this.b);
			rect(pedazo.posx, pedazo.posy, this.tamanio,this.tamanio);
		}
		this.moverCola(this.cola.length-1, this.posx, this.posy)
		this.moverCabeza(comida);
	}

	moverCabeza(comida) {
		//próximo paso
		let proximoPasoX = this.posx+this.velx*this.velocidad;
		let proximoPasoY = this.posy+this.vely*this.velocidad;
		this.verificarComida(comida, proximoPasoX, proximoPasoY);
		this.posx = proximoPasoX;
		this.posy = proximoPasoY;
	}

	moverCola(pos, sigx, sigy) {
		if(pos < 0)
			return;
		let pedazo = this.cola[pos];
		//MOVIENDO
		this.moverCola(pos -1, pedazo.posx, pedazo.posy);
		pedazo.posx = sigx;
		pedazo.posy = sigy;
	}

	verificarComida(comida, proxX, proxY) {
		if(comida == null) {
		  return;
		}
	  
		if(proxX+tamanio <= comida.posx || proxX >= comida.posx+tamanio) {
		  return;
		}
	  
		if(proxY+tamanio <= comida.posy || proxY >= comida.posy+tamanio) {
		  return;
		}
		
		this.cola[this.cola.length] = {posx: this.posx, posy: this.posy};
		this.comido = true;
	  }

	detener() {
		this.detenido = true;		
		this.velx = 0;
		this.vely = 0;
	}

	comer(comida) {
		
	}
}