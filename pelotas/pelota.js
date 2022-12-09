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
		this.masa = 1*this.tamanio;

		this.r = random(0,255);
        this.g = random(0,255);
        this.b = random(0,255);
		this.posx = random(0+this.tamanio/2, anchuraTotal - this.tamanio/2);
		this.posy = random(0+this.tamanio/2, alturaTotal - this.tamanio/2);
		this.moviendose = false;
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

		if(this.vectorVelocidad.x == 0 && this.vectorVelocidad.y == 0) {
			this.moviendose = false;
			return;
		}
		this.moviendose = true;
		this.posx += this.vectorVelocidad.x;
		this.posy += this.vectorVelocidad.y;

		//REDUCIR VELOCIDAD POR VISCOSIDAD
		this.vectorVelocidad = {
			x: (Math.abs(this.vectorVelocidad.x) <= Math.abs(this.viscosidadFluido)) ? 0 : this.vectorVelocidad.x - (this.vectorVelocidad.x != 0 ? (this.vectorVelocidad.x*this.viscosidadFluido) : 0),
			y: (Math.abs(this.vectorVelocidad.y) <= Math.abs(this.viscosidadFluido)) ? 0 : this.vectorVelocidad.y - (this.vectorVelocidad.y != 0 ? (this.vectorVelocidad.y*this.viscosidadFluido) : 0)
		}
	}

	golpearClick(posx, posy) {
		let longitudDesdeCentro = 0;
		longitudDesdeCentro = Math.sqrt(Math.pow(this.posx - posx,2) + Math.pow(this.posy - posy,2));
		if(longitudDesdeCentro > this.tamanio / 2)
			return;
		//SI SIGUE ES PORQUE EL GOLPE ES DENTRO DE LA PELOTA
		let fuerzaProporcional = (this.fuerzaClick * (longitudDesdeCentro / (this.tamanio / 2))) / this.tamanio;
		let vectorUnitario = {x: (this.posx - posx) / longitudDesdeCentro, y: (this.posy - posy) / longitudDesdeCentro}
		this.crearVectorFuerza(fuerzaProporcional, vectorUnitario);
	}

	golpearPorPelota(pelota) {
		if(this == pelota)
			return;
		let longitudDesdeCentro = 0;
		longitudDesdeCentro = Math.sqrt(Math.pow(this.posx - pelota.posx,2) + Math.pow(this.posy - pelota.posy,2));
		console.log('longitud: ' + longitudDesdeCentro);
		if(longitudDesdeCentro > (this.tamanio/2+pelota.tamanio/2))
			return;
		console.log('si hubo choque, ');
		// A = pelota
		// B = this
		// mA*vA1x+mB*vB1x=mA*vA2x+mB*vB2x
		// mA*vA1y+mB*vB1y=mA*vA2y+mB*vB2y
		// sin(angThis) = restaY's / longitudDesdeCentro
		// angThis = sin-1(restaY's / longitudDesdeCentro)
		//suma de angulos para el vector resultante
		// 180 = angPelota + AngDesconocido + angThis
		// velFinalPelota / sin⁡(angThis) = velFinalThis / sin⁡(angPelota) 
		// pelota.masa*pelota.vectorVelocidad.x + this.masa*this.vectorVelocidad.x = pelota.masa*velFinalPelota*cos(angPelota) + this.masa*velFinalThis*cos(angThis)
		// pelota.masa*pelota.vectorVelocidad.y + this.masa*this.vectorVelocidad.y = pelota.masa*velFinalPelota*sin(angPelota) + this.masa*velFinalThis*sin(angThis)
		// let velFinalPelota = (pelota.masa*pelota.vectorVelocidad.x + this.masa*this.vectorVelocidad.x - this.masa*velFinalThis*cos(angThis)) / (pelota.masa*cos(angPelota));
		// let velFinalThis = (pelota.masa*pelota.vectorVelocidad.y + this.masa*this.vectorVelocidad.y - pelota.masa*velFinalPelota*sin(angPelota)) / (this.masa*sin(angThis));
		
		let angThis = Math.asin((this.posy - pelota.posy) / longitudDesdeCentro);
		velFinalPelota  = 
		velFinalThis   = ;
		sin⁡(angPelota) * (pelota.masa*pelota.vectorVelocidad.x + this.masa*this.vectorVelocidad.x - this.masa*velFinalThis*cos(angThis)) / (pelota.masa*cos(angPelota) * sin⁡(angThis)) = (pelota.masa*pelota.vectorVelocidad.y + this.masa*this.vectorVelocidad.y - pelota.masa*velFinalPelota*sin(angPelota)) / (this.masa*sin(angThis));
		
		//SI SIGUE ES PORQUE EL GOLPE ES DENTRO DE LA PELOTA
		// let fuerzaProporcional = (1 * (longitudDesdeCentro / (this.tamanio / 2))) / this.tamanio;
		// let vectorUnitario = {x: (this.posx - pelota.posx) / longitudDesdeCentro, y: (this.posy - pelota.posy) / longitudDesdeCentro}
		// this.crearVectorFuerza(fuerzaProporcional, vectorUnitario);
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