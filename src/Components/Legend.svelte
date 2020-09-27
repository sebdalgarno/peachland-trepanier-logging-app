<script>
  export let palette;
  export let single;
  export let secondgrowth;
  export let map_palette;
  export let map_palette_planned;
  export let map_palette_single;

  let legend_palette = [
    { value: "0", color: palette[0] },
    { value: "10", color: palette[10] },
    { value: "20", color: palette[20] },
    { value: "30", color: palette[30] },
    { value: "40", color: palette[40] },
    { value: "> 50", color: palette[50] },
    {value: "Planned", color: map_palette_planned[1]}
    // { value: 116, color: palette[116] }
  ];

  let legend_single = [
    { value: "Harvested", color: map_palette_single },
    {value: "Planned", color: map_palette_planned[1]}
    // { value: 116, color: palette[116] }
  ];
</script>

<style>
  .legend {
    @apply text-gray-500 p-2 z-50 text-xs;
  }

  .legendspan {
    @apply inline-block h-2 mr-1 w-3 text-xs;
  }
</style>

{#if single}
  <div class="legend">
    {#each legend_single as { value, color }}
      <div>
        <span class="legendspan" style="background-color: {color}" />
        {value}
      </div>
    {/each}
  </div>
{:else}
  <div class="legend">
    <div class="text-xs">
      Years Since
      <br />
      Harvested
    </div>
    {#each legend_palette as { value, color }}
      <div>
        <span class="legendspan" style="background-color: {color}" />
        {value}
      </div>
    {/each}
  </div>
{/if}
