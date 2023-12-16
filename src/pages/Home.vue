<template>
  <v-row>
    <!-- DHAKA -->
    <v-col :lg="6" :md="12" :sm="12">
      <weather-card :city="dhaka" :showClock="true" />
    </v-col>
    <!-- MIYAZAKI -->
    <v-col :lg="6" :md="12" :sm="12">
      <weather-card :city="miyazaki" :showClock="true" />
    </v-col>
  </v-row>
</template>

<script setup>
import WeatherCard from '../components/shared/weather/WeatherCard.vue';

const dhaka = {
  name: 'Dhaka',
  country: 'Bangladesh',
};

const miyazaki = {
  name: 'Miyazaki',
  country: 'Japan',
};
</script>
