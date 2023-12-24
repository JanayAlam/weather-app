<template>
  <div class="temperature-section">
    <img :src="condition.icon" class="temp-icon" alt="Condition Icon" />
    <div class="temp-text" id="temperature-text">
      {{ isCelsius ? temp.c : temp.f }}&deg;{{ isCelsius ? 'C' : 'F' }}
    </div>
    <div class="text-subtitle">
      <div id="temperature-condition-text">
        {{ condition.text[currentLanguage] }}
      </div>
      <div v-if="feelsLike" id="temperature-feels-like">
        {{ getFeelsLikeText }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const props = defineProps({
  isCelsius: {
    type: Boolean,
    required: false,
    default: true,
  },
  temp: {
    type: Object,
    required: true,
  },
  condition: {
    type: Object,
    required: true,
  },
  feelsLike: {
    type: Object,
    required: false,
  },
});

const currentLanguage = computed(() => store.getters.getCurrentLanguage);

const getFeelsLikeText = computed(() => {
  let willFeelLike = props.isCelsius ? props.feelsLike.c : props.feelsLike.f;

  switch (currentLanguage.value) {
    case 'jp':
      return `${willFeelLike}度${
        props.isCelsius ? '摂氏' : '華氏'
      }くらいに感じます`;
    case 'bd':
      return `${willFeelLike} ডিগ্রি ${
        props.isCelsius ? 'সেলসিয়াস' : 'ফারেনহাইট'
      } অনুভূত হচ্ছে`;
    default:
      return `Feels like ${willFeelLike}° ${
        props.isCelsius ? 'celsius' : 'fahrenheit'
      }`;
  }
});
</script>

<style scoped>
.temperature-section {
  margin: 2rem 0;
  display: flex;
  gap: 1rem;
  align-items: center;
}

.temp-icon {
  height: 75px;
  width: 75px;
}

.temp-text {
  font-size: 4rem;
  font-family: 'Big Shoulders Display', 'Roboto', sans-serif;
}

.text-subtitle {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}
</style>
