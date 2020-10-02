<script>
  import { onMount, onDestroy } from "svelte";
  import { mapbox, key } from "../mapbox.js";
  import Button from "@smui/button";
  import {
    year_min,
    year_max,
    tileset_logging,
    tileset_wsheds,
    tileset_parks,
    tileset_wsheds_lines,
    tileset_parks_lines,
    coordinates,
    source_layer,
    mapbox_style,
    tileset_base,
    // tileset_parks,
    base_colors
  } from "../consts";

  export let year = 1965;
  export let single = false;
  export let map_palette;
  export let map_palette_single;
  export let map_palette_planned;
  export let map_palette_bare;
  export let bounds;

  // let map_palette_sg = ["true", "white", "false", "black"];

  $: if (typeof map !== "undefined" && done) {
    filterLoggedAreas(year, single);
  }

  let done = false;

  let fill_opacity = 0.75;

  let container;
  let map;
  var hoveredStateId = null;

  function filterSingle() {
    map.setFilter("logged", ["==", "year", year]);
  }

  function filterAccumulate() {
    map.setFilter("logged", ["<=", "year", year]);
  }

  let paint_property = year => {
    return [
      "match",
      ["string", ["get", "stay_bare"]],
      ...map_palette_bare,
      [
        "match",
      ["string", ["get", "planned"]],
      ...map_palette_planned,
      [
        "match",
        ["-", year, ["number", ["get", "year"]]],
        ...map_palette,
        map_palette[1]
      ]]
    ];
  };

  let paint_property_single = year => {
    return [
      "match",
      ["string", ["get", "stay_bare"]],
      ...map_palette_bare,
      [
        "match",
      ["string", ["get", "planned"]],
      ...map_palette_planned,
      map_palette_single
      ]
    ];
  };

  // let paint_property_secondgrowth = year => {
  //   return [
  //     "match",
  //     ["string", ["get", "SecondGrowth"]],
  //     ...map_palette_sg,
  //     [
  //       "match",
  //       ["-", year, ["number", ["get", "YearHarvested"]]],
  //       ...map_palette,
  //       "#AAAAAA"
  //     ]
  //   ];
  // };

  function setPalette(year) {
    map.setPaintProperty("logged", "fill-color", paint_property(year));
  }

  function setPaletteSingle(year) {
    map.setPaintProperty("logged", "fill-color", paint_property_single(year));
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
      map.addSource("basemap", {
        type: "raster",
        url: tileset_base
      });
      map.addLayer({
        id: "overlay",
        source: "basemap",
        type: "raster",
        beforeLayer: "logged_simp",
        paint: {
          "raster-opacity": 1
        }
      });
     
    
      map.addSource("parks", {
        type: "vector",
        url: tileset_parks,
        promoteId: "description"
      });
      map.addLayer({
        id: "parks",
        source: "parks",
        "source-layer": "parks",
        type: "fill",
        paint: {
          'fill-opacity': [
'case',
['boolean', ['feature-state', 'hover'], false],
0.7,
0.4],
        'fill-color': 'green'}});
      map.addSource("logged", {
        type: "vector",
        url: tileset_logging,
        promoteId: "id"
      });
      map.addLayer({
        id: "logged",
        source: "logged",
        "source-layer": "logging",
        type: "fill",
        filter: ["==", "year", year],
        paint: {
          'fill-opacity': [
'case',
['boolean', ['feature-state', 'hover'], false],
0.5,
1]}
      });
       map.addSource("wsheds_line", {
        type: "vector",
        url: tileset_wsheds_lines
      });
      map.addLayer({
        id: "wsheds_line",
        source: "wsheds_line",
        "source-layer": "wsheds_line",
        type: "line",
        paint: {
          'line-width': 2,
          'line-color': "black"
      }});
      
      map.addSource("parks_line", {
        type: "vector",
        url: tileset_parks_lines
      });
      map.addLayer({
        id: "parks_line",
        source: "parks_line",
        "source-layer": "parks_line",
        type: "line",
        paint: {
          'line-width': 1,
          'line-color': "black"
      }});
      map.addControl(new mapbox.AttributionControl(), "bottom-right");
      map.fitBounds(bounds);
      done = true;
    });

    var popup = new mapbox.Popup({
      closeButton: false,
      closeOnClick: false
    });

        /////// hover popups for logging areas
    map.on("mousemove", "logged", function(e) {
      // Change the cursor style as a UI indicator.
      map.getCanvas().style.cursor = "pointer";

      var coordinates = e.lngLat;

      var description = `
      <p class='inline-block'>${e.features[0].properties.description}</p>`;
      // Ensure that if the map is zoomed out such that multiple
      // copies of the feature are visible, the popup appears
      // over the copy being pointed to.
      // while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      //   coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      // }

      // Populate the popup and set its coordinates
      // based on the feature found.
      popup
        .setLngLat(coordinates)
        .setHTML(description)
        .addTo(map);
    });

    map.on('mousemove', 'logged', function (e) {
if (e.features.length > 0) {
if (hoveredStateId) {
map.setFeatureState(
{ source: 'logged', id: hoveredStateId, sourceLayer: 'logging' },
{ hover: false }
);
}
hoveredStateId = e.features[0].id;
map.setFeatureState(
{ source: 'logged', id: hoveredStateId, sourceLayer: 'logging'  },
{ hover: true }
);
}
});

    map.on("mouseleave", "logged", function() {
      map.getCanvas().style.cursor = "";
      popup.remove();
      if (hoveredStateId) {
map.setFeatureState(
{ source: 'logged', id: hoveredStateId, sourceLayer: 'logging'  },
{ hover: false }
);
}
hoveredStateId = null;
    });

    /////// hover popups for parks
    var popup_parks = new mapbox.Popup({
      closeButton: false,
      closeOnClick: false
    });

    map.on("mousemove", "parks", function(e) {
      // Change the cursor style as a UI indicator.
      map.getCanvas().style.cursor = "pointer";

      var coordinates = e.lngLat;

      var description = `
      <p class='inline-block'>${e.features[0].properties.description}</p>`;
      popup_parks
        .setLngLat(coordinates)
        .setHTML(description)
        .addTo(map);
    });

    map.on('mousemove', 'parks', function (e) {
if (e.features.length > 0) {
if (hoveredStateId) {
map.setFeatureState(
{ source: 'parks', id: hoveredStateId, sourceLayer: 'parks' },
{ hover: false }
);
}
hoveredStateId = e.features[0].id;
map.setFeatureState(
{ source: 'parks', id: hoveredStateId, sourceLayer: 'parks'  },
{ hover: true }
);
}
});

    map.on("mouseleave", "parks", function() {
      map.getCanvas().style.cursor = "";
      popup_parks.remove();
      if (hoveredStateId) {
map.setFeatureState(
{ source: 'parks', id: hoveredStateId, sourceLayer: 'parks'  },
{ hover: false }
);
}
hoveredStateId = null;
    });
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

<div class="map bg-black" bind:this={container}>
  <slot />
</div>
