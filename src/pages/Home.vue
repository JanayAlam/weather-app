<template>
  <!-- <v-row v-if="isLoading">
    <v-col :lg="6" :md="12" :sm="12">
      <v-skeleton-loader :loading="isLoading" height="400"></v-skeleton-loader>
    </v-col>
    <v-col :lg="6" :md="12" :sm="12">
      <v-skeleton-loader :loading="isLoading" height="400"></v-skeleton-loader>
    </v-col>
  </v-row> -->
  <v-row v-if="!isLoading">
    <!-- DHAKA -->
    <v-col :lg="6" :md="12" :sm="12">
      <weather-card v-if="dhaka" :weather="dhaka" :is-delete-able="false" />
    </v-col>
    <!-- MIYAZAKI -->
    <v-col :lg="6" :md="12" :sm="12">
      <weather-card
        v-if="miyazaki"
        :weather="miyazaki"
        :is-delete-able="false"
      />
    </v-col>
  </v-row>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import WeatherCard from '../components/shared/weather/WeatherCard.vue';

const isLoading = ref(true);

const store = useStore();

const dhaka = computed(() => store.getters.getDhakaWeather);
const miyazaki = computed(() => store.getters.getMiyazakiWeather);

const addNewCity = () => {};
</script>
