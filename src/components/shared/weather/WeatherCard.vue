<template>
  <v-card
    :class="`py-3 px-3 weather-card weather-card-${
      theme.global.current.value.dark ? 'dark' : 'light'
    }`"
  >
    <v-card-text>
      <div class="subtitle">Current Weather</div>
      <div class="title">{{ `${city.name}, ${city.country}` }}</div>
      <div class="subtitle">
        <clock v-if="showClock" :region="city.country" />
      </div>
      <div class="temperature-section">
        <v-icon icon="fas fa-cloud-sun" class="temp-icon" />
        <div class="text-h2">64&deg;F</div>
        <div class="text-subtitle">
          <div>Haze</div>
          <div>Feels like 70&deg;F</div>
        </div>
      </div>
      <hr class="mt-5" style="opacity: 0.2" />
      <div>
        <v-row class="mt-5 align-items-center">
          <weather-tip
            :content="'9.4 Km/h'"
            :icon="'wind'"
            :title="'Wind speed 9.4 km/h in the direction of NSW'"
            text-align="start"
          />
          <weather-tip
            :content="'15&percnt; could'"
            :icon="'cloud'"
            :title="'15&percnt; could cover in the sky'"
          />
          <weather-tip
            :content="'84&percnt; humidity'"
            :icon="'water'"
            :title="'84&percnt; humidity in the air'"
          />
          <weather-tip
            :content="'1042 mb pressure'"
            :icon="'atom'"
            :title="'1042 millibar pressure in the air'"
            :text-align="'end'"
          />
        </v-row>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { useTheme } from 'vuetify';
import Clock from '../clock/Clock.vue';
import WeatherTip from './WeatherTip.vue';

const props = defineProps({
  city: Object,
  showClock: Boolean,
});

const theme = useTheme();
</script>

<style scoped>
.weather-card {
  box-shadow: none;
  font-family: 'Inter';
}

.weather-card-light {
  border: 1px solid #eeeeee;
}

.weather-card-dark {
  border: 1px solid #242424;
}

.title {
  font-size: 1.4rem;
  font-weight: 700;
}

.subtitle {
  margin-top: 0.2rem;
  opacity: 0.8;
}

.temperature-section {
  margin-top: 0.5rem;
  padding: 1rem;
  display: flex;
  gap: 2rem;
  align-items: center;
}

.temp-icon {
  font-size: 5rem;
}

.temp {
  font-size: 3rem;
}

.align-items-center {
  align-items: center;
}
</style>
