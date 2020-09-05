
let width = 371;  //window.innerWidth;
let height = 549; //window.innerHeight;

let canvases  = [];

class Canvas {
  constructor(HTMLCanvas){
    this.HTMLCanvas = document.getElementById(HTMLCanvas);
    this.context = this.HTMLCanvas.getContext('2d');

    this.HTMLCanvas.width = width;
    this.HTMLCanvas.height = height;
    this.HTMLCanvas.style.left = '2px';
    this.HTMLCanvas.style.top = '2px';
    this.HTMLCanvas.style.position = 'absolute';

    this.width = this.HTMLCanvas.width;
    this.height = this.HTMLCanvas.height;
  };

  clear (){
    this.context.clearRect(0, 0, this.width, this.height);
    this.context.strokeRect(0, 0, this.width, this.height);
  }
};