<script setup lang="ts">
const props = defineProps<{
  precipProbability: number
}>()
</script>

<template>
  <span class="prediction"> {{ props.precipProbability }}% </span>
</template>

<style scoped>
.prediction {
  padding: 0.25rem;
  background-image: url('@/assets/images/raindrops.png');
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
}
</style>
