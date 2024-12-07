import { ref, computed } from 'vue'
import type { Ref } from 'vue'
import { defineStore } from 'pinia'
import { type WeatherIconType } from '@/components/WeatherIcon.vue'

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

const BASE_API_URL = import.meta.env.VITE_BASE_API_URL

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
    const data = (await fetch(`${BASE_API_URL}/forecast/${searchTerm.value}`).then((response) =>
      response.json(),
    )) as ApiResponse
    apiResponse.value = data
    loading.value = false
  }

  return { searchTerm, fetchForecast, loading, dailyData, hourlyData, currentlyData }
})
