<template>
  <v-row>
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
import getWeatherInfo from '../api/dummy/fetch-weather';
import WeatherCard from '../components/shared/weather/WeatherCard.vue';

const isLoading = ref(true);
const dhakaWeather = ref(null);
const miyazakiWeather = ref(null);

onMounted(() => {
  dhakaWeather.value = getWeatherInfo();
  miyazakiWeather.value = getWeatherInfo();
  isLoading.value = true;
});
</script>
