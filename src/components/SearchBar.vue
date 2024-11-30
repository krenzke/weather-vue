<script setup lang="ts">
// defineProps<{
//   msg: string
// }>()
import { useWeatherForecastStore } from '@/stores/weatherForecast'

const store = useWeatherForecastStore()
</script>

<template>
  <div class="search-bar">
    <div>
      <input type="text" v-model="store.searchTerm" />
      <button @click="store.fetchForecast">Click Me</button>
      <p v-if="store.loading">Loading...</p>
      <template v-if="!store.loading">
        <p>Not Loading</p>
        <ul>
          <li v-for="item in store.dailyData" :key="item.time">
            <p>time: {{ item.time }}</p>
            <p>summary: {{ item.summary }}</p>
            <p>icon: {{ item.icon }}</p>
          </li>
        </ul>
      </template>
    </div>
  </div>
</template>

<style scoped>
.search-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
