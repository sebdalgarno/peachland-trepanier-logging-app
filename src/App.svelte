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

  let caption = "Single Year";
  let year = year_min;
  let slider_value;
  $: if (slider_value) {
    year = Math.floor((slider_value / 100) * (year_max - year_min) + year_min);
  }
  let single = false;

  function toggleSingle() {
    single = !single;
  }

  function addYear() {
    if (year != 2020) {
      year++;
    }
  }

  function minusYear() {
    if (year != 1965) {
      year--;
    }
  }
</script>

<style>

</style>

<header
  class="invisible absolute py-1 w-full bg-black text-gray-400 text-1.5 p-5
  bg-opacity-50 z-50 sm:visible">
  A History of Logging in Peachland and Trepanier Watersheds 1965-2020
  <Modal>
    <ModalAbout />
  </Modal>
</header>

<div class="flex absolute bottom-0 w-full md:w-7/12 lg:w-6/12 xl:w-5/12">
  <div class="w-10/12 z-50 bg-black bg-opacity-50 p-2">
    <div class="absolute">
      {#if !single}
        <Button caption={'by year'} on:single-year={toggleSingle} />
      {:else}
        <Button caption={'all years'} on:single-year={toggleSingle} />
      {/if}

    </div>
    <div class="text-center flex">
      <Button outline={false} caption={'-'} on:minus-year={minusYear} />
      <div class="inline-block">
        <p class="text-5xl text-gray-400">{year}</p>
      </div>
      <Button outline={false} caption={'+'} on:add-year={addYear} />
    </div>

    <!-- <div class="buttons extras increment " /> -->

    <div class="mx-auto pl-3 w-11/12 -mt-2">
      <Slider class="mdc-slider" bind:value={slider_value} />
    </div>

    <div class="">
      <!-- <Chart {year} {single} {palette} {map_palette} {map_palette_single} /> -->
      <D3Chart />

    </div>
  </div>
  <div class="w-2/12 p-2 bottom-0 bg-black bg-opacity-50 z-10 text-gray-400">
    <Legend {palette} {single} {map_palette} {map_palette_single} />
  </div>
</div>

<Map {year} {single} {map_palette} {map_palette_single} {bounds} />
