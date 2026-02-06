import p5, { Vector } from 'p5';
import { Circle } from './Circle';
import { Canvas } from '../Canvas';

export class Boid {
  static p: p5;
  isDebug: boolean = false;

  static d: number = 10;
  static fovDiameter: number = Boid.d * 10;
  static maxSpeed: number = 1;
  static maxForce: number = 0.2;
  static maxNeighboursToAvoid: number = 999;

  id: number;
  boids: Boid[];
  grid: Boid[][][];
  gridPos: Vector = new Vector(0, 0);
  neighbours: Boid[]; //Only keep pos ?

  pos: Vector;
  velocity: Vector = new Vector(Math.random() - 0.5, Math.random() - 0.5);
  acceleration: Vector = new Vector(0, 0);

  fov: Circle;

  constructor(id: number, pos: Vector) {
    this.id = id;
    this.pos = pos;
  }

  update() {
    this.fovCircleFront(); // TODO rename
    this.findNeighbours();

    this.border();
    this.steer();

    this.velocity.add(this.acceleration);
    this.pos.add(this.velocity);

    this.debug();
    this.acceleration.mult(0);
  }

  steer() {
    if (this.neighbours.length > 0) {
      const neighbour: Vector = this.neighbours[0].pos;
      const closeNeighbours = this.neighbours.slice(
        0,
        Math.min(Boid.maxNeighboursToAvoid, this.neighbours.length)
      );
      closeNeighbours.forEach((n) => this.avoidNeighbour(n.pos));
    }

    // this.velocity.rotate(Canvas.p.radians((Math.random() - 0.5) * 2));
    // this.velocity.setMag(Math.min(1, this.velocity.mag()));
    this.velocity.setMag(Boid.maxSpeed);
  }

  private avoidNeighbour(neighbour: Vector) {
    const percentageDistance: number =
      this.pos.dist(neighbour) / (this.fov.d / 2);
    const logDist: number = Math.log(percentageDistance) * -1;

    const desired: Vector = new Vector(0, 0);
    Vector.sub(neighbour, this.pos, desired);
    desired.mult(-1);

    desired.limit(Boid.maxForce);
    desired.mult(logDist);
    this.applyForce(desired);
  }

  applyForce(force: Vector) {
    this.acceleration.add(force);
  }

  findNeighbours() {
    this.neighbours = [];
    for (let i = this.gridPos.x - 1; i <= this.gridPos.x + 1; i++) {
      for (let j = this.gridPos.y - 1; j < this.gridPos.y + 1; j++) {
        if (
          i >= 0 &&
          j >= 0 &&
          i < this.grid.length &&
          j < this.grid[0].length
        ) {
          this.neighbours.push(
            ...this.grid[i][j].filter((b) => this.fov.contains(b.pos))
          );
        }
      }
    }

    this.neighbours = this.boids
      .filter((b) => this.fov.contains(b.pos))
      .slice(0, Boid.maxNeighboursToAvoid);
  }

  fovCircleFront(): Circle {
    let fovVector = new Vector();
    // Vector.mult(this.velocity, 10, fovVector);
    this.fov = new Circle(Vector.add(this.pos, fovVector), Boid.fovDiameter); //TODO opti
    return this.fov;
  }

  border() {
    if (this.pos.x <= 0) {
      this.pos.add(Canvas.x(Canvas.p), 0);
    }
    if (this.pos.x >= Canvas.x(Canvas.p)) {
      this.pos.sub(Canvas.x(Canvas.p), 0);
    }
    if (this.pos.y <= 0) {
      this.pos.add(0, Canvas.y(Canvas.p));
    }
    if (this.pos.y >= Canvas.y(Canvas.p)) {
      this.pos.sub(0, Canvas.y(Canvas.p));
    }
  }

  draw() {
    this.isDebug ? Canvas.p.fill('red') : Canvas.p.fill('white');
    Canvas.p.noStroke();
    Canvas.p.circle(this.pos.x, this.pos.y, Boid.d);

    // this.drawFov();
  }

  drawFov() {
    Canvas.p.noFill();
    this.neighbours.length > 0
      ? Canvas.p.stroke('red')
      : Canvas.p.stroke('black');
    Canvas.p.line(this.pos.x, this.pos.y, this.fov.pos.x, this.fov.pos.y);
    Canvas.p.circle(this.fov.pos.x, this.fov.pos.y, this.fov.d);
  }

  debug() {
    if (this.isDebug) {
      console.log('----------------------------');
      console.log(this);
      this.drawFov();
      this.drawNeighbours();
      // this.drawAcceleration();
    }
  }

  drawNeighbours() {
    Canvas.p.stroke('red');
    this.neighbours.forEach((n) => {
      Canvas.p.line(this.pos.x, this.pos.y, n.pos.x, n.pos.y);
    });
  }

  drawAcceleration() {
    Canvas.p.stroke('green');
    Canvas.p.line(
      this.pos.x,
      this.pos.y,
      this.pos.x + this.acceleration.x * 1000,
      this.pos.y + this.acceleration.y * 1000
    );
  }

  /**
   *
   */

  setBoids(boids: Boid[]) {
    this.boids = boids;
    return this;
  }

  setGrid(grid: Boid[][][]) {
    this.grid = grid;
    return this;
  }

  setGridPos(x: number, y: number) {
    this.gridPos.x = x;
    this.gridPos.y = y;
  }
}
