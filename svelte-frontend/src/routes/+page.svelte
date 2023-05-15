<script>
  import MainTable from "../components/Table/MainTable.svelte";
  import Hero from "../components/Hero.svelte";
  /**
   * @type {any}
   */
  export let data;
</script>

<body class="bg-neutral-800 min-h-screen">
  <main class="flex-grow px-8 md:px-16">
    <Hero />
    <MainTable data={data} />
  </main>
</body>
