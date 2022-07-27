<script lang="ts">
  import type { Sketch, p5 as p5Instance } from 'p5-svelte';
  import P5 from 'p5-svelte';
  import { binaryTree } from './examples';
  import type { LSystem } from './LSystem';

  const SCALE = 0.6;
  const WIDTH = window.innerWidth * SCALE;
  const HEIGHT = window.innerHeight * SCALE;
  let mySystem: LSystem = binaryTree;
  let drawLSystem: () => void;
  let reset: () => void;
  let i = 0;

  const sketch: Sketch = (p5) => {
    p5.setup = () => {
      p5.createCanvas(WIDTH, HEIGHT);
      p5.background(51, 48, 46);
      p5.stroke(255, 130);
    };
    drawLSystem = () => {
      p5.background(51, 48, 46);
      p5.resetMatrix();
      p5.translate(WIDTH * 0.5, HEIGHT * 1);
      p5.strokeWeight(5 * Math.exp(-i * 0.3));
      mySystem.draw(p5, 'A', i, Math.pow(0.85, i));
    };

    reset = () => {
      p5.background(51, 48, 46);
      i = 0;
    };
  };
</script>

<section class="sketch">
  <form on:submit|preventDefault class="controls">
    <h3>Controls</h3>
    <div class="btn_grp">
      <button
        on:click={() => {
          drawLSystem();
          i++;
        }}>Draw</button
      >
      <button on:click={() => reset()}>Reset</button>
    </div>
  </form>
  <P5 {sketch} />
</section>

<style>
  button {
    padding: 0.5rem;
    border-radius: 6px;
    background-color: var(--primary);
    color: hsl(0, 0%, 100%);
    box-shadow: 0 2px 5px hsla(243, 12%, 10%, 0.7);
  }
</style>
