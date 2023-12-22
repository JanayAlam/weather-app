<template>
  <v-sheet class="weather-icon-pill">
    <v-icon :icon="icon" class="icon" />
    <div class="title">{{ title }}</div>
    <hr style="opacity: 1; width: 100%" />
    <div class="value">
      {{ value }}
    </div>
  </v-sheet>
</template>

<script setup>
const props = defineProps({
  icon: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
});
</script>

<style scoped>
.weather-icon-pill {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
}

.icon {
  font-size: 1rem;
}

.title,
.value {
  font-size: 0.8rem;
}

.title {
  text-transform: capitalize;
}
</style>
