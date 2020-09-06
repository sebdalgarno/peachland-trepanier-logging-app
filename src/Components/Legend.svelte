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
    color: #bdbdbd;
    border-radius: 5px;
    font: 12px/20px "Lato", sans-serif;
    padding: 5px;
  }

  .legend h4 {
    margin: 0 0 10px;
    text-align: center;
  }

  .legend div span {
    border-radius: 20%;
    display: inline-block;
    height: 10px;
    margin-right: 5px;
    width: 18px;
  }
</style>

{#if single && secondgrowth}
  <div class="legend">
    <div>
      <span style="background-color: {map_palette_single}" />
      {'Harvested'}
    </div>
    <div>
      <span style="background-color: {map_palette_sg[1]}" />
      {'2nd growth'}
    </div>
  </div>
{:else if !single && secondgrowth}
  <div class="legend">
    <h4>
      Years Since
      <br />
      Harvested
    </h4>
    {#each legend_palette as { value, color }}
      <div>
        <span style="background-color: {color}" />
        {value}
      </div>
    {/each}
    <div>
      <span style="background-color: {map_palette_sg[1]}" />
      {'2nd growth'}
    </div>
  </div>
{:else if single && !secondgrowth}
  <div class="legend">
    <div>
      <span style="background-color: {map_palette_single}" />
      {'Harvested'}
    </div>
  </div>
{:else}
  <div class="legend">
    <h4>
      Years Since
      <br />
      Harvested
    </h4>
    {#each legend_palette as { value, color }}
      <div>
        <span style="background-color: {color}" />
        {value}
      </div>
    {/each}
  </div>
{/if}
