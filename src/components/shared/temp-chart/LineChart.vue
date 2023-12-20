<template>
  <Line
    :options="options"
    :data="
      isCelsius
        ? {
            labels: currentLanguageLabel,
            datasets: chartData.c,
          }
        : {
            labels: currentLanguageLabel,
            datasets: chartData.f,
          }
    "
  />
</template>

<script setup>
import {
  CategoryScale,
  Chart as ChartJS,
  Colors,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import { computed } from 'vue';
import { Line } from 'vue-chartjs';
import { useStore } from 'vuex';

const store = useStore();

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Colors,
  Legend
);

const props = defineProps({
  chartData: {
    type: Object,
    required: true,
  },
  isCelsius: {
    type: Boolean,
    default: true,
  },
});

const currentLanguageLabel = computed(() =>
  props.chartData.labels.map((e) => [e[0][currentLanguage.value], e[1]])
);

const options = {
  maintainAspectRatio: false,
  scales: {
    x: {
      grid: {
        display: true,
      },
    },
    y: {
      grid: {
        display: false,
      },
    },
  },
  elements: {
    point: { borderWidth: 1 },
  },
  animations: {
    tension: {
      duration: 500,
      easing: 'easeOutQuart',
      from: 1,
      to: 0,
      loop: true,
    },
  },
  plugins: {
    legend: {
      labels: {
        usePointStyle: true,
      },
      position: 'top',
      align: 'center',
    },
  },
};

const currentLanguage = computed(() => store.getters.getCurrentLanguage);
</script>
