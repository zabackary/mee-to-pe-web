<script lang="ts">
  import {
    Button,
    ButtonLink,
    Card,
    CircularProgressIndeterminate,
    Dialog,
    Layer,
    StyleFromScheme,
  } from "m3-svelte";
  import hero from "./assets/bedrock-texture.webp";
  import exportAnimation from "./assets/export-animation.gif";
  import { convert } from "./lib/converter";

  let helpOpen = false;
  let loading = false;
  let failureOpen = false;
  let successOpen = false;
  let isDragging = false;

  let lastFile: File | null = null;

  const downloadFile = (file: File) => {
    const url = URL.createObjectURL(file);
    const a = document.createElement("a");
    a.href = url;
    a.download = file.name;
    a.click();
    URL.revokeObjectURL(url);
  };
  const processFile = (file: File) => {
    loading = true;
    convert(file)
      .then((converted) => {
        loading = false;
        successOpen = true;
        lastFile = converted;
        downloadFile(converted);
      })
      .catch((e) => {
        console.error(e);
        loading = false;
        failureOpen = true;
      });
  };
  const promptForFile = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".mcworld";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        processFile(file);
      }
    };
    input.click();
  };
</script>

<StyleFromScheme
  lightScheme={{
    primary: 4284569945,
    onPrimary: 4294967295,
    primaryContainer: 4286214513,
    onPrimaryContainer: 4294965752,
    inversePrimary: 4291806404,
    secondary: 4284636509,
    onSecondary: 4294967295,
    secondaryContainer: 4293320413,
    onSecondaryContainer: 4284899681,
    tertiary: 4284373588,
    onTertiary: 4294967295,
    tertiaryContainer: 4286018156,
    onTertiaryContainer: 4294965491,
    error: 4290386458,
    onError: 4294967295,
    errorContainer: 4294957782,
    onErrorContainer: 4287823882,
    background: 4294834423,
    onBackground: 4280032027,
    surface: 4294834423,
    onSurface: 4280032027,
    surfaceVariant: 4293779423,
    onSurfaceVariant: 4283254085,
    inverseSurface: 4281479216,
    inverseOnSurface: 4294308079,
    outline: 4286543221,
    outlineVariant: 4291937219,
    shadow: 4278190080,
    scrim: 4278190080,
    surfaceDim: 4292794840,
    surfaceBright: 4294834423,
    surfaceContainerLowest: 4294967295,
    surfaceContainerLow: 4294439666,
    surfaceContainer: 4294110700,
    surfaceContainerHigh: 4293715942,
    surfaceContainerHighest: 4293321185,
    surfaceTint: 4284832860,
  }}
  darkScheme={{
    primary: 4291806404,
    onPrimary: 4281675567,
    primaryContainer: 4286214513,
    onPrimaryContainer: 4294965752,
    inversePrimary: 4284832860,
    secondary: 4291610052,
    onSecondary: 4281544495,
    secondaryContainer: 4283189320,
    onSecondaryContainer: 4290688950,
    tertiary: 4291610046,
    onTertiary: 4281544747,
    tertiaryContainer: 4286018156,
    onTertiaryContainer: 4294965491,
    error: 4294948011,
    onError: 4285071365,
    errorContainer: 4287823882,
    onErrorContainer: 4294957782,
    background: 4279505683,
    onBackground: 4293321185,
    surface: 4279505683,
    onSurface: 4293321185,
    surfaceVariant: 4283254085,
    onSurfaceVariant: 4291937219,
    inverseSurface: 4293321185,
    inverseOnSurface: 4281479216,
    outline: 4288253582,
    outlineVariant: 4283254085,
    shadow: 4278190080,
    scrim: 4278190080,
    surfaceDim: 4279505683,
    surfaceBright: 4282005817,
    surfaceContainerLowest: 4279176718,
    surfaceContainerLow: 4280032027,
    surfaceContainer: 4280360735,
    surfaceContainerHigh: 4281018921,
    surfaceContainerHighest: 4281742388,
    surfaceTint: 4291806404,
  }}
/>

