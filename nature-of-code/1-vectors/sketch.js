class SimpleBouncingBall {
  constructor() {
    this.x = width / 4 + 20;
    this.y = height / 4;
    this.xSpeed = 2.5;
    this.ySpeed = 2;

    this.d = 20;
  }

  update() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;

    if (this.x >= width - this.d / 2 || this.x <= 0 + this.d / 2) {
      this.xSpeed = -this.xSpeed;
    }
    if (this.y >= height - this.d / 2 || this.y <= 0 + this.d / 2) {
      this.ySpeed = -this.ySpeed;
    }
  }

  show() {
    fill('white');
    stroke('grey');
    circle(this.x, this.y, this.d);
  }

  draw() {
    this.update();
    this.show();
  }
}

class Mover {
  constructor() {
    this.pos = createVector(width / 2 - random(0, 100), height / 2); // position
    this.vel = createVector(1.5, 1); // velocity
    this.acc = createVector(0.001, 0.001); // acceleration

    this.d = 20;
    this.topSpeed = 5;

    this.rightBorder = width;
    this.bottomBorder = height;
  }

  draw() {
    this.update();
    this.checkEdges();
    this.show();
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.topSpeed);
    this.pos.add(this.vel);
  }

  checkEdges() {
    if (this.pos.x > this.rightBorder) {
      this.pos.x = 0;
    } else if (this.pos.x < 0) {
      this.pos.x = this.rightBorder;
    }

    if (this.pos.y > this.bottomBorder) {
      this.pos.y = 0;
    } else if (this.pos.y < 0) {
      this.pos.y = this.bottomBorder;
    }
  }

  show() {
    fill('green');
    stroke('orange');
    circle(this.pos.x, this.pos.y, this.d);
  }
}

class VectorBouncingBall extends Mover {
  constructor() {
    super();
    this.rightBorder = this.rightBorder - this.d / 2;
    this.bottomBorder = this.bottomBorder - this.d / 2;
  }

  update() {
    super.update();
  }

  checkEdges() {
    if (this.pos.x >= this.rightBorder || this.pos.x <= 0 + this.d / 2) {
      this.vel.x = this.vel.x * -1;
    }
    if (this.pos.y >= this.bottomBorder || this.pos.y <= 0 + this.d / 2) {
      this.vel.y = this.vel.y * -1;
    }
  }

  show() {
    fill('gold');
    stroke('orange');
    circle(this.pos.x, this.pos.y, this.d);
  }

  draw() {
    this.update();
    this.checkEdges();
    this.show();
  }
}

class MoverOnClick extends Mover {
  constructor() {
    super();
  }

  draw() {
    this.update();
    this.checkEdges();
    this.show();
  }

  update() {
    this.changeAccOnKeyPress();
    super.update();
  }

  changeAccOnKeyPress() {
    if (keyIsPressed) {
      const accUpdate = 0.1;
      if (keyIsDown(UP_ARROW)) {
        this.acc.add(0, -accUpdate);
      }
      if (keyIsDown(DOWN_ARROW)) {
        this.acc.add(0, accUpdate);
      }
      if (keyIsDown(LEFT_ARROW)) {
        this.acc.add(-accUpdate, 0);
      }
      if (keyIsDown(RIGHT_ARROW)) {
        this.acc.add(accUpdate, 0);
      }
    }
  }

  show() {
    fill('blue');
    circle(this.pos.x, this.pos.y, this.d);
  }
}

class MoverRandomSteering extends Mover {
  constructor() {
    super();
    this.acc = p5.Vector.random2D();
  }

  update() {
    this.acc = p5.Vector.random2D();
    super.update();
  }

  show() {
    fill('purple');
    stroke('orange');
    circle(this.pos.x, this.pos.y, this.d);
  }
}

class PerlinMover extends Mover {
  update() {
    const nx = map(noise(t), 0, 1, -1, 1);
    const ny = map(noise(t + 99999), 0, 1, -1, 1);
    this.acc.set(nx, ny);

    super.update();
  }

  show() {
    fill('brown');
    stroke('orange');
    circle(this.pos.x, this.pos.y, this.d);
  }
}

class MouseFollower extends Mover {
  constructor() {
    super();
    this.mouse = createVector(mouseX, mouseY);
    this.dir = createVector(0, 0); // Vector from mover to the mouse, will be normalized
  }
  update() {
    this.mouse.set(mouseX, mouseY);
    this.dir = p5.Vector.sub(this.mouse, this.pos);

    let attraction = map(this.dir.mag(), 0, width, 0.2, 0);

    //this.dir.normalize();
    //this.dir.mult(attraction);
    this.dir.setMag(attraction); // Same thing as two lines above
    this.acc.set(this.dir);

    // Visualize direction
    stroke('cyan');
    line(
      this.mouse.x,
      this.mouse.y,
      this.mouse.x + this.dir.x,
      this.mouse.y + this.dir.y,
    );
    circle(this.mouse.x + this.dir.x, this.mouse.y + this.dir.y, 2);

    super.update();
  }

  draw() {
    this.update();
    this.checkEdges();
    this.show();
  }

  show() {
    fill('cyan');
    circle(this.pos.x, this.pos.y, this.d);
  }
}

// ---

let simpleBoucingBall;
let vectorBoucingBall;
let simpleMover;
let moverOnClick;
let randomeSteered;
let perlinMover;
let mouseFollower;

let t = 0;

function setup() {
  createCanvas(400, 400);
  rect(0, 0, width / 4, height / 4);
  simpleBoucingBall = new SimpleBouncingBall();
  vectorBoucingBall = new VectorBouncingBall();
  simpleMover = new Mover();
  moverOnClick = new MoverOnClick();
  randomeSteered = new MoverRandomSteering();
  perlinMover = new PerlinMover();
  mouseFollower = new MouseFollower();

  description = createP(
    "Press the arrow keys to control the blue circle's acceleration",
  );
}

function draw() {
  background(220);

  //
  simpleBoucingBall.draw();
  vectorBoucingBall.draw();
  simpleMover.draw();
  moverOnClick.draw();
  randomeSteered.draw();
  perlinMover.draw();
  mouseFollower.draw();

  t += 0.01;
}
