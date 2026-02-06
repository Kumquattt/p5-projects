import { Vector } from 'p5';

export class Circle {
  pos: Vector;
  d: number;

  constructor(pos: Vector, d: number) {
    this.pos = pos;
    this.d = d;
  }

  contains(point: Vector): boolean {
    //(x−x0)2+(y−y0)2

    return (
      Math.pow(point.x - this.pos.x, 2) + Math.pow(point.y - this.pos.y, 2) <
      Math.pow(this.d / 2, 2)
    );
  }

  draw() {}
}
