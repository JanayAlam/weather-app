<template>
  <v-row>
    <!-- DHAKA -->
    <v-col :lg="6" :md="12" :sm="12">
      <weather-card
        v-if="dhakaWeather"
        :weather="dhakaWeather"
        :showClock="true"
      />
    </v-col>
    <!-- MIYAZAKI -->
    <v-col :lg="6" :md="12" :sm="12">
      <weather-card
        v-if="miyazakiWeather"
        :weather="miyazakiWeather"
        :showClock="true"
      />
    </v-col>
  </v-row>
</template>

<script setup>
import WeatherCard from '../components/shared/weather/WeatherCard.vue';
import getWeatherInfo from '../api/dummy/fetch-weather';
import { ref, onMounted } from 'vue';

const isLoading = ref(true);
const dhakaWeather = ref(null);
const miyazakiWeather = ref(null);

onMounted(() => {
  dhakaWeather.value = getWeatherInfo();
  miyazakiWeather.value = getWeatherInfo();
  console.log(dhakaWeather.value);
  isLoading.value = true;
});
</script>
