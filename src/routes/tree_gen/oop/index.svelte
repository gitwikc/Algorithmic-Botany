<script lang="ts">
  import P5 from 'p5-svelte';
  import type { Sketch } from 'p5-svelte';
  import { Tree } from './Tree';
  import { seasons, type Season } from './Seasons';

  const SCALE = 0.5;
  const WIDTH = 1920 * SCALE;
  const HEIGHT = 1080 * SCALE;

  let tree: Tree;
  let angle = Math.PI / 4;

  // TODO Fix season indicator and selector
  $: currentSeason = tree?.seasonManager.getSeason() || '?';

  const sketch: Sketch = (p5) => {
    p5.setup = () => {
      p5.createCanvas(WIDTH, HEIGHT);

      // Create the tree root
      tree = new Tree(p5, 3, 100);
    };

    p5.draw = () => {
      p5.background(51, 48, 46);
      p5.stroke(255); // White pen stroke

      tree.drawAllBranches();
    };
  };
</script>

<h2>Object oriented Approach</h2>

<section class="sketch">
  <P5 {sketch} />

  <form class="controls">
    <h4>Controls</h4>

    <div class="btn_grp">
      <button
        on:click={(e) => {
          e.preventDefault();
          tree.nextBranchGeneration(angle);
          console.log(tree.getGenerations());
        }}
      >
        New branches
      </button>

      <button
        on:click={(e) => {
          e.preventDefault();
          tree.shedLeaves();
        }}
      >
        Shed leaves
      </button>

      <button
        on:click={(e) => {
          e.preventDefault();
          tree.reset();
        }}>Reset tree</button
      >

      <button
        on:click={(e) => {
          e.preventDefault();
          tree.clearFallenLeaves();
        }}>Clear fallen leaves</button
      >
    </div>
    <div class="input_field">
      <label for="angle">Angle = {((angle * 180) / Math.PI).toFixed(2)}&deg;</label>
      <input type="range" id="angle" min={0} max={Math.PI / 2} step={0.01} bind:value={angle} />
    </div>
    <div class="season">
      {#each seasons as season (season)}
        <button
          class="season_btn"
          on:click={(e) => {
            e.preventDefault();
            if (season == 'WINTER') tree.shedLeaves();
            tree?.seasonManager.setSeason(season);
            console.log(tree.seasonManager.getSeason(), currentSeason);
          }}>{season}</button
        >
      {/each}
    </div>
  </form>
</section>

<style>
  button {
    padding: 0.5rem;
    border-radius: 6px;
    background-color: var(--primary);
    color: hsl(0, 0%, 100%);
    box-shadow: 0 2px 5px hsla(243, 12%, 10%, 0.7);
  }

  .btn_grp,
  .season {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.3rem;
  }

  button.season_btn {
    background-color: hsl(3, 13%, 20%);
  }
</style>
