class Tuberia {
    constructor(posx, posy, tamanio, r, g, b, bird) {
        this.velocidadDesplazo = 0.5;
        this.grueso = 10;
        this.posx = posx;
        this.posy = posy; 
        this.tamanio = tamanio;
        this.r = r;
        this.g = g;
        this.b = b;
        this.bird = bird;
    }

    desplazarse() {
        this.posx -= this.velocidadDesplazo;
        verificarBird();
    }

    verificarBird(){

    }

    show() {
        noStroke();
        fill(this.r,this.g,this.b);
        rect(this.posx, this.posy, this.grueso, this.tamanio);
        desplazarse();
    }
}