<script setup lang="ts">
import { useWeatherForecastStore } from '@/stores/weatherForecast'
import DailyTile from './DailyTile.vue'

const store = useWeatherForecastStore()
</script>

<template>
  <div class="daily-view-grid">
    <div v-for="item in store.dailyData" :key="item.time">
      <DailyTile
        :time="item.time"
        :icon="item.icon"
        :summary="item.summary"
        :temperature-high="item.temperatureHigh"
        :temperature-low="item.temperatureLow"
        :precip-probability="item.precipProbability"
      />
    </div>
  </div>
</template>

<style scoped>
.daily-view-grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(2, 1fr);
  @container (min-width: 34rem) {
    grid-template-columns: repeat(3, 1fr);
  }
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
