<script>
  import { onMount, onDestroy } from "svelte";
  import { mapbox, key } from "../mapbox.js";
  import Button from "@smui/button";
  import {
    year_min,
    year_max,
    tileset_id,
    coordinates,
    source_layer,
    mapbox_style,
    // tileset_base,
    // tileset_parks,
    base_colors
  } from "../consts";

  export let year = 1965;
  export let single = false;
  export let map_palette;
  export let map_palette_single;
  export let bounds;

  // let map_palette_sg = ["true", "white", "false", "black"];

  $: if (typeof map !== "undefined" && done) {
    filterLoggedAreas(year, single);
  }

  let done = false;

  let fill_opacity = 0.75;

  let container;
  let map;

  function filterSingle() {
    map.setFilter("logged_simp", ["==", "year", year]);
    map.setFilter("logged", ["==", "year", year]);
  }

  function filterAccumulate() {
    map.setFilter("logged_simp", ["<=", "year", year]);
    map.setFilter("logged", ["<=", "year", year]);
  }

  let paint_property = year => {
    return [
      "match",
      ["-", year, ["number", ["get", "year"]]],
      ...map_palette,
      base_colors[1]
    ];
  };

  function setPalette(year) {
    map.setPaintProperty("logged_simp", "fill-color", paint_property(year));
    map.setPaintProperty("logged", "fill-color", paint_property(year));
  }

  function setPaletteSingle(year) {
    map.setPaintProperty("logged_simp", "fill-color", map_palette_single);
    map.setPaintProperty("logged", "fill-color", map_palette_single);
  }

  function filterLoggedAreas(year, single) {
    if (single) {
      setPaletteSingle();
      filterSingle();
    } else {
      setPalette(year);
      filterAccumulate();
    }
  }

  onMount(async () => {
    map = new mapbox.Map({
      container,
      style: mapbox_style,
      center: coordinates,
      zoom: 5,
      bearing: 10,
      attributionControl: false,
      logoPosition: "bottom-right"
    });

    map.on("load", function() {
      // map.addSource("basemap", {
      //   type: "raster",
      //   url: tileset_base
      // });
      map.addLayer({
        id: "overlay",
        source: "basemap",
        type: "raster",
        beforeLayer: "logged_simp",
        paint: {
          "raster-opacity": 1
        }
      });
      map.addSource("logged", {
        type: "vector",
        url: tileset_id
      });
      map.addLayer({
        id: "logged_simp",
        source: "logged",
        "source-layer": source_layer[0],
        type: "fill",
        filter: ["==", "year", year],
        paint: {
          "fill-color": [
            "match",
            ["-", year, ["number", ["get", "year"]]],
            ...map_palette,
            "#AAAAAA"
          ]
        },
        "fill-opacity": fill_opacity
      });
      map.addLayer({
        id: "logged",
        source: "logged",
        "source-layer": source_layer[1],
        type: "fill",
        filter: ["==", "year", year],
        paint: {
          "fill-color": [
            "match",
            ["-", year, ["number", ["get", "year"]]],
            ...map_palette,
            "#AAAAAA"
          ]
        },
        "fill-opacity": fill_opacity
      });
      // map.addSource("parks", {
      //   type: "vector",
      //   url: tileset_parks
      // });
      // map.addLayer({
      //   id: "parks",
      //   type: "symbol",
      //   source: "parks",
      //   "source-layer": "parks2-a8pz3j",
      //   layout: {
      //     "text-field": [
      //       "format",
      //       ["get", "name"],
      //       { "font-scale": 1.1 },
      //       "\n",
      //       {},
      //       ["get", "name2"]
      //     ],
      //     // "text-field": ["get", "name"],
      //     "text-variable-anchor": ["top", "bottom", "left", "right"],
      //     "text-radial-offset": 0.5,
      //     "text-justify": "auto",
      //     "icon-image": ["concat", ["get", "icon"], "-12"]
      //   }
      // });
      map.addControl(new mapbox.AttributionControl(), "bottom-right");
      map.fitBounds(bounds);
      done = true;
    });

    // map.moveLayer("basemap");
    // map.moveLayer("logged_simp");
  });
</script>

<style>
  .map {
    width: 100%;
    height: 100%;
  }
</style>

<div class="map" bind:this={container}>
  <slot />
</div>
