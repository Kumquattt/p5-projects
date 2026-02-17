class Bee {
  constructor() {
    this.rand = random(0, 100000000);
    this.x = width / 2;
    this.y = height / 2;
    this.v = createVector(this.x, this.y);

    this.stepSize = 1;
  }

  setStepSize() {
    //this.stepSize = map(noise(t*this.rand), )
  }

  position() {
    if (this.rand > 100000000 / 2) {
      // Perlin noise movement
      let rdn = t*2 + this.rand; // Noise displacement
      let n = map(noise(rdn), 0, 1, -this.stepSize, this.stepSize);
      let n1 = map(noise(rdn + 999), 0, 1, -this.stepSize, this.stepSize);
      this.v.add(n, n1);
      stroke('yellow');
    } else {
      // Gaussian movement
      this.v.add(randomGaussian(0, 1.5), randomGaussian(0, 1.5));
      stroke('red');
    }

    // Back to the canvas
    this.v.x = this.v.x <= 0 ? width : this.v.x % width;
    this.v.y = this.v.y <= 0 ? height : this.v.y % height;
  }

  draw() {
    this.position();

    circle(this.v.x, this.v.y, 2);
  }
}

// ----
let t = 0;
let bgColor = [0, 0, 0];
let bees = [];

function setup() {
  createCanvas(400, 400);
  for (let i = 0; i < 20; i++) {
    bees[i] = new Bee();
  }
}

function draw() {
  bgColor[1] = map(noise(t), 0, 1, 0, 230);
  background(bgColor);

  bees.forEach((b) => b.draw());

  t += 0.001;
}
