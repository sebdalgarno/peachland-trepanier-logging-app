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

  function openModal() {
    dispatch("open-modal");
  }
</script>

<style>
  button:focus {
    outline: none;
  }
</style>

{#if outline}
  <button
    class="border-gray-600 p-2 text-gray-400 rounded-lg text-sm leading-none"
    on:click={singleYear}>
    {caption}
  </button>
{:else}
  <button
    class="p-3 border-0 text-gray-600 text-sm"
    on:click={addYear}
    on:click={minusYear}
    on:click={openModal}>
    {caption}
  </button>
{/if}
