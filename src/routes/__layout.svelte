<script>
  import '../styles/global.css';
</script>

<header>
  <h1 class="title">
    <a href="/"> Algorithmic Botany </a>
  </h1>
  <hr />
</header>

<main>
  <slot />
</main>

<style>
  header > h1.title {
    text-align: center;
  }

  header > h1.title > a {
    color: var(--primary);
  }
</style>
