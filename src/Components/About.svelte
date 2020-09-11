<script>
  export let attribution;
  export let data;
  export let tips;
</script>

<style>
  .title {
    @apply text-xl pt-4 pb-1;
  }

  .text {
    @apply text-sm text-gray-900;
  }

</style>

<div class="z-50">
  <p class="title">Tips for using the app</p>
  <p class="text">{tips}</p>
  <p class="title">Data</p>
  <p class="text">{data}</p>
  <p class="title">Attribution</p>
  <p class="text">{attribution}</p>
  <img
    class="p-2"
    src="img/COMMONSbcLogo.jpg"
    alt="logo"
    width="100"
    height="100" />
</div>
