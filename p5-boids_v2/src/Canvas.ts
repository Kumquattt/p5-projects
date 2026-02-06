import p5, { Vector } from 'p5';
import { Boid } from './Boids/Boid';

export class Canvas {
  static p: p5;

  static width: number = 800; //p.windowWidth;
  static height: number = 800; //p.windowHeight;
  static canvas: p5.Renderer;

  static color: number[] = [7, 15, 43, 10];
  // static color: number[] = [7, 15, 43, 255]; //debug

  static create(p: p5) {
    Canvas.p = p;
    document.body.style.backgroundColor = '#070f2b';

    Canvas.canvas = p.createCanvas(Canvas.x(p), Canvas.y(p));
    Canvas.canvas.style('display', 'block');
  }

  static dims(p: p5): Vector {
    return new Vector(this.width, this.height);
  }

  static x(p: p5) {
    return this.width;
  }
  static y(p: p5) {
    return this.height;
  }

  static background(p: p5) {
    p.noFill();
    p.stroke('black');
    // const border = p.rect(0, 0, Canvas.x(p), Canvas.y(p));

    p.background(Canvas.color);
  }
}
