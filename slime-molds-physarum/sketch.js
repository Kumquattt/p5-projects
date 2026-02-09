let molds = [];
let num = 1000;
let d;
let bgAlphaSlider;
let RcolorSlider, GcolorSlider, BcolorSlider;
let h5;

function setup() {
  createCanvas(500, 500);
  angleMode(DEGREES);
  d = pixelDensity();

  bgAlphaSlider = createSlider(0, 100, 10, 1);
  bgAlphaSlider.position(10, 10);
  RcolorSlider = createSlider(0, 255, 255, 1);
  RcolorSlider.position(10, 50);
  GcolorSlider = createSlider(0, 255, 255, 1);
  GcolorSlider.position(10, 70);
  BcolorSlider = createSlider(0, 255, 255, 1);
  BcolorSlider.position(10, 90);

  for (let i = 0; i < num; i++) {
    molds[i] = new Mold();
  }
}

function draw() {
  frameRate(60);

  background(0, bgAlphaSlider.value());

  loadPixels();

  molds.forEach((m) => {
    m.setColor(
      RcolorSlider.value(),
      GcolorSlider.value(),
      BcolorSlider.value(),
    );
    m.update();
    m.display();
  });

  console.log(frameRate());
}
