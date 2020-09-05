
// Se não quiser usar p5.js => usar o script.js no HTML
// Neste caso o loop far-se-á através da function newFrame()


window.onload = function () { // igual a dizer: window.addEventListener("load", initialize);
  initialize();
};

let utils = new Utils();
let color = utils.getRandomColorRGB();

function initialize() {
  setupEventListeners();
  canvases.push(new Canvas ("Canvas_0"));
  canvases.push(new Canvas ("Canvas_1"));
  newFrame();
};

// Add Sockets
//  let socket = io.connect("http://localhost:5501");
  let socket = io.connect(window.location.origin);


function displayInstructions(){
  canvases[0].context.beginPath();
  canvases[0].context.fillStyle = "darkblue";

  canvases[0].context.fillText("Carregar em qualquer parte do ecrã", 10, 10);
  canvases[0].context.fillText("A imagem da bola aparece em todos", 10, 30);
  canvases[0].context.fillText("os ecrãs dos users que estiverem no site!", 10, 40);
  };

function ownDrawing(){
  canvases[1].context.beginPath();
  canvases[1].context.fillStyle = color;
  canvases[1].context.strokeStyle = color;
  canvases[1].context.arc(touchX || mouseX, touchY || mouseY, 5, 0, 2*Math.PI);
  canvases[1].context.fill();
  canvases[1].context.stroke();
  };


// Receber mensagem "mouse" do Server e executar função externalDrawing(data)
socket.on("mouseBroadcast", externalDrawing);
function externalDrawing (data){
    canvases[1].context.beginPath();
    canvases[1].context.fillStyle = data.color;
    canvases[1].context.strokeStyle = data.color;
    canvases[1].context.arc(data.x, data.y, 5, 0, 2*Math.PI);
    canvases[1].context.fill();
    canvases[1].context.stroke();
    };
  

// Enviar dados para o Server através do Socket deste Cliente
function sendDataToServer(){
  let data = {
    x: touchX || mouseX,
    y: touchY || mouseY,
    color: color
  }
  socket.emit("mouse", data);
  console.log("Sending: "+ data.x + ", " + data.y );
}

function newFrame() {
  canvases[0].clear();
  displayInstructions ();
  // Code Here
  if(mouseClicked || touchLive){
    ownDrawing();
    sendDataToServer();
  };

  requestAnimationFrame(newFrame);
};
