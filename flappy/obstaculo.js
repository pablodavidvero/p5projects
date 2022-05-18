class Obstaculo {
    constructor(x,alturaJuego, bird) {
        this.contabilizado = false;
        this.velocidadDesplazo = 0.8;
        this.alturaJuego = alturaJuego;
        this.espacioLibre = random(150,200);
        this.r = random(0,255);
        this.g = random(0,255);
        this.b = random(0,255);
        this.bird = bird;
        this.posyinicial = random(100,alturaJuego-this.espacioLibre-100);
        this.posx = x;
        this.tuberia_alta = new Tuberia(x,0,this.posyinicial,this.r,this.g,this.b, bird);
        this.tuberia_baja = new Tuberia(x,this.posyinicial+this.espacioLibre,alturaJuego - this.posyinicial-this.espacioLibre,this.r,this.g,this.b, bird);
    }

    show(desplazarse) {
        this.tuberia_alta.show(this.posx);
        this.tuberia_baja.show(this.posx);
        if(desplazarse)
            this.desplazarse();
    }

    desplazarse() {
        this.posx -= this.velocidadDesplazo;
    }

    verificarColisionBird(){
        if(this.tuberia_alta == null || this.tuberia_baja == null){
            return false;
        }
        let alta = this.tuberia_alta.verificarColisionBird();
        let baja = this.tuberia_baja.verificarColisionBird();
        return (alta || baja);
    }
}