<template>
  <div>
    <h1>Boutique Nuxt</h1>
    <nav-bar></nav-bar>
    <nuxt />
    <footer>
      <hr />
      Copyright Vue Academy 2021
    </footer>
  </div>
</template>

<script>
    export default {
      head: {
        titleTemplate: '%s - Boutique Nuxt',
      },
    }
</script>

<style scoped>

</style>