<template>
  <div class="clock-container">
    <div class="loader" v-if="isLoading">Loading clock...</div>
    <div class="clock" v-else>{{ time }}</div>
    <div>{{ a }}</div>
  </div>
</template>

<script setup>
import { format } from 'date-fns';
import { bn, enUS, ja } from 'date-fns/locale';
import { computed, onBeforeUnmount, onMounted, onUpdated, ref } from 'vue';
import { useStore } from 'vuex';
import { utcToZonedTime } from 'date-fns-tz';

const props = defineProps({
  region: String,
  tzId: String,
});

const store = useStore();

const currentLanguage = computed(() => store.getters.getCurrentLanguage);

const interval = ref(null);
const time = ref(null);
const a = ref(null);
const isLoading = ref(true);

onBeforeUnmount(() => {
  clearInterval(interval.value);
});

onUpdated(() => {
  clearInterval(interval.value);
  changeClock();
});

onMounted(() => {
  changeClock();
  setTimeout(() => {
    isLoading.value = false;
  }, 1000);
});

const changeClock = () => {
  const locale =
    currentLanguage.value === 'jp'
      ? ja
      : currentLanguage.value === 'bd'
      ? bn
      : enUS;
  interval.value = setInterval(() => {
    time.value = format(getCurrentDateTime(), 'h:mm:ss');
    a.value = format(getCurrentDateTime(), 'a', { locale });
  }, 1000);
};

const getCurrentDateTime = () => {
  const date = new Date();
  return utcToZonedTime(date, props.tzId);
};
</script>

<style scoped>
.clock-container {
  display: flex;
  align-items: center;
}
.clock {
  min-width: 60px;
}
</style>
