<template>
  <v-row v-if="isLoading">
    <v-col :lg="6" :md="12" :sm="12">
      <v-skeleton-loader :loading="isLoading" height="400"></v-skeleton-loader>
    </v-col>
    <v-col :lg="6" :md="12" :sm="12">
      <v-skeleton-loader :loading="isLoading" height="400"></v-skeleton-loader>
    </v-col>
  </v-row>
  <v-row v-else>
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

    <template v-if="Object.keys(cities).length > 0">
      <v-col :lg="12">
        <div class="mid-divider">
          <v-divider color="primary"></v-divider>
          <div class="mid-divider-text text-primary text-weight-bold">
            OTHER CITIES
          </div>
          <v-divider color="primary"></v-divider>
        </div>
      </v-col>
    </template>

    <template v-for="cityKey in Object.keys(cities)" :key="cityKey">
      <v-col :lg="6" :md="12" :sm="12">
        <weather-card :weather="cities[cityKey]" :is-delete-able="true" />
      </v-col>
    </template>
  </v-row>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { useToast } from 'vue-toastification';
import { useStore } from 'vuex';
import WeatherCard from '../components/shared/weather/WeatherCard.vue';

const store = useStore();
const toast = useToast();

const isLoading = ref(true);

onMounted(async () => {
  try {
    await store.dispatch('fetchCities');
  } catch (e) {
    toast.error(e.message);
  } finally {
    isLoading.value = false;
  }
});

const dhaka = computed(() => store.getters.getDhakaWeather);
const miyazaki = computed(() => store.getters.getMiyazakiWeather);
const cities = computed(() => store.getters.getAllCitiesWeather);
</script>

<style scoped>
.mid-divider {
  display: flex;
  justify-content: center;
  align-items: center;
}

.mid-divider-text {
  min-width: 150px;
  text-align: center;
}
</style>
