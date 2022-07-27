import type { p5 as p5Instance } from 'p5-svelte';
import type P5 from 'p5';

export interface ILSystemRule {
  character: string;
  transformation?: string;
  action: (p5: p5Instance, param?: any) => void;
  type: RuleType;
}

export enum RuleType {
  LINE,
  ROTATION,
  SUB_PROC
}

export class LSystem {
  constructor(private rules: ILSystemRule[] = []) {}

  private findRule(character: string): ILSystemRule | undefined {
    return this.rules.find((rule) => rule.character === character);
  }

  public createSentence(axiom: string): string {
    const sentence: string[] = [];
    axiom.split('').forEach((character) => {
      const rule = this.findRule(character);
      if (rule) {
        sentence.push(rule.transformation || character);
      }
    });
    return sentence.join('');
  }

  public draw(p5: p5Instance, axiom: string, iterations: number = 1, lineScale: number = 1) {
    console.log(`Axiom = ${axiom}`);
    let sentence: string = axiom;
    for (let i = 0; i < iterations; i++) sentence = this.createSentence(sentence);

    sentence.split('').forEach((character) => {
      const rule = this.findRule(character);
      if (rule?.type === RuleType.LINE) rule.action(p5, { scale: lineScale });
      else rule?.action(p5);
    });
  }
}

export const createStdRotationRules = (angle: number): ILSystemRule[] => [
  {
    type: RuleType.ROTATION,
    character: '+',
    action: (p5) => {
      p5.rotate(angle);
    }
  },
  {
    type: RuleType.ROTATION,
    character: '-',
    action: (p5) => {
      p5.rotate(-angle);
    }
  }
];

export const createStdSubProcRules = (open: string = '[', close: string = ']'): ILSystemRule[] => [
  {
    type: RuleType.SUB_PROC,
    character: open,
    action: (p5) => {
      p5.push();
    }
  },
  {
    type: RuleType.SUB_PROC,
    character: close,
    action: (p5) => {
      p5.pop();
    }
  }
];

export const createLineRule = (
  character: string,
  transformation: string,
  length: number
): ILSystemRule => ({
  type: RuleType.LINE,
  character,
  transformation,
  action: (p5, { scale = 1 }) => {
    p5.line(0, 0, 0, -length * scale);
    p5.translate(0, -length * scale);
  }
});
