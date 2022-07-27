<script lang="ts">
  import P5 from 'p5-svelte';
  import type { Sketch, p5 } from 'p5-svelte';

  const SCALE = 0.5;
  const WIDTH = 1920 * SCALE;
  const HEIGHT = 1080 * SCALE;

  let size = 70,
    angle = Math.PI / 4,
    shake = 0.0,
    frac = 0.667,
    disco = false,
    hue = 180;

  const branch = async (len: number, p5: p5) => {
    p5.strokeWeight(len * 0.08);
    if (disco)
      p5.stroke(`hsl(${hue}, ${~~(Math.random() * 70) + 30}%, ${~~(Math.random() * 60) + 40}%)`);
    else p5.stroke(255);
    p5.line(0, 0, 0, -len);
    p5.translate(0, -len);
    if (len > 3) {
      p5.push();
      p5.rotate(angle + Math.random() * p5.PI * shake);
      branch(len * frac, p5);
      p5.pop();
      p5.push();
      p5.rotate(-(angle + Math.random() * p5.PI * shake));
      branch(len * frac, p5);
      p5.pop();
    }
  };

  const sketch: Sketch = (p5) => {
    p5.setup = () => {
      p5.createCanvas(WIDTH, HEIGHT);
    };

    p5.draw = () => {
      p5.background(51, 48, 46);
      // Shift origin to root of tree
      p5.translate(WIDTH * 0.5, HEIGHT);
      p5.stroke(255); // White pen stroke

      // Start drawing
      branch(size, p5);
    };
  };
</script>

<h2>Recursive Tree Generation</h2>

<section class="sketch">
  <P5 {sketch} />
  <br />
  <form>
    <label for="size">Start size</label>
    <input id="size" type="range" min="0" max="250" step="1" bind:value={size} />{size}
    <br />
    <label for="angle">Angle</label>
    <input
      id="angle"
      type="range"
      min="0"
      max={Math.PI / 2}
      step={Math.PI / 100}
      bind:value={angle}
    />{((angle * 180) / Math.PI).toFixed(2)}&deg;
    <br />
    <label for="shake">Shake?</label>
    <input id="shake" type="range" min={0} max={0.05} step={0.001} bind:value={shake} />
    <br />
    <label for="frac">Sub branch len</label>
    <input id="frac" type="range" min={0} max={0.99} step={0.001} bind:value={frac} />{(
      frac * 100
    ).toFixed(2)}%
    <br />
    <label for="disco">Disco?</label>
    <input id="disco" type="checkbox" bind:checked={disco} />&nbsp;&nbsp;&nbsp;&nbsp;
    <label for="hue">Hue</label>
    <input
      disabled={!disco}
      id="hue"
      type="range"
      min={0}
      max={255}
      step={1}
      bind:value={hue}
    />{hue}
  </form>
</section>
