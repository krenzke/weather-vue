import { ref, computed } from 'vue'
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

type HourlyDataElement = DailyDataElement

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
  hourly: {
    icon: string
    summary: string
    data: HourlyDataElement[]
  }
}

export const useWeatherForecastStore = defineStore('weatherForecast', () => {
  const searchTerm = ref('')
  const loading = ref(false)
  const apiResponse: Ref<ApiResponse | null> = ref(null)

  const dailyData = computed<DailyDataElement[]>(() => {
    if (apiResponse.value === null) {
      return []
    }
    return apiResponse.value.daily.data
  })

  const hourlyData = computed<HourlyDataElement[]>(() => {
    if (apiResponse.value === null) {
      return []
    }
    return apiResponse.value.hourly.data
  })

  async function fetchForecast() {
    console.log('Fetching forecast for ', searchTerm.value)
    loading.value = true
    const data = (await fetch(
      `https://api.pirateweather.net/forecast/NZW4Rr82dgJLkcNmNEs4NnHDCpx4Ki1Z/33.844978,-118.387238`,
    ).then((response) => response.json())) as ApiResponse
    console.log(data)
    apiResponse.value = data
    loading.value = false
  }

  return { searchTerm, fetchForecast, loading, dailyData, hourlyData }
})
