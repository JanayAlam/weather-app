<template>
  <v-row v-if="isLoading">
    <v-col :lg="6" :md="12" :sm="12">
      <v-skeleton-loader :loading="isLoading" height="500"></v-skeleton-loader>
    </v-col>
    <v-col :lg="6" :md="12" :sm="12">
      <v-skeleton-loader :loading="isLoading" height="500"></v-skeleton-loader>
    </v-col>
  </v-row>
  <v-row v-if="!isLoading">
    <!-- DHAKA -->
    <v-col :lg="6" :md="12" :sm="12">
      <weather-card
        v-if="dhakaWeather"
        :weather="dhakaWeather"
        :is-delete-able="false"
      />
    </v-col>
    <!-- MIYAZAKI -->
    <v-col :lg="6" :md="12" :sm="12">
      <weather-card
        v-if="miyazakiWeather"
        :weather="miyazakiWeather"
        :is-delete-able="false"
      />
    </v-col>
  </v-row>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import getWeatherInfo from '../api/fetch-weather';
import WeatherCard from '../components/shared/weather/WeatherCard.vue';

const isLoading = ref(true);
const dhakaWeather = ref(null);
const miyazakiWeather = ref(null);

onMounted(async () => {
  const dhakaRes = await getWeatherInfo('Dhaka');
  const miyazakiRes = await getWeatherInfo('Miyazaki');

  dhakaWeather.value = dhakaRes;
  miyazakiWeather.value = miyazakiRes;
  isLoading.value = false;
});
</script>
