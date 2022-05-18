function setup() {
  createCanvas(400, 400);
}

function draw() {
  translate(200,200);
  background(220);
  fill(0);
  stroke(255);
  ellipse(0,0,200,200);
  
  strokeWeight(4);
  
  let segundo = second();
  let minuto = minute();
  let hora = hour()%12;
  text(hora + ":" + minuto + ":" + segundo, 10,10);
  rotate(radians(270));
  //segundos
  stroke(255);
  let grado_seg = map(segundo, 0, 60,0, 2*PI);
  let pos_seg_x = cos(grado_seg)*100;
  let pos_seg_y = sin(grado_seg)*100;
  line(0,0,pos_seg_x,pos_seg_y);
  
  //segundos
  stroke(0,200,0);
  let grado_min = map(minuto, 0, 60,0, 2*PI);
  let pos_min_x = cos(grado_min)*80;
  let pos_min_y = sin(grado_min)*80;
  line(0,0,pos_min_x,pos_min_y);
  
  //horas
  stroke(200,0,0);
  let grado_hora = map(hora, 0, 12,0, 2*PI);
  let pos_hora_x = cos(grado_hora)*50;
  let pos_hora_y = sin(grado_hora)*50;
  line(0,0,pos_hora_x,pos_hora_y);
}