<script>
  import * as Pancake from "@sveltejs/pancake";
  // import { spring } from 'svelte/motion';
  import { onMount } from "svelte";
  import data from "../year_totals.js";
  import { scaleThreshold } from "d3-scale";
  import { year_min, year_max } from "../consts.js";

  export let palette;
  export let map_palette;
  export let map_palette_planned;
  export let map_palette_bare;
  export let map_palette_single;
  export let year = year_min;
  export let single = false;

  const age1 = 1000;
  const year0 = year_min;
  const year1 = year_max;
  const max = age1

  const years = range(year0, year1, 20);
  const total = range(0, age1, 100);

  let el;
  let w = 410;
  let closest;
  console.log(closest);

  function range(a, b, step) {
    const array = [];
    for (; a <= b; a += step) array.push(a);
    return array;
  }

  function format(num) {
    return num ? `${num} Ha` : "";
  }

  let x1;
  let x2;
  let selected;
  let age;

  $: x2 = year1;
  $: x1 = year0;
  $: if (single) {
    selected = data.filter(function(x) {
      return x.year == year;
    });
  } else {
    selected = data.filter(function(x) {
      return x.year <= year;
    });
  }
  $: if (selected) {
    if (single) {
      selected.age = 20;
    } else {
      let l = selected.length;
      age = range(0, l, 1);
      selected.forEach((x, i) => {
        x.age = l - age[i];
      });
    }
    // console.log(selected.length);
  }
</script>

<style>
  .chart {
    padding: 1em;
    position: absolute;
    width: 78%;
    height: 40%;
    /* min-height: 150px; */
    /* overflow: scroll; */
    text-align: center;
    margin: 0 auto;
  }

  .background,
  .foreground {
    position: absolute;
    width: 100%;
    height: 100%;
    /* padding: 3em 3em 2em 0; */
    box-sizing: border-box;
  }

  .grid-line {
    position: relative;
    display: block;
  }

  .grid-line.horizontal {
    width: 100%;
    left: 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0);
  }

  .label {
    position: absolute;
    font-size: 14px;
    /* color: #666; */
    line-height: 1;
    white-space: nowrap;
  }

  .y.label {
    left: calc(100% + 1em);
    bottom: -0.5em;
    line-height: 1;
  }

  .x.label {
    width: 4em;
    left: -2em;
    bottom: 5px;
    text-align: center;
  }

  .background .x.label {
    color: white;
    font-size: 10px;
  }

  .foreground .x.label {
    bottom: -22px;
  }

  .box {
    position: absolute;
    left: 0;
    top: 2px;
    width: 100%;
    height: calc(100% - 4px);
  }

  .box.selected {
    opacity: 1;
    /* background-color: #1f77b4; */
  }

  .box.data {
    /* background-color: #212121; */
    opacity: 1;
    /* opacity: 0.1; */
  }

  .highlight {
    background-color: #ff3e00;
  }

  .annotation {
    position: absolute;
    white-space: nowrap;
    bottom: 1em;
    line-height: 1.2;
    background-color: rgba(255, 255, 255, 0.9);
    padding: 0.2em 0.4em;
    border-radius: 2px;
  }

  .annotation-point {
    position: absolute;
    width: 10px;
    height: 10px;
    background-color: #ff3e00;
    border-radius: 50%;
    transform: translate(-50%, -50%);
  }

  .annotation strong {
    display: block;
    font-size: 20px;
  }

  .annotation span {
    display: block;
    font-size: 14px;
  }
</style>

<!-- <svelte:window on:resize={handle_resize} /> -->

<div class="chart " bind:clientWidth={w} bind:this={el}>
  <div class="background">
    <Pancake.Chart {x1} {x2} y1={0} y2={max}>
      <Pancake.Grid horizontal count={5} let:value let:first>
        <div class="grid-line horizontal" />
        <span class="y label text-gray-700">{format(value)}</span>
      </Pancake.Grid>
      <Pancake.Columns {data} x={d => d.year} y={d => d.total} width={1.0}>
        <div class="box data bg-gray-800" />
      </Pancake.Columns>
      {#if single}
        {#each selected as select, i}
          <Pancake.Box
            x1={select.year - 0.5}
            x2={select.year + 0.5}
            y1={0}
            y2={select.total}>
            <div
              class="box selected"
              style="background-color: {map_palette_single}" />
          </Pancake.Box>
        {/each}
      {:else}
        {#each selected as select, i}
          <Pancake.Box
            x1={select.year - 0.5}
            x2={select.year + 0.5}
            y1={0}
            y2={select.total}>
            <div
              class="box selected"
              style="background-color: {palette[select.age]}" />
          </Pancake.Box>
        {/each}
      {/if}
      {#each selected as select, i}
          <Pancake.Box
            x1={select.year - 0.5}
            x2={select.year + 0.5}
            y1={0}
            y2={select.planned}>
            <div
              class="box selected"
              style="background-color: {map_palette_planned[1]}" />
          </Pancake.Box>
        {/each}
        {#each selected as select, i}
          <Pancake.Box
            x1={select.year - 0.5}
            x2={select.year + 0.5}
            y1={0}
            y2={select.bare}>
            <div
              class="box selected"
              style="background-color: {map_palette_bare[1]}" />
          </Pancake.Box>
        {/each}
    </Pancake.Chart>
  </div>

  <div class="foreground">
    <Pancake.Chart {x1} {x2} y1={0} y2={max}>
      <Pancake.Grid vertical count={7} let:value>
        <span class="x label text-gray-700">{value}</span>
      </Pancake.Grid>
    </Pancake.Chart>
  </div>
</div>
