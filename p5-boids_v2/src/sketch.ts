import p5, { Vector, Element } from 'p5';
import { Boid } from './Boids/Boid';
import { Canvas } from './Canvas';
import { Flock } from './Boids/Flock';

let frameRateP: Element;
let flock: Flock = new Flock();

function setup(p: p5) {
  Boid.p = p;

  Canvas.create(p);
  flock.create();

  debugSetup(p);
}

function draw(p: p5) {
  debugDraw(p);
  Canvas.background(p);
  flock.update();
  flock.draw();
}

//
function debugSetup(p: p5) {
  frameRateP = p.createP();
  frameRateP.style('color', 'white');
  // flock.boids[0].isDebug = true;
}
function debugDraw(p: p5) {
  frameRateP.html(Math.round(p.frameRate()).toString());
}

//////////////////////////////////////////////////////////////////////

/**
 * REQUIRED CODE FOR P5
 */

const sketch = (p: p5) => {
  p.setup = () => setup(p);
  p.draw = () => draw(p);
};
const p = new p5(sketch);
