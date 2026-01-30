import p5 from 'p5';
import { BG_COLOR, CANVAS_HEIGHT, CANVAS_WIDTH } from './constants';

export function background(p: p5): void {
    p.noFill();
    p.stroke('white');
    p.background(BG_COLOR);
    const border = p.rect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}
