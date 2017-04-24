//socket ref to the library
var socket;

var angle = 0;
var rectHeight=1000;
var diff=20;
var conLen;
var r,g,b;


function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  noStroke();
  rectMode(CENTER);
  r = random(255);
  g = random(255);
  b = random(255);

  /*** SOCKET SETUP ***/
  socket = io.connect(); // can also have 127.0.0.1 instead of localhost
  
  socket.on('open', function(data) {
    console.log(data.hello);
    console.log('Hi the connection was establsihed!');
      socket.send("hello server");
  });

   socket.on('getConnection', handleData);
}

function draw() {

  noStroke();
  fill(92, 178, 157);

  background(255);
  blendMode(MULTIPLY);

  push();
  
  translate(width/2, height/2);

  newDrawing();

  pop();

  blendMode(NORMAL);

  angle = angle + 0.0001;

  if(rectHeight > 1000 || rectHeight < 130){
    diff*=-3;
  }

  fill(204, 204, 255);
  text('ADOPTABASE', 720, 450);
  textSize(30);
}




function newDrawing() { 
// 
for (var i = 0; i < parseInt(conLen); i++) {
//   noStroke();
fill(random(255), random(255), random(255));
  rotate(degrees(angle));
  rect(150, 0, random(10), rectHeight); 
  rect(150, 0, random(10), rectHeight); 
  console.log('yo yo yo');
  // angle = angle + .5;
}
};

function handleData(data) {
console.log(data);
conLen = data.connectionLength;
console.log('connection length is ' + conLen);
};

function mousePressed() {
var data = "cat";

  console.log("pressed from website");

  socket.emit('theMouseWasPressed', data);
  newDrawing();
  // prevent default
  return false;

};

