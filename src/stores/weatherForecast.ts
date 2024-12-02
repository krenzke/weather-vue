import { ref, computed } from 'vue'
import type { Ref } from 'vue'
import { defineStore } from 'pinia'
import { type WeatherIconType } from '@/components/WeatherIcon.vue'

// const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

type DailyDataElement = {
  time: number
  temperatureHigh: number
  temperatureLow: number
  summary: string
  precipProbability: number
  icon: WeatherIconType
  windSpeed: string
}

type HourlyDataElement = {
  time: number
  temperature: number
  summary: string
  precipProbability: number
  icon: WeatherIconType
  windSpeed: string
}

type CurrentlyDataElement = {
  time: number
  apparentTemperature: number
  icon: WeatherIconType
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
    icon: WeatherIconType
    summary: string
    data: DailyDataElement[]
  }
  hourly: {
    icon: WeatherIconType
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

  const currentlyData = computed<CurrentlyDataElement | null>(() => {
    if (apiResponse.value === null) {
      return null
    }
    return apiResponse.value.currently
  })

  async function fetchForecast() {
    loading.value = true
    const data = (await fetch(
      `https://api.pirateweather.net/forecast/NZW4Rr82dgJLkcNmNEs4NnHDCpx4Ki1Z/33.844978,-118.387238`,
    ).then((response) => response.json())) as ApiResponse
    apiResponse.value = data
    loading.value = false
  }

  return { searchTerm, fetchForecast, loading, dailyData, hourlyData, currentlyData }
})
