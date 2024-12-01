<script setup lang="ts">
import { useWeatherForecastStore } from '@/stores/weatherForecast'
import { ref } from 'vue'

const searchTermIsZipCode = ref(true)

const store = useWeatherForecastStore()

function performSearch() {
  if (store.searchTerm.trim().match(/\d{5}/)) {
    searchTermIsZipCode.value = true
    store.fetchForecast()
  } else {
    searchTermIsZipCode.value = false
  }
}

function quickSearch(zipCode: string) {
  store.searchTerm = zipCode
  store.fetchForecast()
}
</script>

<template>
  <div class="search-bar">
    <form id="search-form" @submit.prevent="performSearch">
      <input
        type="text"
        v-model="store.searchTerm"
        placeholder="Enter Zip Code"
        id="search-input"
        :class="{ error: !searchTermIsZipCode }"
      />
      <button type="submit" id="search-button">Search</button>
    </form>
    <div>
      <p class="quick-search-title">Quick Search</p>
      <div class="quick-search-buttons">
        <button @click="quickSearch('90277')">Redondo Beach, CA</button>
        <button @click="quickSearch('93529')">June Mountain, CA</button>
        <button @click="quickSearch('94589')">Vallejo, CA</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.search-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1rem 0;
}

#search-form {
  display: flex;
  align-items: stretch;
  box-shadow:
    0 1px 3px 0 rgba(0, 0, 0, 0.1),
    0 1px 2px 0 rgba(0, 0, 0, 0.06);
}

#search-input {
  padding: 0.5rem 0.75rem;
  line-height: 1.25;
  border-radius: 0.25rem 0 0 0.25rem;
  border: solid 1px transparent;
  font-size: 16px;
  outline: none;
  appearance: none;
  color: rgb(74, 85, 104);
  &.error {
    border-color: red;
  }
}

#search-button {
  padding: 0 1rem;
  border-radius: 0 0.25rem 0.25rem 0;
  font-size: 16px;
  font-weight: 700;
  border: none;
  outline: none;
  color: white;
  background-color: #fc8f3a;
  &:hover {
    background-color: #fc7e1d;
  }
  cursor: pointer;
}

.quick-search-title {
  margin-bottom: 0.5rem;
}

.quick-search-buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  & > button {
    cursor: pointer;
    border: none;
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    background-color: #9f4300;
    color: white;
    &:hover {
      background-color: #803600;
    }
  }
}
</style>
