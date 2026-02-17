class Mover {
  constructor() {
    this.pos = createVector(width / 2, height / 2);
    this.velocity = createVector(1, 1);
    this.acc = createVector(0, 0);

    this.maxVelocity = 2;
    this.stepSize = 1;
  }

  update() {
    this.velocity.add(this.acc);
    this.velocity.limit(this.maxVelocity);
    this.pos.add(this.velocity);
    this.checkEdges();
  }

  checkEdges() {
    // Back to the canvas
    this.pos.x = this.pos.x <= 0 ? width : this.pos.x % width;
    this.pos.y = this.pos.y <= 0 ? height : this.pos.y % height;
  }

  draw() {
    this.update();
    this.show();
  }
}

class Bee extends Mover {
  constructor() {
    super();
    this.rand = random(0, 100000000);
  }

  update() {
    if (this.rand > 100000000 / 2) {
      // Perlin noise movement
      // TODO apply noise to velocity / accel
      let rdn = t * 2 + this.rand; // Noise displacement
      let n = map(noise(rdn), 0, 1, -this.stepSize, this.stepSize);
      let n1 = map(noise(rdn + 999), 0, 1, -this.stepSize, this.stepSize);

      this.pos.add(n, n1);
      stroke('yellow');
    } else {
      // Gaussian movement
      this.velocity.set(randomGaussian(1, 1.5), randomGaussian(1, 1.5));
      this.pos.add(this.velocity);
      stroke('orange');
    }

    super.update();
  }

  show() {
    circle(this.pos.x, this.pos.y, 2);
  }
}

class Bird extends Mover {
  constructor() {
    super();
    this.pos = createVector(20, 20);
    this.d = 15;
    this.maxVelocity = 4;

    this.target = bees[0].pos.copy();
    this.dir = createVector(0, 0);
  }

  update() {
    // Targeting a bee
    this.target.set(bees[0].pos.copy());
    this.dir = p5.Vector.sub(this.target, this.pos);
    let attraction = map(this.dir.mag(), 0, width, 0.1, 0.01);
    this.dir.setMag(attraction);
    this.acc.set(this.dir);
    console.log(bees);

    // If eaten, move on to the next one
    if (this.pos.dist(this.target) < this.d) {
      bees.splice(0, 1);
      this.target.set(bees[0].pos.copy());
    }

    super.update();
  }

  show() {
    fill('red');
    stroke('darkgrey');
    circle(this.pos.x, this.pos.y, this.d);

    // Target
    noFill();
    stroke('red');
    circle(this.target.x, this.target.y, this.d);
  }
}

// ----
let t = 0;
let bgColor = [0, 0, 0];
let bees = [];
let bird;

function setup() {
  createCanvas(400, 400);
  for (let i = 0; i < 20; i++) {
    bees[i] = new Bee();
  }
  bird = new Bird();
}

function draw() {
  bgColor[1] = map(noise(t), 0, 1, 0, 230);
  background(bgColor);

  bees.forEach((b) => b.draw());
  bird.draw();

  t += 0.01;
}
