<script setup lang="ts">
import { useWeatherForecastStore } from '@/stores/weatherForecast'
import DailyTile from './DailyTile.vue'

const store = useWeatherForecastStore()
</script>

<template>
  <div>Daily View</div>
  <div class="daily-view-grid">
    <div v-for="item in store.dailyData" :key="item.time">
      <DailyTile v-bind="item" />
    </div>
  </div>
</template>

<style scoped>
.daily-view-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-columns: repeat(4, minmax(175px, 1fr));
  gap: 1rem;
  & > div {
    flex: 1;
    aspect-ratio: 1/1;
    border: solid 1px 666px;
    box-shadow:
      0 1px 3px 0 rgba(0, 0, 0, 0.1),
      0 1px 2px 0 rgba(0, 0, 0, 0.06);
    padding: 0.5rem;
  }
}
</style>
