<script setup lang="ts">
import { computed } from 'vue'
import { Line } from 'vue-chartjs'
import { useWeatherForecastStore } from '@/stores/weatherForecast'
import { unixTimestampToDate, unixTimestampToTime } from '@/utils/unixTimestampFormat'
import {
  Chart as ChartJS,
  Tooltip,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  type ChartData,
  plugins,
} from 'chart.js'
import annotationPlugin from 'chartjs-plugin-annotation'

ChartJS.register(CategoryScale, LinearScale, LineElement, Tooltip, PointElement, annotationPlugin)

const store = useWeatherForecastStore()
const labels = computed(() => store.hourlyData.map((d) => unixTimestampToTime(d.time)))
const temperatures = computed(() => store.hourlyData.map((d) => d.temperature))

const firstMidnightIndex = labels.value.indexOf('12:00am')
const nextDayLabel = unixTimestampToDate(store.hourlyData[firstMidnightIndex].time)

const chartData: ChartData<'line'> = {
  labels: labels.value,
  datasets: [
    {
      data: temperatures.value,
      fill: false,
      tension: 0.5,
      pointStyle: false,
      borderColor: '#fc8f3a',
    },
  ],
}

const chartOptions = {
  scales: {
    y: { title: { display: true, text: 'Temperature (F)' } },
  },
  plugins: {
    annotation: {
      annotations: {
        box1: {
          type: 'box',
          xMin: firstMidnightIndex,
          xMax: firstMidnightIndex + 24,
          backgroundColor: 'rgba(0, 0, 0, 0.15)',
          drawTime: 'beforeDatasetsDraw',
          borderWidth: 0,
          label: {
            color: 'black',
            content: nextDayLabel,
            display: true,
            position: { x: 'center', y: 'start' },
          },
        },
      },
    },
  },
}
</script>

<template>
  <Line :data="chartData" :options="chartOptions" />
</template>

<style scoped></style>
