class Pelota {
	constructor (variables, anchuraTotal, alturaTotal) {
		this.tamanio = variables.anchuraPelota;	
		this.fuerzaClick = variables.fuerzaClick;
		this.viscosidadFluido = variables.viscosidadFluido;
		this.vectorFuerza = {
			activado: false,
			posx: 0,
			posy: 0,
			cantidadAplicada: 0
		}
		this.vectorVelocidad = {
			x: 0,
			y: 0
		}

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
		this.desplazarse();
	}

	desplazarse() {
		if(this.vectorFuerza.activado) {// IMPRIMIR VELOCIDAD 
			this.vectorFuerza.activado = false;
			this.vectorVelocidad = {
				x: this.vectorFuerza.posx * this.vectorFuerza.cantidadAplicada,
				y: this.vectorFuerza.posy * this.vectorFuerza.cantidadAplicada
			}
		}

		if(this.vectorVelocidad.x == 0 || this.vectorVelocidad.y == 0)
			return;

		this.posx += this.vectorVelocidad.x;
		this.posy += this.vectorVelocidad.y;

		//REDUCIR VELOCIDAD POR VISCOSIDAD
		/* this.vectorVelocidad = {
			x: this.vectorVelocidad.x - ,
			y: this.vectorVelocidad.y - 
		} */
	}

	golpear(posx, posy) {
		let longitudDesdeCentro = 0;
		longitudDesdeCentro = Math.sqrt(Math.pow(this.posx - posx,2) + Math.pow(this.posy - posy,2));
		if(longitudDesdeCentro > this.tamanio / 2)
			return;
		//SI SIGUE ES PORQUE EL GOLPE ES DENTRO DE LA PELOTA
		let fuerzaProporcional = (this.fuerzaClick * (longitudDesdeCentro / (this.tamanio / 2))) / this.tamanio;
		let vectorUnitario = {x: (this.posx - posx) / longitudDesdeCentro, y: (this.posy - posy) / longitudDesdeCentro}
		this.crearVectorFuerza(fuerzaProporcional, vectorUnitario);
	}

	crearVectorFuerza(fuerzaProporcional, vectorUnitario) {
		this.vectorFuerza = {
			activado: true,
			posx: vectorUnitario.x,
			posy: vectorUnitario.y,
			cantidadAplicada: fuerzaProporcional
		};
	}
}