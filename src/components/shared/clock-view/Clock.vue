<template>
  <div class="clock-container">
    <div class="loader" v-if="isLoading">
      {{
        currentLanguage === 'en'
          ? 'Loading clock...'
          : currentLanguage === 'bd'
          ? 'ঘড়ি লোড হচ্ছে...'
          : '時計を読み込んでいます...'
      }}
    </div>
    <template v-else>
      <div class="clock" id="clock-time">{{ time }}</div>
      <div id="clock-am-pm">{{ a }}</div>
    </template>
  </div>
</template>

<script setup>
import { format } from 'date-fns';
import { bn, enUS, ja } from 'date-fns/locale';
import { computed, onBeforeUnmount, onMounted, onUpdated, ref } from 'vue';
import { useStore } from 'vuex';
import { getCurrentDateTime } from '../../../utils/date-time';

const props = defineProps({
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
    time.value = format(getCurrentDateTime(props.tzId), 'hh:mm:ss');
    a.value = format(getCurrentDateTime(props.tzId), 'a', { locale });
  }, 1000);
};
</script>

<style scoped>
.clock-container {
  display: flex;
  align-items: center;
}
.clock {
  min-width: 65px;
}
</style>
