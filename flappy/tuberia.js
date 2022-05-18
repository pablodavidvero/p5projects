class Tuberia {
    constructor(posx, posy, tamanio, r, g, b, bird) {
        this.grueso = 20;
        this.posx = posx;
        this.posy = posy; 
        this.tamanio = tamanio;
        this.r = r;
        this.g = g;
        this.b = b;
        this.bird = bird;
    }

    verificarColisionBird() {
        if(!((this.bird.posx + this.bird.size/2) >= this.posx && this.bird.posx <= (this.posx+this.grueso))) {
            return false;
        }
        if(!(this.bird.posy >= (this.posy+this.tamanio) && this.bird.posy <= this.posy)) {
            return false;
        }
        return true;
    }

    show(posx) {
        this.posx = posx;
        noStroke();
        fill(this.r,this.g,this.b);
        rect(this.posx, this.posy, this.grueso, this.tamanio);
    }
}