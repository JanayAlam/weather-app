<template>
  <canvas :id="`weather-chart-${chartId}`"></canvas>
</template>

<script setup>
import Chart from 'chart.js/auto';
import { onMounted, ref } from 'vue';

const chart = ref(null);

const props = defineProps({
  chartId: {
    type: String,
    required: true,
  },
  chartData: {
    type: Object,
    required: true,
  },
  isCelsius: {
    type: Boolean,
    default: true,
  },
});

const config = {
  type: 'line',
  options: {
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
  },
};

onMounted(() => {
  renderChart();
});

const renderChart = () => {
  const ctx = document.getElementById(`weather-chart-${props.chartId}`);
  chart.value = new Chart(ctx, config);
  chart.value.canvas.parentNode.style.height = '200px';
  chart.value.data.labels = props.chartData.labels;
  chart.value.data.datasets = props.isCelsius
    ? props.chartData.c
    : props.chartData.f;
};
</script>

<style scoped></style>
