import p5, { Vector } from 'p5';
import { Boid } from './Boid';
import { Canvas } from '../Canvas';

export class Flock {
  quantity: number = 1000;
  cellSize: number = 40;

  boids: Boid[] = [];
  grid: Boid[][][];

  currentUpdateGroup: number = 0;
  groupSize: number;

  constructor() {
    // this.groupSize = Math.round(this.quantity / Flock.updateGroups);
  }

  create() {
    for (let index = 0; index < this.quantity; index++) {
      this.boids.push(
        new Boid(
          index,
          new Vector(
            Math.random() * Canvas.x(Canvas.p),
            Math.random() * Canvas.y(Canvas.p)
          )
        ).setBoids(this.boids)
      );
    }
    this.boids.forEach((b) => {
      b.setBoids(this.boids.filter((bs) => bs.id != b.id));
      b.setGrid(this.grid);
    });
    this.createGrid();
  }

  update() {
    this.updateGrid();

    this.boids.forEach((b) => {
      b.update();
    });
  }

  createGrid() {
    let cols = Math.floor(Canvas.width / this.cellSize);
    let rows = Math.floor(Canvas.height / this.cellSize);
    this.grid = new Array(cols);
    for (let i = 0; i < cols; i++) {
      this.grid[i] = new Array(rows);
    }
  }

  resetGrid() {
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[0].length; j++) {
        this.grid[i][j] = [];
      }
    }
  }

  updateGrid() {
    this.resetGrid();
    this.boids.forEach((b) => {
      let col = Canvas.p.constrain(
        Math.floor(b.pos.x / this.cellSize),
        0,
        this.grid.length - 1
      );
      let row = Canvas.p.constrain(
        Math.floor(b.pos.y / this.cellSize),
        0,
        this.grid[0].length - 1
      );
      b.setGrid(this.grid);
      b.setGridPos(col, row);
      this.grid[col][row].push(b);
    });
  }

  draw() {
    this.boids.forEach((b) => {
      b.draw();
    });
  }

  // getGroupToUpdate(): Boid[] {
  //   let sliced: Boid[];

  //   if (Flock.updateGroups == this.currentUpdateGroup) {
  //     sliced = this.boids.slice(this.groupSize * this.currentUpdateGroup);
  //     this.currentUpdateGroup = 0;
  //   } else {
  //     sliced = this.boids.slice(
  //       this.groupSize * this.currentUpdateGroup,
  //       this.groupSize * (this.currentUpdateGroup + 1)
  //     );
  //     this.currentUpdateGroup++;
  //   }

  //   // si dernier -> current = 0 + end = lastOne

  //   return sliced;
  // }
}
