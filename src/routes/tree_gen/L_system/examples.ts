import { createLineRule, createStdRotationRules, createStdSubProcRules, LSystem } from './LSystem';

export const wavySeaweed: LSystem = new LSystem([
  ...createStdRotationRules(Math.PI / 8),
  ...createStdSubProcRules(),
  createLineRule('A', 'AA-[-A+A+A]+[+A-A-A]', 70)
]);

export const sierpinskiTriangle: LSystem = new LSystem([
  ...createStdRotationRules(Math.PI / 3),
  ...createStdSubProcRules(),
  createLineRule('B', '-A+B+A-', 100),
  createLineRule('A', '+B-A-B+', 100)
]);

export const binaryTree: LSystem = new LSystem([
  ...createStdRotationRules(Math.PI / 8),
  ...createStdSubProcRules(),
  createLineRule('A', 'A[+A][-A]', 200)
]);
