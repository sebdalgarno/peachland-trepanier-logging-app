<script>
  import Map from "./Components/Mapbox.svelte";
  import Legend from "./Components/Legend.svelte";
  import Button from "./Components/Button.svelte";
  import Slider from "@smui/slider";
  import Barchart from "./Components/Barchart.svelte";
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
  .sliderContainer {
    margin: 0 auto;
    padding-right: 2rem;
    padding-left: 2.3rem;
    width: 90%;
  }

  p {
    color: white;
    margin: 0.2em;
    /* padding: 0; */
  }

  .year {
    text-align: center;
    padding-bottom: 0;
    margin-bottom: 0;
    /* padding-left: 0.5em; */
    font-size: 3em;
    color: #bdbdbd;
  }

  .pane {
    display: flex;
    flex-direction: column;
    max-height: 100vh;
    /* background-color: #000; */
  }

  .info {
    background: rgba(0, 0, 0, 0.7);
    border-top-right-radius: 5%;
    position: fixed;
    /* min-width: 500px;
    min-height: 300px; */
    width: 40%;
    height: 40%;
    bottom: 0;
    left: 0;
    z-index: 10;
    /* display: grid; */
    grid-gap: 1rem;
    padding: 1em;
    /* overflow: scroll; */
  }

  .map {
    width: 100%;
    height: 100%;
  }

  .title {
    color: #bdbdbd;
    padding: 0 1rem 0 2rem;
    font-size: 1.5rem;
  }

  .inline {
    display: inline-block;
  }

  .header {
    position: fixed;
    padding: 0 1em;
    top: 0;
    left: 0;
    height: 4em;
    background: rgba(0, 0, 0, 0.7);
    z-index: 100;
    border-bottom-right-radius: 5%;
    vertical-align: middle;
  }

  .buttons {
    /* bottom: 40%; */
    /* position: relative; */
    width: 0 auto;
    /* border-top-right-radius: 5%; */
  }

  .extras {
    position: absolute;
    left: 0rem;
    background-color: rgba(0, 0, 0, 0);
    border-radius: 0;
    padding: 5px;
    z-index: 1;
    /* text-align: left; */
  }

  .legend {
    bottom: 40%;
    padding-left: 1rem;
    background-color: rgba(0, 0, 0, 0.7);
    position: absolute;
    left: 0rem;
    padding: 5px;
    z-index: 1;
    /* border-bottom-right-radius: 5%; */
    border-top-right-radius: 5%;
    /* position: relative; */
    color: #bdbdbd;
  }

  @media (max-width: 768px) {
    .info {
      border-top-right-radius: 0;
      width: 100%;
      height: 40%;
    }
    .year {
      font-size: 2.5rem;
    }
    .title {
      display: none;
    }
    .header {
      background: none;
    }
    .story {
      display: none;
    }
  }
</style>

<div class="header">
  <h1 class="inline title">Kettle Watershed Logging 1965-2020</h1>
  <Modal>
    <ModalAbout />
  </Modal>

</div>

<div class="legend ">
  <Legend {palette} {single} {map_palette} {map_palette_single} />
</div>

<div class="info ">
  <div class="buttons extras ">
    {#if !single}
      <Button caption={'by year'} on:single-year={toggleSingle} />
    {:else}
      <Button caption={'all years'} on:single-year={toggleSingle} />
    {/if}

  </div>
  <p class="year">{year}</p>
  <div class="buttons extras increment ">
    <Button caption={'+'} on:add-year={addYear} />
    <Button caption={'-'} on:minus-year={minusYear} />
  </div>

  <div class="sliderContainer">
    <Slider class="mdc-slider" bind:value={slider_value} />
  </div>
  <Chart {year} {single} {palette} {map_palette} {map_palette_single} />
</div>

<div class="pane map">
  <Map {year} {single} {map_palette} {map_palette_single} {bounds} />
</div>
