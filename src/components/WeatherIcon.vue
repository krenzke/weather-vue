<script setup lang="ts">
import Cloud from '@/assets/images/cloud.png'
import CloudyDay from '@/assets/images/cloudy_day.png'
import CloudyNight from '@/assets/images/cloudy_night.png'
import Fog from '@/assets/images/fog.png'
import Hail from '@/assets/images/hail.png'
import Night from '@/assets/images/night.png'
import Rain from '@/assets/images/rain.png'
import Snow from '@/assets/images/snow.png'
import Sunny from '@/assets/images/sunny.png'
import Windy from '@/assets/images/windy.png'

export type WeatherIconType =
  | 'clear-day'
  | 'clear-night'
  | 'rain'
  | 'snow'
  | 'sleet'
  | 'wind'
  | 'fog'
  | 'cloudy'
  | 'partly-cloudy-day'
  | 'partly-cloudy-night'

const props = defineProps<{ icon: WeatherIconType }>()

const iconMap = {
  'clear-day': Sunny,
  'clear-night': Night,
  rain: Rain,
  snow: Snow,
  sleet: Hail,
  wind: Windy,
  fog: Fog,
  cloudy: Cloud,
  'partly-cloudy-day': CloudyDay,
  'partly-cloudy-night': CloudyNight,
}
</script>

<template>
  <img :src="iconMap[props.icon]" :alt="props.icon" class="image" />
</template>

<style scoped>
.image {
  max-width: 100%;
  max-height: 100%;
  min-width: 50px;
  min-height: 50px;
  object-fit: contain;
}
</style>
