<script setup lang="ts">
import { unixTimestampToDate } from '@/utils/unixTimestampFormat'
import WeatherIcon, { type WeatherIconType } from './WeatherIcon.vue'
import PrecipPredict from './PrecipitationPrediction.vue'

const props = defineProps<{
  time: number
  summary: string
  temperatureLow: number
  temperatureHigh: number
  icon: WeatherIconType
  precipProbability: number
}>()
</script>

<template>
  <div class="tile">
    <div>
      <h3 class="date">{{ unixTimestampToDate(props.time) }}</h3>
      <p class="summary">{{ props.summary }}</p>
    </div>
    <div class="icon">
      <WeatherIcon :icon="props.icon" />
    </div>
    <div class="temperatures">
      <div>
        <p>Low</p>
        <p class="temperature">{{ props.temperatureLow }}</p>
      </div>
      <div>
        <PrecipPredict class="precipitation" :precip-probability="props.precipProbability" />
      </div>
      <div>
        <p>High</p>
        <p class="temperature">{{ props.temperatureHigh }}</p>
      </div>
    </div>
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
  display: flex;
  justify-content: center;
  align-items: center;
}
.temperatures {
  display: flex;
  gap: 0.5rem;
  justify-content: space-between;
  align-items: center;

  & > :last-child {
    text-align: right;
  }

  .temperature {
    font-weight: 600;
    font-size: larger;
  }

  .precipitation {
    font-size: large;
  }
}
</style>
