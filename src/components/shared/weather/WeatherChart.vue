<template>
  <canvas :id="`weather-chart-${chartId}`"></canvas>
</template>

<script setup>
import Chart from 'chart.js/auto';
import { onMounted } from 'vue';

const props = defineProps({
  chartId: String,
  chartData: Object,
});

const config = {
  type: 'line',
  data: props.chartData,
  options: {
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        min: 0,
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
        align: 'start',
      },
    },
  },
};

onMounted(() => {
  const ctx = document.getElementById(`weather-chart-${props.chartId}`);
  const chart = new Chart(ctx, config);
  chart.canvas.parentNode.style.height = '200px';
});
</script>

<style scoped></style>
