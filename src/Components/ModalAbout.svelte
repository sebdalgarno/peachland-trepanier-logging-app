<script>
  import { getContext } from "svelte";
  import About from "./About.svelte";
  import Button from "./Button.svelte";
  import { attribution, data, tips } from "../about";

  const { open } = getContext("simple-modal");
  //   export let message;

  const showAbout = () => {
    open(About, {
      attribution: attribution,
      tips: tips,
      data: data
    });
  };
</script>

<Button caption={'about'} outline={false} on:click={showAbout} />
