//socket ref to the library
var socket;

// var a;
// var b;
// var c;

// var direction;

function setup() {
  createCanvas(600, 400);
  background(51);
  // colorMode(RGB,255,255,255,1);

  socket = io.connect('http://localhost:8080'); // can also have 127.0.0.1 instead of localhost
  socket.on('mouse', newDrawing);

  direction = 0;
  frameRate(100);
}

function newDrawing(data) {
  noStroke();
  fill(255, 0, 100);
  ellipse(data.x, data.y, 36, 36);

}

function mouseDragged() {
  console.log('Sending:' + mouseX + ', ' + mouseY);

  var data = {
    x: mouseX,
    y: mouseY
  }

  socket.emit('mouse', data);

  noStroke();
  fill(255);
  ellipse(mouseX, mouseY, 36, 36);
  
}

function draw() {
  noStroke();
  fill(255);
  ellipse(mouseY, mouseY, 36, 36);

  // a++;
  // if(a > 100) {
  // 	a = 0
  // }
  // if(direction = 3){
  //   stroke(b);
  // }
  // line(400, 300, a, 400);

  // b--;
  // if(b > 300) {
  // 		b = 0
  // }
  // if(direction = 3) {
  // 	    stroke(a); //happy accident!!!

  // }
  // line(200, 300, b, 25);

  //   c--;
  // if(c > 100) {
  // 		c = 0
  // }
  // if(direction = 3) {
  // 	    stroke(a); //happy accident!!!

  // }
  // line(1000, 50, c, 250);
}

