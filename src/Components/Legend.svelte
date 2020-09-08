<script>
  export let palette;
  export let single;
  export let secondgrowth;
  export let map_palette;
  export let map_palette_sg;
  export let map_palette_single;

  let legend_palette = [
    { value: "0", color: palette[0] },
    { value: "10", color: palette[10] },
    { value: "20", color: palette[20] },
    { value: "30", color: palette[30] },
    { value: "40", color: palette[40] },
    { value: "> 50", color: palette[50] }
    // { value: 116, color: palette[116] }
  ];
</script>

<style>
  .legend {
    @apply text-gray-400 p-3 z-50 text-sm;
  }

  .legendspan {
    @apply inline-block h-2 mr-1 w-3;
  }
</style>

{#if single}
  <div class="legend">
    <div>
      <span class="legendspan" style="background-color: {map_palette_single}" />
      {'Harvested'}
    </div>
  </div>
{:else}
  <div class="legend">
    <h4>
      Years Since
      <br />
      Harvest
    </h4>
    {#each legend_palette as { value, color }}
      <div>
        <span class="legendspan" style="background-color: {color}" />
        {value}
      </div>
    {/each}
  </div>
{/if}
