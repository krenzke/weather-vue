<script setup lang="ts">
import SearchBar from './components/SearchBar.vue'
</script>

<template>
  <div class="container">
    <header>
      <h1>Simple Weather App</h1>
      <p>It's just a weather app, keep it simple</p>
    </header>

    <main>
      <SearchBar />
    </main>
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
