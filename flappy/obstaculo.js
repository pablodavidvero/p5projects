class Obstaculo {
    constructor(x,alturaJuego, bird) {
        this.espacioLibre = random(100,300);
        this.r = random(0,255);
        this.g = random(0,255);
        this.b = random(0,255);
        this.bird = bird;
        this.posyinicial = random(100,alturaJuego-this.espacioLibre);
        this.posx = x;
        this.tuberia_alta = new Tuberia(x,this.posyinicial,this.posyinicial,this.r,this.g,this.b, bird);
        this.tuberia_baja = new Tuberia(x,alturaJuego,alturaJuego - this.posyinicial-this.espacioLibre,this.r,this.g,this.b, bird);
    }

    show() {
        this.tuberia_alta.show();
        this.tuberia_baja.show();
    }

}