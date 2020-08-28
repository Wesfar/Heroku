
// Se não quiser usar p5.js => usar o script.js no HTML
// Neste caso o loop far-se-á através da function newFrame()


window.onload = function () { // igual a dizer: window.addEventListener("load", initialize);
  initialize();
};

function initialize() {
  setupEventListeners();
  canvases.push(new Canvas ("canvas"));
  newFrame();
};

// Add Sockets
//  let socket = io.connect("http://localhost:5501");
  let socket = io.connect(window.location.origin);


function ownDrawing(){
  canvases[0].context.beginPath();
  canvases[0].context.fillStyle = "rgba(200,200,200,1)";
  canvases[0].context.strokeStyle = "rgba(0,0,0,1)";
  canvases[0].context.arc(mouseX,mouseY,5,0,2*Math.PI);
  canvases[0].context.fill();
  canvases[0].context.stroke();
  };


// Receber mensagem "mouse" do Server e executar função externalDrawing(data)
socket.on("mouseBroadcast", externalDrawing);
function externalDrawing (data){
    canvases[0].context.beginPath();
    canvases[0].context.fillStyle = "rgba(0,0,200,1)";
    canvases[0].context.strokeStyle = "rgba(0,0,0,1)";
    canvases[0].context.arc(data.x,data.y,5,0,2*Math.PI);
    canvases[0].context.fill();
    canvases[0].context.stroke();
    };
  

// Enviar dados para o Server através do Socket deste Cliente
function sendDataToServer(){
  let data = {
    x: mouseX,
    y: mouseY
  }
  socket.emit("mouse", data);
  console.log("Sending: "+ mouseX + ", " + mouseY);
}

function newFrame() {
  //  canvases[0].clear();

  // Code Here
  if(mouseClicked){
    ownDrawing();
    sendDataToServer();
  };

  requestAnimationFrame(newFrame);
};
