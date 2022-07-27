import type P5_ from 'p5';
import P5 from 'p5';
import type { p5 as p5Instance } from 'p5-svelte';
import { Branch } from './Branch';
import { SeasonManager } from './Seasons';

export class Tree {
  readonly branches: Branch[] = [];
  private generations: number = 0;
  readonly seasonManager = new SeasonManager();

  constructor(private p5: p5Instance, private leafGen: number, rootLength: number) {
    this.branches.push(
      new Branch(
        p5.createVector(p5.width * 0.5, p5.height),
        p5.createVector(p5.width * 0.5, p5.height - rootLength),
        0
      )
    );
  }

  public drawAllBranches(): void {
    this.branches.forEach((branch) => branch.draw(this.p5, this.seasonManager));
  }

  public nextBranchGeneration(angle: number): void {
    this.generations++;
    for (let i = this.branches.length - 1; i >= 0; i--)
      this.branches[i]
        .createSubBranches(angle, this.generations >= this.leafGen)
        .forEach((branch) => this.branches.push(branch));
  }

  public reset(): void {
    this.generations = 0;
    const removedBranches = this.branches.length - 1;
    for (let i = 0; i < removedBranches; i++) this.branches.pop();
  }

  public getGenerations(): number {
    return this.generations;
  }

  public shedLeaves() {
    this.branches.filter((branch) => branch.shedLeaf());
  }

  public clearFallenLeaves() {
    this.branches.forEach((branch) => {
      branch.clearFallenLeaf();
    });
  }
}
