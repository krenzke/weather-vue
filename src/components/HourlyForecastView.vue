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
  type ChartOptions,
  type ChartData,
} from 'chart.js'
import annotationPlugin from 'chartjs-plugin-annotation'

ChartJS.register(CategoryScale, LinearScale, LineElement, Tooltip, PointElement, annotationPlugin)

// get base data
const store = useWeatherForecastStore()
const labels = computed(() => store.hourlyData.map((d) => unixTimestampToTime(d.time)))
const temperatures = computed(() => store.hourlyData.map((d) => d.temperature))
const precipitations = computed(() => store.hourlyData.map((d) => d.precipProbability))

// compute annotation box (to outline where the next day)
// starts on the chart
const firstMidnightIndex = labels.value.indexOf('12:00am')
const nextDayLabel =
  firstMidnightIndex < 0 ? null : unixTimestampToDate(store.hourlyData[firstMidnightIndex].time)

const chartData: ChartData<'line'> = {
  labels: labels.value,
  datasets: [
    {
      data: temperatures.value,
      fill: false,
      tension: 0.5,
      pointStyle: false,
      borderColor: '#fc8f3a',
      yAxisID: 'y1',
    },
    {
      data: precipitations.value,
      fill: false,
      tension: 0.5,
      pointStyle: false,
      borderColor: '#134e59',
      yAxisID: 'y2',
    },
  ],
}

const chartOptions: ChartOptions<'line'> = {
  scales: {
    y1: { title: { display: true, text: 'Temperature (F)' }, position: 'left' },
    y2: {
      title: { display: true, text: 'Precipitation (%)' },
      position: 'right',
      grid: { drawOnChartArea: false },
      min: -0.01,
      suggestedMax: 10,
    },
  },
  animation: false,
  plugins: {
    tooltip: { enabled: false },
    annotation: {
      annotations:
        firstMidnightIndex < 0
          ? []
          : [
              {
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
            ],
    },
  },
}
</script>

<template>
  <Line :data="chartData" :options="chartOptions" />
</template>

<style scoped></style>
