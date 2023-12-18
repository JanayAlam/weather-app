<template>
  <div class="card-container">
    <div class="card-controls">
      <icon-button
        icons="fas fa-maximize'"
        :color="'primary'"
        :variant="'flat'"
        :on-click-handler="() => {}"
      />
      <icon-button
        icons="fas fa-rotate"
        :color="'primary'"
        :variant="'flat'"
        :on-click-handler="() => {}"
      />
      <icon-button
        icons="fas fa-trash"
        :color="'error'"
        :variant="'flat'"
        :on-click-handler="() => {}"
      />
    </div>
    <v-card
      :class="`py-3 px-3 weather-card weather-card-${
        theme.global.current.value.dark ? 'dark' : 'light'
      }`"
    >
      <v-card-text>
        <div class="weather-card-header">
          <div>
            <div class="subtitle">Current Weather</div>
            <div class="title">{{ `${city.name}, ${city.country}` }}</div>
            <div class="subtitle">
              <clock v-if="showClock" :region="city.country" />
            </div>
          </div>
          <div class="sunrise-sunset-container">
            <icon-text
              :icon="'far fa-sun'"
              :content="'6:00 AM'"
              :title="'Sunrise at  6:00 AM'"
            />
            <icon-text
              :icon="'far fa-moon fa-rotate-270'"
              :content="'5:50 PM'"
              :title="'Sunset at  5:50 PM'"
            />
          </div>
        </div>
        <div class="temperature-section p-all-1rem">
          <v-icon icon="fas fa-cloud-sun" class="temp-icon" />
          <div class="text-h2">64&deg;F</div>
          <div class="text-subtitle">
            <div>Haze</div>
            <div>Feels like 70&deg;F</div>
          </div>
        </div>
        <v-sheet class="mt-2" color="transparent">
          <p class="font-weight-regular" style="color: #e53935">Some message</p>
        </v-sheet>
        <hr class="mt-5" style="opacity: 0.2" />
        <div>
          <v-row class="mt-5 align-items-center weather-tip-container">
            <icon-text
              :content="'9.4 Km/h'"
              :icon="'fas fa-wind'"
              :title="'Wind speed 9.4 km/h in the direction of NSW'"
              text-align="start"
            />
            <icon-text
              :content="'15&percnt; could'"
              :icon="'fas fa-cloud'"
              :title="'15&percnt; could cover in the sky'"
            />
            <icon-text
              :content="'84&percnt;'"
              :icon="'fas fa-water'"
              :title="'84&percnt; humidity in the air'"
            />
            <icon-text
              :content="'1042 mb'"
              :icon="'fas fa-atom'"
              :title="'1042 millibar pressure in the air'"
              :text-align="'end'"
            />
          </v-row>
          <v-row class="mt-5 p-all-1rem">
            <weather-chart
              :chart-id="city.name + new Date()"
              :chart-data="chartData"
            />
          </v-row>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup>
import { useTheme } from 'vuetify';
import Clock from '../clock-view/Clock.vue';
import IconText from '../icon-text/IconText.vue';
import WeatherChart from './WeatherChart.vue';
import IconButton from '../buttons/IconButton.vue';

const props = defineProps({
  city: Object,
  showClock: Boolean,
});

const theme = useTheme();

const chartData = {
  labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
  datasets: [
    {
      label: 'Min Temp',
      data: [20, 25, 24, 23, 22, 22, 21],
    },
    {
      label: 'Avg Temp',
      data: [50, 48, 41, 42, 40, 40, 41],
    },
    {
      label: 'Max Temp',
      data: [65, 64, 60, 57, 57, 58, 55],
    },
  ],
};
</script>

<style scoped>
.card-container {
  position: relative;
}

.card-controls {
  position: absolute;
  z-index: 2;
  width: 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  right: 0;
  top: 10rem;
  margin-right: -2rem;
}

.weather-card {
  box-shadow: none;
  font-family: 'Inter';
  position: relative;
  z-index: 1;
}

.weather-tip-container {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

.weather-card-light {
  border: 1px solid #eeeeee;
}

.weather-card-dark {
  border: 1px solid #242424;
}

.weather-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.sunrise-sunset-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
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
  display: flex;
  gap: 2rem;
  align-items: center;
}

.p-all-1rem {
  padding: 1rem;
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
