class Bird {
    constructor(x, y, size) {
        this.congelado = true;
        this.detenido = false;
        this.salto_altura = 15;
        this.velocidad_caida = 0;
        this.aceleracion = 1;
        this.posx = x;
        this.posy = y;
        this.size = size;
        this.r = random(255);
        this.g = random(255);
        this.b = random(255);
    }

    show() {
        noStroke();
        fill(this.r,this.g,this.b);
        ellipse(this.posx, this.posy, this.size, this.size);
        this.caer();
    }

    caer() {
        if(this.congelado || this.detenido) {
           return; 
        }
        this.velocidad_caida += this.aceleracion;
        this.posy += this.velocidad_caida;
    }

    saltar() {
        if(this.detenido){
            return;
        }
        this.congelado = false;
        this.velocidad_caida = -this.salto_altura;
    }
} 