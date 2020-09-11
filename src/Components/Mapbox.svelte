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
    map.setFilter("logged", ["==", "year", year]);
  }

  function filterAccumulate() {
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
    map.setPaintProperty("logged", "fill-color", paint_property(year));
  }

  function setPaletteSingle(year) {
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
        id: "logged",
        source: "logged",
        "source-layer": "logging",
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
      map.addControl(new mapbox.AttributionControl(), "bottom-right");
      map.fitBounds(bounds);
      done = true;
    });

    var popup = new mapbox.Popup({
      closeButton: false,
      closeOnClick: false
    });

    map.on("mouseenter", "logged", function(e) {
      // Change the cursor style as a UI indicator.
      map.getCanvas().style.cursor = "pointer";

      var coordinates = e.lngLat;
      var description = "Year: " + e.features[0].properties.year + "<br/>" + "Area logged (ha): " + Math.round(e.features[0].properties.area);

      // Ensure that if the map is zoomed out such that multiple
      // copies of the feature are visible, the popup appears
      // over the copy being pointed to.
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      // Populate the popup and set its coordinates
      // based on the feature found.
      popup
        .setLngLat(coordinates)
        .setHTML(description)
        .addTo(map);
    });

    map.on("mouseleave", "logged", function() {
      map.getCanvas().style.cursor = "";
      popup.remove();
    });
    // map.moveLayer("basemap");
    // map.moveLayer("logged_simp");
  });
</script>

<style>
  .map {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    z-index: 0.1;
  }

  .mapbox-popup {
    z-index: 100;
    max-width: 400px;
    font: 12px/20px "Helvetica Neue", Arial, Helvetica, sans-serif;
  }
</style>

<div class="map" bind:this={container}>
  <slot />
</div>
