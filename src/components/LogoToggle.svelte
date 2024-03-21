<script lang="ts">
  import storage, { LOGO_ENABLED } from '../scripts/shared/storage';
  import { onMount } from 'svelte';

  $: logoEnabled = 'false';

  const logoEnabledStored = async (): Promise<string> => {
    return new Promise((resolve, reject) => {
      storage.get([LOGO_ENABLED], function (result) {
        if (result[LOGO_ENABLED] === undefined) {
          reject('Item not found in storage');
        } else {
          resolve(result[LOGO_ENABLED]);
        }
      });
    });
  };

  async function toggleLogoEnabled() {
    const storedItem: { [key: string]: string } = {};
    storedItem[LOGO_ENABLED] = logoEnabled === 'true' ? 'false' : 'true';
    await storage
      .set(storedItem)
      .then(() => {
        logoEnabled = storedItem[LOGO_ENABLED];
        console.log('logoEnabled', logoEnabled);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  onMount(async () => {
    logoEnabled = await logoEnabledStored();
    console.log('logoEnabled', logoEnabled);
  });
</script>

<div class="logo-container">
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
  <img
    on:click={toggleLogoEnabled}
    class={logoEnabled === 'true' ? 'logo-enabled' : 'logo-disabled'}
    style="cursor: pointer;"
    title="google-maps-button-icon"
    width="128"
    height="128"
    src="/assets/images/icon128.png"
    alt="google-maps-button-icon"
  />
  <span>Toggle Logo</span>
</div>

<style>
  :root {
    --shadow: 0 0 3rem rgba(0, 255, 255, 0.692);
  }

  .logo-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  img {
    margin-left: 0.25rem;
  }
  .logo-enabled {
    filter: drop-shadow(var(--shadow));
  }
  .logo-disabled {
    filter: grayscale(100%);
  }
  span {
    color: white;
    font-weight: 100;
    font-size: xx-small;
  }
</style>
