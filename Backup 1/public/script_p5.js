
// Se quiser usar o p5.js => usar o script_p5.js no HTML
// Neste caso o loop far-se-á através da function draw()
// E é necessário fazer um setup() com createCanvas() senão ele é criado por default com 200 X 200 que é pequeno

window.onload = function () { // igual a dizer: window.addEventListener("load", initialize);
  initialize();
};

function initialize() {
  setupEventListeners();
  canvases.push(new Canvas ("canvas"));
};



let x = 100;



new p5(); 

function setup(){
  createCanvas(width, height);
}

function draw(){
  drawingB();
  x+=5;
}

function drawingB (){
  fill(200);
  ellipse(x,x,10,10);
}
