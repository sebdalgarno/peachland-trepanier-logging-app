<script>
  import { createEventDispatcher } from "svelte";

  export let caption;
  export let toggle = false;
  export let outline = true;

  const dispatch = createEventDispatcher();

  function singleYear() {
    dispatch("single-year");
  }

  function secondGrowth() {
    dispatch("second-growth");
  }

  function addYear() {
    dispatch("add-year");
  }

  function minusYear() {
    dispatch("minus-year");
  }

  //   function showFilter() {
  //     dispatch("show-filter");
  //   }
</script>

<style>
  button,
  a {
    font: inherit;
    /* display: block; */
    border: 1px solid #666;
    background: transparent;
    padding: 0.5rem 0.5rem;
    margin: 0.5rem 0.1rem;
    color: #bdbdbd;
    border-radius: 20px;
    /* box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.26); */
    cursor: pointer;
    text-decoration: none;
    font-size: 75%;
  }

  .plain {
    border: 0px solid black;
    color: #666;
    font-size: 90%;
  }

  .active {
    background: rgba(255, 255, 255, 0.15);
  }

  button:focus {
    outline: none;
  }
</style>

{#if outline}
  <button
    on:click={secondGrowth}
    on:click={addYear}
    on:click={minusYear}
    on:click={singleYear}>
    {caption}
  </button>
{:else}
  <button class="plain" on:click>{caption}</button>
{/if}
