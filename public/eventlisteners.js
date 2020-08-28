
function setupEventListeners() {
  mouseEventListeners();
  touchEventListeners();
  keyEventListeners();
};


function sayTime() {
  let x = new Date();
  return x.toLocaleTimeString() + "," + ("00" + x.getMilliseconds()).slice(-3);
};


///////////////////////////
// Mouse Event Listeners //
///////////////////////////

let
  mouseX,
  mouseY,
  mouseClicked = false;

function mouseEventListeners() {
  window.addEventListener("mousemove", mouseMove);
  window.addEventListener("mousedown", mouseDown);
  window.addEventListener("mouseup", mouseUp);
};

function mouseMove(event) {
  mouseX = event.clientX;
  mouseY = event.clientY;
  //console.log("Mouse Move  => " + "X: "+ mouseX + " " + "Y: "+ mouseY + " "+"Time: " + sayTime());
};

function mouseDown(event) {
  mouseClicked = true;
  //console.log("Mouse Down  => " + "X: "+ mouseX + " " + "Y: "+ mouseY + " "+"Time: " + sayTime());
};

function mouseUp(event) {
  mouseClicked = false;
  //console.log("Mouse Up    => " + "X: " + mouseX + " " + "Y: "+ mouseY + " "+"Time: " + sayTime());
};



///////////////////////////
// Touch Event Listeners //
///////////////////////////

let
  touchStartDate = 0,
  touchEndDate = 0,
  touchDuration = 0,
  touchStartX = null,
  touchStartY = null,
  touchX = null,
  touchY = null,
  touchEndX = null,
  touchEndY = null;

function touchEventListeners() {
  window.addEventListener("touchstart", touchStart, false);
  window.addEventListener("touchmove", touchMove, false);
  window.addEventListener("touchend", touchEnd, false);
};

function touchStart(event) {
  //  event.preventDefault();

  touchStartX = touchX = Math.round(event.changedTouches[0].clientX);
  touchStartY = touchY = Math.round(event.changedTouches[0].clientY);

  touchStartDate = new Date();

  console.log("Touch Start => " + "X: "+ touchStartX + " " + "Y: "+ touchStartY + " "+"Time: " + sayTime());
};

function touchMove(event) {
  //  event.preventDefault();

  touchX = Math.round(event.changedTouches[0].clientX);
  touchY = Math.round(event.changedTouches[0].clientY);

  console.log("Touch       => " + "X: "+ touchX + " " + "Y: "+ touchY + " "+"Time: " + sayTime());
};

function touchEnd(event) {
  //  event.preventDefault();

  touchEndX = Math.round(event.changedTouches[0].clientX);
  touchEndY = Math.round(event.changedTouches[0].clientY);

  touchEndDate = new Date();
  touchDuration = touchEndDate - touchStartDate;

  console.log("Touch End   => " + "X: "+ touchEndX + " " + "Y: "+ touchEndY + " "+"Time: " + sayTime());
  console.log("Touch Duration: " + touchDuration);
};



/////////////////////////
// Key Event Listeners //
/////////////////////////

function keyEventListeners() {
  window.addEventListener("keydown", keyDown, false);
  window.addEventListener("keyup", keyUp, false);
};

function keyDown(event) {
  let key = event.keyCode;
  console.log("Key Down     => " + key + " "+"Time: " + sayTime());
};

function keyUp(event) {
  let key = event.keyCode;
  console.log("Key Up       => " + key + " "+"Time: " + sayTime());
};