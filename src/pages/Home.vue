<template>
  <v-row v-if="isLoading">
    <v-col :lg="6" :md="12" :sm="12">
      <v-skeleton-loader :loading="isLoading" height="400"></v-skeleton-loader>
    </v-col>
    <v-col :lg="6" :md="12" :sm="12">
      <v-skeleton-loader :loading="isLoading" height="400"></v-skeleton-loader>
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
import { useToast } from 'vue-toastification';
import getWeatherInfo from '../api/fetch-weather';
import WeatherCard from '../components/shared/weather/WeatherCard.vue';
import {
  cacheDhaka,
  cacheMiyazaki,
  getCacheValueDhaka,
  getCacheValueMiyazaki,
} from '../utils/caching-local-storage';

const isLoading = ref(true);
const dhakaWeather = ref(null);
const miyazakiWeather = ref(null);

const toast = useToast();

onMounted(async () => {
  const dhakaDataObj = getCacheValueDhaka();
  const miyazakiDataObj = getCacheValueMiyazaki();

  // DHAKA
  if (dhakaDataObj.isFetchRequired) {
    try {
      dhakaWeather.value = await getWeatherInfo('Dhaka');
      cacheDhaka(dhakaWeather.value);
    } catch (e) {
      toast.error(e.data.error.message);
    }
  } else {
    dhakaWeather.value = dhakaDataObj.data;
  }

  // MIYAZAKI
  if (miyazakiDataObj.isFetchRequired) {
    try {
      miyazakiWeather.value = await getWeatherInfo('Miyazaki');
      cacheMiyazaki(miyazakiWeather.value);
    } catch (e) {
      toast.error(e.data.error.message);
    }
  } else {
    miyazakiWeather.value = miyazakiDataObj.data;
  }

  isLoading.value = false;
});
</script>
