let video;
let bright;
let button1;

let slider;

let gridSize;
let gridSizemap;

//variabili altezza e larghezza della webcam
let wCam = 640;
let hCam = 480;

function setup() {
  createCanvas(windowWidth, windowHeight);

  //webcam
  video = createCapture(VIDEO);
  video.size(windowWidth, windowHeight);
  video.hide();

  slider = createSlider(10, 100, 10);
  slider.style("width", "500px");
  slider.addClass("mySliders");

  button1 = createElement("button", ":)");
  button1.addClass("myButton");
}

function scattaFoto() {
  saveCanvas("myCanvas", "jpg");
}

function draw() {
  background(255, 0, 0, 100);
  translate(windowWidth, 0);
  scale(-1, 1);
  video.loadPixels();

  gridSize = slider.value();
  //gridSizemap = map(gridSize, 0, 300, 10, 50);

  for (let y = 0; y < video.height; y += gridSize) {
    for (let x = 0; x < video.width; x += gridSize) {
      let index = (y * video.width + x) * 4;
      let r = video.pixels[index + 0];
      let g = video.pixels[index + 1];
      let b = video.pixels[index + 2];
      //var bright prende la luminosità dei pixel e poi viene mappato
      bright = (r + g + b) / 3;
      let size = map(bright, 0, 255, gridSize, 1);
      fill(0);
      noStroke();

      // button1 = createElement("button", "IRRITATO");
      // button1.position(x, y);
      // createElement("checkbox", true);
      // checkbox.position(x, y);
      rect(x, y, size);
    }
  }

  slider.position(windowWidth / 2 - 250, windowHeight - 150);
  button1.position(windowWidth / 2 - 12, windowHeight - 100);

  button1.mouseClicked(scattaFoto);
}
