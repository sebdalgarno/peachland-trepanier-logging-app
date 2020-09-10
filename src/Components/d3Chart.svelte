<script>
  import { onMount } from "svelte";
  import data from "../data.js";
  import { scaleThreshold } from "d3-scale";
  import { year_min, year_max } from "../consts.js";
  import { scaleLinear, timeParse, extent, scaleTime } from "d3";

  let el;

  let city = "austin";
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];

  var width = 800;
  var height = 300;
  var margin = { top: 20, bottom: 20, left: 20, right: 20 };

  data.forEach(d => {
    d.date = timeParse("%Y%m%d")(d.date);
    d.date = new Date(d.date); // x
    d.temp = ++d[city]; // y
  });

  // scales
  let extentX = extent(data, d => d.date);
  let xScale = scaleTime()
    .domain(extentX)
    .range([margin.left, width - margin.right]);

  let extentY = extent(data, d => d[city]);
  let yScale = scaleLinear()
    .domain(extentY)
    .range([height - margin.bottom, margin.top]);

  // ticks for x axis - first day of each month found in the data
  let xTicks = [];
  data.forEach(d => {
    if (d.date.getDate() == 1) {
      xTicks.push(d.date);
    }
  });

  // x axis labels string formatting
  let xLabel = x =>
    monthNames[x.getMonth()] +
    " 20" +
    x
      .getYear()
      .toString()
      .substring(x.getYear(), 1);

  // y ticks count to label by 5's
  let yTicks = [];
  for (
    var i = Math.round(extentY[0]);
    i < Math.round(extentY[1] + 1);
    i = i + 5
  ) {
    yTicks.push(Math.floor(i / 5) * 5);
  }

  // d's for axis paths
  let xPath = `M${margin.left + 0.5},6V0H${width - margin.right + 1}V6`;
  let yPath = `M-6,${height + 0.5}H0.5V0.5H-6`;
</script>

<style>
  svg {
    width: 100%;
    height: 100%;
  }
  .tick {
    font-size: 11px;
  }
</style>

<!-- 
Svelted version of Exercise 1 of Front End Masters course Introduction to Data Visualization with d3.js v4 by Shirley Wu
https://frontendmasters.com/courses/d3-v4/
-->
<svg bind:this={el} transform="translate({margin.left}, {margin.top})">
  <g>
    <!-- bars -->
    {#each data as d}
      <rect
        x={xScale(d.date)}
        y={yScale(d[city])}
        width="2"
        height={height - yScale(d[city])}
        fill="blue"
        stroke="#fff" />
    {/each}
  </g>

  <!-- y axis -->
  <g transform="translate({margin.left}, 0)">
    <path stroke="currentColor" d={yPath} fill="none" />

    {#each yTicks as y}
      <g class="tick" opacity="1" transform="translate(0,{yScale(y)})">
        <line stroke="currentColor" x2="-5" />
        <text dy="0.32em" fill="currentColor" x="-{margin.left}">{y}</text>
      </g>
    {/each}
  </g>

  <!-- x axis -->
  <g transform="translate(0, {height})">
    <path stroke="currentColor" d={xPath} fill="none" />

    {#each xTicks as x}
      <g class="tick" opacity="1" transform="translate({xScale(x)},0)">
        <line stroke="currentColor" y2="6" />
        <text fill="currentColor" y="9" dy="0.71em" x="-{margin.left}">
          {xLabel(x)}
        </text>
      </g>
    {/each}
  </g>
</svg>
