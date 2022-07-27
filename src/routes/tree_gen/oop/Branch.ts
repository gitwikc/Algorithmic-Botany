import type P5_ from 'p5';
import P5 from 'p5';
import type { p5 as p5Instance } from 'p5-svelte';
import { Leaf } from './Leaf';
import type { SeasonManager } from './Seasons';

export class Branch {
  private complete: boolean = false;
  private leaf: Leaf | undefined;

  constructor(
    private start: P5_.Vector,
    private end: P5_.Vector,
    private gen: number,
    hasLeaf: boolean = false
  ) {
    if (hasLeaf) {
      this.leaf = new Leaf(this.end.copy());
    }
  }

  public draw(p5: p5Instance, seasonManager: SeasonManager): void {
    p5.stroke(255);
    p5.line(this.start.x, this.start.y, this.end.x, this.end.y);
    this.complete = true;
    this.leaf?.draw(p5, seasonManager);
  }

  public createSubBranches(angle: number, hasLeaf: boolean = false): Branch[] {
    const branchVec = P5.Vector.sub(this.end, this.start);
    const rot1 = branchVec.copy().rotate(angle);
    const rot2 = branchVec.copy().rotate(-angle);

    return [
      new Branch(this.end, P5.Vector.add(this.end, rot1.mult(0.67)), this.gen + 1, hasLeaf),
      new Branch(this.end, P5.Vector.add(this.end, rot2.mult(0.67)), this.gen + 1, hasLeaf)
    ];
  }

  public get drawn(): boolean {
    return this.complete;
  }

  public clearFallenLeaf(): void {
    if (this.leaf?.isFallen) this.leaf.clear();
  }

  public shedLeaf(): void {
    this.leaf?.fall();
  }
}
