<script setup lang="ts">
import { useWeatherForecastStore } from '@/stores/weatherForecast'

const store = useWeatherForecastStore()
</script>

<template>
  <div>Daily View</div>
  <ul class="daily-view-list">
    <li v-for="item in store.dailyData" :key="item.time">
      {{ item.time }}, {{ item.summary }} {{ item.temperatureLow }} {{ item.temperatureHigh }}
      {{ item.icon }}
    </li>
  </ul>
</template>

<style scoped>
ul.daily-view-list {
  list-style: none;
  display: flex;
  padding: 0;
  justify-content: center;
  gap: 0.5rem;
  & > li {
    flex: 1;
    border: solid 1px 666px;
    box-shadow:
      0 1px 3px 0 rgba(0, 0, 0, 0.1),
      0 1px 2px 0 rgba(0, 0, 0, 0.06);
    padding: 0.5rem;
  }
}
</style>
