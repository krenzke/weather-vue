<script setup lang="ts">
// import HelloWorld from './components/HelloWorld.vue'
// import TheWelcome from './components/TheWelcome.vue'
</script>

<template>
  <div class="container">
    <header>
      <h1>Simple Weather App</h1>
      <p>It's just a weather app, keep it simple</p>
    </header>

    <main>hello</main>
  </div>
</template>

<style scoped>
header {
  margin: 1rem 0;
  & > h1 {
    margin-bottom: 0;
  }
  & > p {
    color: var(--subtext-grey);
    font-style: italic;
  }
}
</style>
