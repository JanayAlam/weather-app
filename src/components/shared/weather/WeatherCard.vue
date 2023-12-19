<template>
  <div class="card-container">
    <div class="card-controls">
      <icon-button
        icons="fas fa-rotate"
        color="primary"
        variant="flat"
        :on-click-handler="() => {}"
      />
      <icon-button
        icons="fas fa-up-right-and-down-left-from-center"
        color="primary"
        variant="flat"
        :on-click-handler="() => {}"
      />
      <icon-button
        icons="fas fa-trash"
        color="error"
        variant="flat"
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
            <div class="title">
              {{ `${weather.location.name}, ${weather.location.country}` }}
            </div>
            <div class="subtitle">
              <clock
                v-if="showClock"
                :region="weather.location.country"
                :tzId="weather.location.tzId"
              />
            </div>
          </div>
          <div class="sunrise-sunset-container">
            <icon-text
              :icon="'far fa-sun'"
              :content="weather.current.astro.sunrise"
              :title="`Sunrise at ${weather.current.astro.sunrise}`"
            />
            <icon-text
              :icon="'far fa-moon fa-rotate-270'"
              :content="weather.current.astro.sunset"
              :title="`Sunrise at ${weather.current.astro.sunset}`"
            />
          </div>
        </div>
        <temperature
          :is-celsius="true"
          :temp="weather.current.temp"
          :condition="weather.current.condition"
          :feels-like="weather.current.feelsLike"
        />
        <v-sheet class="mt-2" color="transparent">
          <p class="font-weight-bold" style="color: #e53935">
            {{ weather.current.uv }} UV
          </p>
        </v-sheet>
        <hr class="mt-5" style="opacity: 0.2" />

        <v-row class="mt-5 align-items-center weather-tip-container">
          <icon-text
            :content="weather.current.wind.speed"
            :icon="'fas fa-wind'"
            :title="`Wind speed ${weather.current.wind.speed} km/h in the direction of ${weather.current.wind.direction}`"
            text-align="start"
          />
          <icon-text
            :content="`${weather.current.cloud}&percnt; could`"
            :icon="'fas fa-cloud'"
            :title="`${weather.current.cloud}&percnt; could cover in the sky`"
          />
          <icon-text
            :content="`${weather.current.humidity}&percnt;`"
            :icon="'fas fa-water'"
            :title="`${weather.current.humidity}&percnt; humidity in the air`"
          />
          <icon-text
            :content="`${weather.current.pressure} mb`"
            :icon="'fas fa-atom'"
            :title="`${weather.current.pressure} millibar pressure in the air`"
            :text-align="'end'"
          />
        </v-row>
        <v-row class="mt-5 p-all-1rem">
          <temperature-chart
            :chart-id="
              weather.location.name + new Date() + Math.random() + Math.random()
            "
            :chart-data="chartData"
          />
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useTheme } from 'vuetify';
import { useStore } from 'vuex';
import IconButton from '../buttons/IconButton.vue';
import Clock from '../clock-view/Clock.vue';
import IconText from '../icon-text/IconText.vue';
import TemperatureChart from '../temp-chart/TemperatureChart.vue';
import Temperature from './Temperature.vue';

const props = defineProps({
  weather: Object,
  showClock: Boolean,
});

const theme = useTheme();
const store = useStore();

const currentLanguage = computed(() => store.getters.getCurrentLanguage);

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
  display: none;
}

.card-container:hover .card-controls {
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

.p-all-1rem {
  padding: 1rem;
}

.align-items-center {
  align-items: center;
}
</style>
