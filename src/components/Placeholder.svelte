<script lang="ts">
  import LogoToggle from './LogoToggle.svelte';
  
  function openGitHub() {
    window.open('https://github.com/AminoffZ/google-maps-button', '_blank');
  }

</script>

<div class="container">
  <div class="card">
    <h3>Google Maps Button</h3>
    <LogoToggle />
    <div class="github-container">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div on:click={openGitHub} class="github-link">GitHub</div>
    </div>
  </div>
</div>

<style>
  h3 {
    color: white;
    text-align: center;
    margin-top: 0;
    font-weight: 900;
    margin-bottom: 1.5rem;
    filter: drop-shadow(var(--shadow));
  }

  .github-link {
    text-decoration: none;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    cursor: pointer;
    border: 1px solid white;
    filter: drop-shadow(var(--shadow));
    font-size: 0.75rem;
    font-weight: 600;
  }

  .container {
    display: inline-block;
    background-color: rgb(21, 0, 36);
    padding: 0.5rem;
  }

  .github-container {
    display: flex;
    justify-content: center;
    margin-top: 1.5rem;
  }

  .card {
    background-color: rgba(255, 255, 255, 0.01);
    border-radius: 0.5rem;
    padding: 1rem 1.5rem 1.5rem 1.5rem;
    box-shadow: 0 0 3rem rgba(255, 255, 255, 0.1);
    width: 12rem;
    display: flex;
    flex-direction: column;
  }
</style>
