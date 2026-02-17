class Walker {
  constructor() {
    this.x = width / 4;
    this.y = height / 4;
  }

  draw(standardDeviationPercentage) {
    stroke('#191970');

    const sd = (0.8 * standardDeviationPercentage) / 100;
    let stepSize = randomGaussian(1, sd);
    // let stepSize = noise(1);

    const r = random(0, 1);

    if (r < 0.1) {
      // Walk toward the mouse xx% of the time
      stroke('green');
      let plusX = this.x <= mouseX ? stepSize : -stepSize;
      let plusY = this.y <= mouseY ? stepSize : -stepSize;
      this.x += plusX;
      this.y += plusY;
    } else {
      // default random step
      this.x += random(-stepSize, stepSize);
      this.y += random(-stepSize, stepSize);
    }
    point(this.x, this.y);
  }
}

class RandomDistrib {
  constructor() {
    this.total = 20;
    this.randomCounts = [];
    for (let i = 0; i < this.total; i++) {
      this.randomCounts[i] = 0;
    }
  }

  acceptedRandomValue() {
    // higher number is more likely
    while (true) {
      const r1 = random(1);
      let probability = r1;
      const r2 = random(1);

      if (r2 < probability) {
        return r1;
      }
    }
  }

  draw() {
    let index = floor(this.acceptedRandomValue() * this.randomCounts.length);
    this.randomCounts[index]++;

    stroke(0);
    fill(127);

    let w = width / this.randomCounts.length / 2;
    for (let x = 0; x < this.randomCounts.length; x++) {
      rect(
        x * w + width / 2,
        height - this.randomCounts[x] - height / 2,
        w - 1,
        this.randomCounts[x] * 0.1,
      );
    }
  }
}

class GaussianDistrib {
  constructor() {}
  draw(standardDeviationPercentage) {
    let baseSd = 20;
    let sd = (baseSd * standardDeviationPercentage) / 100;

    //A normal distribution with mean 100 and standard deviation 40
    let x = randomGaussian(80, sd) + (width * 1) / 8;
    let y = randomGaussian(80, sd) + height / 1.5;

    let colorHue = randomGaussian(360 / 2, sd);
    if (colorHue > 360) {
      colorHue -= 360;
    } else if (colorHue < 0) {
      colorHue += 360;
    }
    let colorSat = colorHue;

    noStroke();

    fill(colorHue, colorSat, 20);

    circle(x + width / 2, y - 20, 6);
  }
}

class NoiseDistrib {
  draw() {
    fill(200, 100, 5, 50);

    let n = noise(t);
    let n1 = noise(t + 999);
    let x = map(n, 0, 1, 0, width / 2);
    let y = map(n1, 0, 1, 0, height / 2); //random(0, height / 4) + this.y;
    circle(x, y, 2);
  }
}

class PerlinVisualizer {
  static draw() {
    // Set octaves (layers) & contribution ratio
    // ex: default (4, .50) = 4 layers, each contributing 50% as much as the previous one
    const maxLayers = 4;
    const layers = floor(1 + t) % maxLayers;
    const contribution = map(noise(t), 0, 1, 0, 100);
    noiseDetail(layers, contribution);

    let xoff = t * t * t;

    for (let x = 0; x < width / 3; x++) {
      let yoff = t * t * t;

      for (let y = 0; y < height / 3; y++) {
        let n = noise(xoff, yoff);
        let n1 = noise(xoff + 1, yoff + 1);
        let n2 = noise(xoff + 2, yoff + 2);
        let red = map(n, 0, 1, 0, 255);
        let green = map(n1, 0, 1, 0, 255);
        let blue = map(n2, 0, 1, 0, 255);

        stroke(red + 100, green + 100, blue + 100, 255);
        point(x, y + height / 2);

        yoff += 0.01;
      }

      xoff += 0.01;
    }

    noiseDetail(4, 0.5);
  }
}

function createControls() {
  let ypos = height + 20;
  let xpos = 0;

  sdSliderTitle = createP('Standard <br/> deviation');
  sdSliderTitle.position(xpos, ypos);
  xpos += 60;
  ypos += 20;

  sdSlider = createSlider(0, 200, 100, 1);
  sdSlider.position(xpos, ypos);
  sdSlider.size(80);
  xpos -= 60;
  ypos += 20;

  mouseTitle = createP('Mouse');
  mouseTitle.position(xpos, ypos);
}

function updateControls() {
  mouseTitle.html(`Mouse ${floor(mouseX)} ${floor(mouseY)}`);
}

let walker;
let randDistrib;
let gauss = new GaussianDistrib();
let sdSlider;
let mouseTitle;
let noiseDistrib;
let t = 0;

function setup() {
  createCanvas(400, 400);
  createControls();

  walker = new Walker();
  randDistrib = new RandomDistrib();
  noiseDistrib = new NoiseDistrib();
  PerlinVisualizer.draw();
}

function draw() {
  //   background(220);
  updateControls();

  walker.draw(sdSlider.value());
  randDistrib.draw();
  gauss.draw(sdSlider.value());
  noiseDistrib.draw();

  t += 0.01;
}
