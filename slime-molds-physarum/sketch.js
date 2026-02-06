let molds = [];
let num = 10000;
let d;

function setup() {
  createCanvas(800, 700);
  angleMode(DEGREES);
  d = pixelDensity();

  for (let i = 0; i < num; i++) {
    molds[i] = new Mold();
  }
}

function draw() {
  frameRate(120);

  background(0, 5);
  loadPixels();

  molds.forEach((m) => {
    m.update();
    m.display();
  });

  console.log(frameRate());
}
