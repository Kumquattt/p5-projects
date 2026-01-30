import p5 from "p5";
import { background } from "./background";
import { CANVAS_HEIGHT, CANVAS_WIDTH, CENTER } from "./constants";

const sketch = (p: p5) => {
  p.setup = () => setup(p);
  p.draw = () => draw(p);
};
const p = new p5(sketch);

function setup(p: p5) {
  p.angleMode(p.DEGREES);
  p.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  background(p);
}

function draw(p: p5) {
  background(p);
  p.stroke("black");
  p.rect(CENTER.x - 25, CENTER.y - 25, 50, 50);
}
