class Mold {
  baseSensorAngle = 45;
  rotatingAngle = 30;
  sensingDistance = 10;
  r = 1.5;
  velocityCoef = 0.5;

  color = [255, 255, 255];

  constructor() {
    this.heading = random(360);
    this.x = random(width);
    this.y = random(height);

    this.vx = cos(this.heading);
    this.vy = sin(this.heading);

    this.sensors = Array(3);
    for (let i in [...Array(3).keys()]) {
      this.sensors[i] = {
        pos: createVector(0, 0),
        angle: -this.baseSensorAngle + i * this.baseSensorAngle,
        dist: this.sensingDistance,
      };
    }
  }

  update() {
    // Velocity
    this.vx = cos(this.heading);
    this.vy = sin(this.heading);

    // Next position
    this.x = (this.x + this.vx * this.velocityCoef + width) % width;
    this.y = (this.y + this.vy * this.velocityCoef + height) % height;

    // Next sensors positions
    for (let i in [...Array(3).keys()]) {
      this.sensors[i].pos.x =
        (this.x +
          this.sensors[i].dist * cos(this.heading + this.sensors[i].angle) +
          width) %
        width;
      this.sensors[i].pos.y =
        (this.y +
          this.sensors[i].dist * sin(this.heading + this.sensors[i].angle) +
          height) %
        height;
    }

    // Sensors detection
    let index, left, right, front;
    index =
      4 * (d * floor(this.sensors[2].pos.y)) * (d * width) +
      4 * (d * floor(this.sensors[2].pos.x));
    right = pixels[index];
    index =
      4 * (d * floor(this.sensors[0].pos.y)) * (d * width) +
      4 * (d * floor(this.sensors[0].pos.x));
    left = pixels[index];
    index =
      4 * (d * floor(this.sensors[1].pos.y)) * (d * width) +
      4 * (d * floor(this.sensors[1].pos.x));
    front = pixels[index];

    // Next heading
    if (front > left && front > right) {
      this.heading += 0;
    } else if (front < left && front < right) {
      this.heading += random(this.rotatingAngle) - this.rotatingAngle / 2;
    } else if (left > right) {
      this.heading += -this.rotatingAngle;
    } else if (left < right) {
      this.heading += this.rotatingAngle;
    }
  }

  setColor(r, g, b) {
    this.color = [r, g, b];
  }

  display() {
    noStroke();
    fill(this.color);
    ellipse(this.x, this.y, this.r * 2, this.r * 2);

    //   line(
    //     this.x,
    //     this.y,
    //     this.x + this.r * 3 * this.vx,
    //     this.y + this.r * 3 * this.vy
    //   );

    //   fill(255, 0, 0);
    //   for (let i in [...Array(3).keys()]) {
    //     ellipse(this.sensors[i].pos.x, this.sensors[i].pos.y, this.r, this.r);
    //   }
  }
}