<div class="parent">
  <main>
    <img src={hero} alt="A wall of bedrock" class="hero" />

    <h1>Minecraft Education Edition to Bedrock converter</h1>

    <p>
      Minecraft Education Edition worlds will fail to load in Bedrock Edition
      due to a configuration flag being set. Use this tool to convert your world
      into a format playable in Bedrock Edition.
    </p>

    <p>
      This tool will forever remain free and open source. No data will be shared
      with first <em>or</em> third parties. As this website doesn't even include
      any analytics or tracking, make sure to
      <a href="https://github.com/zabackary/mee-to-pe-web"
        >star the project on GitHub</a
      > if you find it useful!
    </p>

    <Card type="filled">
      <h2><span class="step-bubble">1</span> Download your world file</h2>
      <p class="note">
        Export your world from the device running Education Edition and transfer
        the <code>.mcworld</code> file to this device.
      </p>
      <Button type="outlined" on:click={() => (helpOpen = true)}>
        How do I export my world?
      </Button>
      <Dialog bind:open={helpOpen} headline="Exporting your world">
        <p>
          To export your world, click "Manage" after selecting the world you
          want, then select "Export". This will create a <code>.mcworld</code> file
          that you can transfer to this device.
        </p>
        <img
          src={exportAnimation}
          alt="GIF showing the process of exporting a world in Education Edition from the linked support article"
        />
        <p>
          For more information, check the following help article: <ButtonLink
            href="https://edusupport.minecraft.net/hc/en-us/articles/360047555391-Import-Export-and-Manage-Worlds"
            extraOptions={{ target: "_blank" }}
            type="outlined"
          >
            Import, Export, and Manage Worlds
          </ButtonLink>
        </p>

        <svelte:fragment slot="buttons">
          <Button type="text" on:click={() => (helpOpen = false)}>Done</Button>
        </svelte:fragment>
      </Dialog>
    </Card>
    <Card type="filled">
      <h2><span class="step-bubble">2</span> Upload your world file</h2>
      <p class="note">
        Attach your file here. The file will never leave your device, as all
        processing will be performed locally in your browser.
      </p>
      <button
        class="upload-target"
        class:is-dragging={isDragging}
        on:click={promptForFile}
        on:dragover={(e) => {
          e.preventDefault();
          isDragging = true;
        }}
        on:dragleave={(e) => {
          e.preventDefault();
          isDragging = false;
        }}
        on:drop={(e) => {
          e.preventDefault();
          isDragging = false;
          if (e.dataTransfer?.files.length) {
            processFile(e.dataTransfer.files[0]);
          }
        }}
      >
        <p>Drag and drop your file here, or click to select</p>
        <Layer />
      </button>
    </Card>

    <Dialog
      open={loading}
      headline="Converting..."
      closeOnClick={false}
      closeOnEsc={false}
    >
      <div class="progress-container"><CircularProgressIndeterminate /></div>
    </Dialog>

    <Dialog bind:open={failureOpen} headline="Conversion failed">
      <p>Perhaps the file format didn't match?</p>
      <p>The error has been logged to the browser console.</p>
      <svelte:fragment slot="buttons">
        <Button
          type="text"
          on:click={() => {
            failureOpen = false;
          }}>Done</Button
        >
      </svelte:fragment>
    </Dialog>

    <Dialog bind:open={successOpen} headline="Your world is ready">
      <p>The conversion was successful.</p>
      <svelte:fragment slot="buttons">
        <Button
          type="text"
          on:click={() => {
            successOpen = false;
          }}>Done</Button
        >
        <Button
          type="filled"
          on:click={() => {
            if (lastFile) downloadFile(lastFile);
          }}>Download world again</Button
        >
      </svelte:fragment>
    </Dialog>

    <hr />

    <p class="attribution">
      Built by <a href="https://github.com/zabackary">@zabackary</a> with love
      in Japan. Open source on GitHub at
      <a href="https://github.com/zabackary/mee-to-pe-web"
        >zabackary/mee-to-pe-web</a
      >.
    </p>
  </main>
</div>

<style>
  main {
    display: grid;
    padding: 1rem;
    max-width: 800px;
    margin: 0 auto;
    font-family: var(--m3-font);
    background-color: rgb(var(--m3-scheme-background));
    color: rgb(var(--m3-scheme-on-background));
    gap: 1rem;
  }

  p {
    margin: 0;
  }

  .parent {
    height: 100%;
    background-color: rgb(var(--m3-scheme-background));
    color: rgb(var(--m3-scheme-on-background));
  }

  h1 {
    font-size: 2rem;
    margin: 0;
  }

  h2 {
    font-size: 1.5rem;
    margin: 0;
    margin-bottom: 0.5rem;
  }

  .attribution {
    color: rgb(var(--m3-scheme-on-surface-variant));
    font-size: 0.8rem;
    text-align: center;
    font-style: italic;
    margin: 0;
  }

  img.hero {
    border-radius: var(--m3-util-rounding-large);
    width: 100%;
    height: 8rem;
    object-fit: cover;
  }

  hr {
    border: none;
    border-top: 1px solid rgb(var(--m3-scheme-outline));
    margin: 0;
  }

  span.step-bubble {
    background: rgb(var(--m3-scheme-primary));
    color: rgb(var(--m3-scheme-on-primary));
    border-radius: 50%;
    width: 3rem;
    height: 3rem;
    text-align: center;
    line-height: 3rem;
    display: inline-block;
    margin-right: 0.5rem;
  }

  img {
    max-width: 100%;
    margin: 0.5rem 0;
  }

  .note {
    color: rgb(var(--m3-scheme-on-surface-variant));
    margin: 0.5rem 0;
  }

  a {
    color: rgb(var(--m3-scheme-primary));
  }

  .upload-target {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 6rem;
    border: 1px dashed rgb(var(--m3-scheme-outline));
    border-radius: var(--m3-util-rounding-medium);
    cursor: pointer;
    position: relative;
    background-color: rgb(var(--m3-scheme-surface));
    color: rgb(var(--m3-scheme-on-surface));
    font: inherit;
    transition:
      background-color 500ms,
      border-width 500ms;
  }

  .upload-target.is-dragging {
    animation: pulse 2s infinite;
    border: 2px dashed rgb(var(--m3-scheme-outline));
  }

  @keyframes pulse {
    0% {
      background-color: rgb(var(--m3-scheme-surface));
    }
    50% {
      background-color: rgb(var(--m3-scheme-surface-variant));
    }
    100% {
      background-color: rgb(var(--m3-scheme-surface));
    }
  }

  .progress-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 6rem;
  }
</style>
