import { ref } from 'vue'
import type { Ref } from 'vue'
import { defineStore } from 'pinia'

// const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

type DailyDataElement = {
  time: number
  temperatureHigh: number
  temperatureLow: number
  summary: string
  precipProbability: number
  icon: string
  windSpeed: string
}

type CurrentlyDataElement = {
  time: number
  apparentTemperature: number
  icon: string
  precipProbability: number
  summary: string
  temperature: number
  windSpeed: number
}

type ApiResponse = {
  latitude: number
  longitude: number
  timezone: string
  currently: CurrentlyDataElement
  daily: {
    icon: string
    summary: string
    data: DailyDataElement[]
  }
}

export const useWeatherForecastStore = defineStore('weatherForecast', () => {
  const searchTerm = ref('')
  const loading = ref(false)
  const forecastType: Ref<'daily', 'hourly'> = ref('daily')
  const dailyData: Ref<DailyDataElement[]> = ref([])

  async function fetchForecast() {
    loading.value = true
    const data = (await fetch(
      `https://api.pirateweather.net/forecast/NZW4Rr82dgJLkcNmNEs4NnHDCpx4Ki1Z/33.844978,-118.387238`,
    ).then((response) => response.json())) as ApiResponse
    console.log(data)
    dailyData.value = data.daily.data
    loading.value = false
  }

  return { searchTerm, fetchForecast, loading, dailyData, forecastType }
})
