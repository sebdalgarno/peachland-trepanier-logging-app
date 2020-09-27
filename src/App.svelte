<script>
  import Map from "./Components/Mapbox.svelte";
  import Legend from "./Components/Legend.svelte";
  import Button from "./Components/Button.svelte";
  import Slider from "@smui/slider";
  import D3Chart from "./Components/d3Chart.svelte";
  import Chart from "./Components/Barchart.svelte";
  import Modal from "svelte-simple-modal";
  import ModalAbout from "./Components/ModalAbout.svelte";
  import chroma from "chroma-js";
  import {
    base_colors,
    coordinates,
    year_min,
    year_max,
    bounds
  } from "./consts";

  let yeardiff = year_max - year_min;
  let palette = chroma
    .bezier(base_colors)
    .scale()
    .correctLightness()
    .colors(51);

  for (let i = 50; i < yeardiff; i++) {
    palette.push(palette[49]);
  }

  let map_palette = [];
  for (let i = 0; i < palette.length; i++) {
    map_palette.push(i);
    map_palette.push(palette[i]);
  }
  let map_palette_single = map_palette[11];
  let map_palette_planned = ["true", "#E6007E"];


  let caption = "Single Year";
  let year = year_min;
  let single = false;

  function toggleSingle() {
    single = !single;
  }

  function addYear() {
    if (year != year_max) {
      year++;
    }
  }

  function minusYear() {
    if (year != year_min) {
      year--;
    }
  }
</script>

<style>

</style>

<header
  class="invisible absolute py-1 w-full bg-black text-gray-400 text-1.5 p-5
  bg-opacity-75 sm:visible" style="z-index: 2;">
  A History of Logging in Peachland and Trepanier Watersheds
  <Modal >
    <ModalAbout />
  </Modal>
</header>

<div class="flex absolute bottom-0 w-full md:w-6/12 lg:w-6/12 xl:w-5/12 " style="height: 330px;">
  <div class="w-full bg-black bg-opacity-75 p-2" style="z-index: 1;">
    <div class="absolute">
      {#if !single}
        <Button caption={'by year'} on:single-year={toggleSingle} />
      {:else}
        <Button caption={'all years'} on:single-year={toggleSingle} />
      {/if}

    </div>
    <div class="text-center flex justify-center">
      <Button outline={false} caption={'-'} on:minus-year={minusYear} />
      <div class="inline-block">
        <p class="text-5xl text-gray-500">{year}</p>
      </div>
      <Button outline={false} caption={'+'} on:add-year={addYear} />
    </div>

    <div class="pl-5 w-10/12 -mt-2">
      <Slider class="mdc-slider" bind:value={year} min={1968} max={2020} step={1} discrete />
    </div>

    <div class="">
      <Chart {year} {single} {palette} {map_palette} {map_palette_single} />
      <!-- <D3Chart /> -->

    </div>
  </div>

  
</div>

<div class=" absolute invisible md:visible p-0 md:p-2 rounded-lg bg-black bg-opacity-75 text-gray-400" style="z-index: 1; top: 75px; right: 10px;">
  <Legend {palette} {single} {map_palette} {map_palette_single} />
</div>


<Map {year} {single} {map_palette} {map_palette_single} {map_palette_planned} {bounds} />
