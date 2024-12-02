<script setup lang="ts">
import { useWeatherForecastStore } from '@/stores/weatherForecast'
import { unixTimestampToString } from '@/utils/unixTimestampFormat'
import { storeToRefs } from 'pinia'
import WeatherIcon from './WeatherIcon.vue'

const store = useWeatherForecastStore()
const { currentlyData: data } = storeToRefs(store)
</script>

<template>
  <div class="tile" v-if="!!data">
    <div>
      <h3 class="date">{{ unixTimestampToString(data?.time, 'EEE, MMM d h:mmaa') }}</h3>
      <p class="summary">{{ data.summary }}</p>
    </div>
    <div class="icon">
      <WeatherIcon :icon="data.icon" />
    </div>
    <div class="temperature">{{ data.temperature }} F</div>
  </div>
</template>

<style scoped>
.tile {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
  height: 100%;
  & > div {
    min-height: 0;
  }
}
.date {
  font-weight: 600;
}
.summary {
  margin: 0.25rem 0;
  font-style: italic;
  color: #666;
}
.icon {
  flex: 1;
  margin: 1rem 0;
  text-align: center;
}
.temperature {
  text-align: center;
  font-weight: 600;
  font-size: x-large;
}
</style>
