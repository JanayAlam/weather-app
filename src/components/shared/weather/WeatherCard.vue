<template>
  <div class="card-container">
    <div class="card-controls">
      <icon-button
        :icons="`fas fa-${tempUnit === 'c' ? 'f' : 'c'}`"
        :title="`Change to ${
          tempUnit === 'c' ? 'fahrenheit' : 'celsius'
        } scale`"
        tooltipLocation="start"
        color="primary"
        variant="flat"
        :on-click-handler="toggleTempUnit"
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
              {{
                `${weather.location.region || weather.location.name}, ${
                  weather.location.country
                }`
              }}
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
              :location="'start'"
            />
            <icon-text
              :icon="'far fa-moon fa-rotate-270'"
              :content="weather.current.astro.sunset"
              :title="`Sunrise at ${weather.current.astro.sunset}`"
              :location="'start'"
            />
          </div>
        </div>
        <temperature
          :is-celsius="tempUnit === 'c'"
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
            :content="{
              en: `${weather.current.wind.speed} km/h`,
              bd: `${weather.current.wind.speed} কি.মি./ঘন্টা`,
              jp: `${weather.current.wind.speed} キロメートル時速`,
            }"
            icon="fas fa-wind"
            :title="{
              en: `Wind speed ${weather.current.wind.speed} km/h from the direction of ${weather.current.wind.direction}`,
              bd: `${weather.current.wind.direction} দিক থেকে ${weather.current.wind.speed} কিলোমিটার বেগে বাতাস বেয়ে চলছে`,
              jp: `時速${weather.current.wind.speed}キロメートル、${weather.current.wind.direction}から方向`,
            }"
            text-align="start"
          />
          <icon-text
            :content="{
              en: `${weather.current.cloud}&percnt; cloud`,
              bd: `${weather.current.cloud}&percnt; মেঘ`,
              jp: `${weather.current.cloud}&percnt; 雲`,
            }"
            :icon="'fas fa-cloud'"
            :title="{
              en: `${weather.current.cloud}&percnt; of the sky is cloudy`,
              bd: `${weather.current.cloud}&percnt; আকাশ মেঘাচ্ছন্ন হয়ে আছে`,
              jp: `空の${weather.current.cloud}&percnt;が曇っています`,
            }"
          />
          <icon-text
            :content="`${weather.current.humidity}&percnt;`"
            :icon="'fas fa-water'"
            :title="{
              en: `${weather.current.humidity}&percnt; humidity in the air`,
              bd: `আর্দ্রতা ${weather.current.humidity}&percnt;`,
              jp: `湿度${weather.current.humidity}&percnt;`,
            }"
          />
          <icon-text
            :content="{
              en: `${weather.current.pressure} mb`,
              bd: `${weather.current.pressure} মিলিবার`,
              jp: `${weather.current.pressure} ミリバール`,
            }"
            :icon="'fas fa-atom'"
            :title="{
              en: `${weather.current.pressure} millibar pressure in the air`,
              bd: `বাতাসে চাপ ${weather.current.pressure} মিলিবার`,
              jp: `空気圧${weather.current.pressure}ミリバール`,
            }"
            :text-align="'end'"
          />
        </v-row>
        <v-row class="mt-5 p-all-1rem">
          <line-chart
            v-if="chartDataset !== null"
            :chart-id="
              weather.location.name + new Date() + Math.random() + Math.random()
            "
            :chartData="chartDataset"
            :is-celsius="tempUnit === 'c'"
          ></line-chart>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { useTheme } from 'vuetify';
import generateChartDataset from '../../../utils/chart-dataset';
import IconButton from '../buttons/IconButton.vue';
import Clock from '../clock-view/Clock.vue';
import IconText from '../icon-text/IconText.vue';
import LineChart from '../temp-chart/LineChart.vue';
import Temperature from './Temperature.vue';

const theme = useTheme();

const tempUnit = ref('c');
const chartDataset = ref(null);

const props = defineProps({
  weather: Object,
  showClock: Boolean,
});

onMounted(() => {
  chartDataset.value = generateChartDataset([...props.weather.forecasts]);
});

const toggleTempUnit = () => {
  tempUnit.value = tempUnit.value === 'c' ? 'f' : 'c';
};

const chartData = computed(() => {
  const data = {
    labels: chartData.value.labels,
  };
  if (tempUnit === 'c') {
    data.datasets = chartData.value.c;
  } else {
    data.datasets = chartData.value.f;
  }
  return data;
});
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
