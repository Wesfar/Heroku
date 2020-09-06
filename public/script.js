
// Se não quiser usar p5.js => usar o script.js no HTML
// Neste caso o loop far-se-á através da function newFrame()

let player;
let Players = [];


// Atribuir os forms iniciais a Objectos Javascript
var NameText = document.getElementById("PlayerNameText");
var NameButton = document.getElementById("PlayerNameButton");


// Pre-seleccionar a caixa de texto de input do Nome quando a página fica carregada
NameText.select();


// Obter os valores preenchidos no form do menu inicial
// Criar event listeners para mouse click ou tecla enter nos menus iniciais
// Avançar para initialize() quando se pressiona Enter ou clica
NameText.addEventListener("keydown", function (event) { if (event.keyCode == 13) { initialize() } });
NameButton.addEventListener("click", initialize);


//Limpar o form de introdução do nome - se não o eliminarmos a página acelera incontrolavelmente !


/*
window.onload = function () { // igual a dizer: window.addEventListener("load", initialize);
  initialize();
};
*/


let utils = new Utils();
let color = utils.getRandomColorRGB();

function initialize() {
  // Registar o nome do Player
  player = NameText.value;
  //Players.push(player);
  sendPlayerDataToServer()

  NameText.parentNode.removeChild(NameText);
  NameButton.parentNode.removeChild(NameButton);
  
  setupEventListeners();
  canvases.push(new Canvas ("Canvas_0"));
  canvases.push(new Canvas ("Canvas_1"));
  newFrame();
};

// Add Sockets
// let socket = io.connect("http://localhost:5501");
let socket = io.connect(window.location.origin);


function displayInstructions(){
  canvases[0].context.beginPath();
  canvases[0].context.fillStyle = "darkblue";

  canvases[0].context.fillText("V20200906-01", 10, 20);
  canvases[0].context.fillText("Carregar em qualquer parte do ecrã", 10, 30);
  canvases[0].context.fillText("A imagem da bola aparece em todos", 10, 40);
  canvases[0].context.fillText("os ecrãs dos users que estiverem no site!", 10, 50);
  };



function ownDrawing(){
  canvases[1].context.beginPath();
  canvases[1].context.fillStyle = color;
  canvases[1].context.strokeStyle = color;
  canvases[1].context.arc(touchX || mouseX, touchY || mouseY, 5, 0, 2*Math.PI);
  canvases[1].context.fill();
  canvases[1].context.stroke();
  };



// Receber mensagem "playersBroadcast" do Server e executar função updatePlayers(data)
socket.on("playersBroadcast", updatePlayers);
function updatePlayers (playersData){
  console.log("Received Updated Players List: " + playersData.players)
  Players = playersData.players;
};


function displayPlayers(){
canvases[0].context.beginPath();
canvases[0].context.fillStyle = "black";
canvases[0].context.fillText("Active Players: ", width-115, 20);
for (i=0; i<Players.length; i++){
  canvases[0].context.fillStyle = "black";
  canvases[0].context.fillText(Players[i].player_name, width-100, 40+10*i);
  canvases[0].context.fillStyle = Players[i].player_color;
  canvases[0].context.beginPath();
  canvases[0].context.arc(width-110,40+10*i-3,3,0,Math.PI*2);
  canvases[0].context.fill();
  };
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
  

// Enviar dados de Mouse para o Server através do Socket deste Cliente
function sendMouseDataToServer(){
  let data = {
    x: touchX || mouseX,
    y: touchY || mouseY,
    color: color
  }
  socket.emit("mouse", data);
  //console.log("Sending: "+ data.x + ", " + data.y );
}


// Enviar dados do novo Player para o Server através do Socket deste Cliente
function sendPlayerDataToServer(){
  let data = {
    player_name: player,
    player_color: color
  }
  socket.emit("newPlayer", data);
  console.log("Sending: "+ data.player_name);
}


function newFrame() {
  canvases[0].clear();
  displayInstructions ();
  displayPlayers();

  // Code Here
  if(mouseClicked || touchLive){
    ownDrawing();
    sendMouseDataToServer();
  };

  requestAnimationFrame(newFrame);
};
