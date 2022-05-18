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

    

    show(posx) {
        this.posx = posx;
        noStroke();
        fill(this.r,this.g,this.b);
        rect(this.posx, this.posy, this.grueso, this.tamanio);
    }
}