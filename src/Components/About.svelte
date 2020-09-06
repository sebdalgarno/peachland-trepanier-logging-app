<script>
  export let attribution;
  export let data;
  export let tips;
</script>

<style>
  .about {
    z-index: 1;
  }

  .logo {
    padding: 1rem;
  }
</style>

<div class="about">
  <h3>Tips for using the app</h3>
  <p>{tips}</p>
  <h3>Data</h3>
  <p>{data}</p>
  <h3>Attribution</h3>
  <p>{attribution}</p>
  <img
    class="logo"
    src="img/COMMONSbcLogo.jpg"
    alt="logo"
    width="100"
    height="100" />
  <!-- <img
    class="logo"
    src="img/BFWSS_Logo_300pct.png"
    alt="logo"
    width="148"
    height="100" /> -->
  <!-- <h3>Data sources</h3>
  <p>{data_source}</p> -->
</div>
