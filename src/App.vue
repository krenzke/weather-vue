<script setup lang="ts">
import SearchBar from './components/SearchBar.vue'
import DailyForecastView from './components/DailyForecastView.vue'
import HourlyForecastView from './components/HourlyForecastView.vue'
import { onMounted, ref } from 'vue'
import { useWeatherForecastStore } from './stores/weatherForecast'

const forecastType = ref<'daily' | 'hourly'>('hourly')
const store = useWeatherForecastStore()

onMounted(() => {
  store.searchTerm = '90277'
  store.fetchForecast()
})
</script>

<template>
  <div class="container">
    <header>
      <h1>Simple Weather App</h1>
      <p>It's just a weather app, keep it simple</p>
    </header>

    <main>
      <SearchBar />
      <div class="forecast-type">
        <button :class="{ active: forecastType === 'daily' }" @click="forecastType = 'daily'">
          Daily
        </button>
        <button :class="{ active: forecastType === 'hourly' }" @click="forecastType = 'hourly'">
          Hourly
        </button>
      </div>
      <template v-if="store.loading"> Loading... </template>
      <DailyForecastView v-else-if="forecastType === 'daily'" />
      <HourlyForecastView v-else-if="forecastType === 'hourly'" />
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
.forecast-type {
  display: flex;
  align-items: center;
  margin: 1rem 0;
  & > button {
    padding: 0.5rem 2rem;
    font-size: medium;
    font-weight: 600;
    cursor: pointer;
    background-color: #eee;
    border: none;
    color: #666;
    box-shadow:
      0 1px 3px 0 rgba(0, 0, 0, 0.1),
      0 1px 2px 0 rgba(0, 0, 0, 0.06);
    &.active {
      color: white;
      background-color: #fc8f3a;
    }
    &:first-child {
      border-radius: 5px 0 0 5px;
    }
    &:last-child {
      border-radius: 0 5px 5px 0;
    }
  }
}
</style>
