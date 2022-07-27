import type { p5 as p5Instance } from 'p5-svelte';
import type P5 from 'p5';
import type { SeasonManager } from './Seasons';

export class Leaf {
  private falling = false;
  private fallen = false;
  private shouldDraw = true;

  constructor(private position: P5.Vector) {}

  public draw(p5: p5Instance, seasonManager: SeasonManager): void {
    if (!this.shouldDraw) return;

    p5.fill(`hsla(${seasonManager.seasonLeafHue}, 91%, 64%, 0.6)`);
    p5.stroke(200);
    p5.circle(this.position.x, this.position.y, 20);
    p5.stroke(255);
    if (this.falling) {
      this.position.y += Math.random() * 18;
      this.position.x += Math.random() - 0.5;
      this.falling = this.position.y < p5.height;
      this.fallen = !this.falling;
    }
  }

  public fall(): void {
    this.falling = true;
  }

  public get isFalling(): boolean {
    return this.falling;
  }

  public get isFallen(): boolean {
    return this.fallen;
  }

  public clear(): void {
    this.shouldDraw = false;
  }
}
