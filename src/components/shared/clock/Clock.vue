<template>
  <div class="clock-container">
    {{ time }}
  </div>
</template>

<script setup>
import { addMinutes, format } from 'date-fns';
import { bn, enUS, ja } from 'date-fns/locale';
import { computed, onBeforeUnmount, onMounted, onUpdated, ref } from 'vue';
import { useStore } from 'vuex';

const props = defineProps({
  region: String,
});

const store = useStore();

const currentLanguage = computed(() => store.getters.getCurrentLanguage);

const interval = ref(null);
const time = ref(null);

onBeforeUnmount(() => {
  clearInterval(interval.value);
});

onUpdated(() => {
  clearInterval(interval.value);
  changeClock();
});

onMounted(() => {
  changeClock();
});

const changeClock = () => {
  const locale =
    currentLanguage.value === 'jp'
      ? ja
      : currentLanguage.value === 'bd'
      ? bn
      : enUS;
  interval.value = setInterval(() => {
    time.value = format(getCurrentDateTime(), 'h:mm:ss a', {
      locale,
    });
  }, 1000);
};

const getCurrentDateTime = () => {
  const date = new Date();
  const offset = props.region.toLowerCase() === 'japan' ? 540 : 360;
  return addMinutes(date, date.getTimezoneOffset() + offset);
};
</script>

<style scoped>
.clock-container {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}
.clock-icon {
  font-size: 1rem;
}
</style>
