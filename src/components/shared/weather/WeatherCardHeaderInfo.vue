<template>
  <div>
    <div class="subtitle">
      <span v-if="!props.date">{{ headPrefixText }} | </span>{{ headText }}
    </div>
    <div class="title">
      {{ `${location.region || location.name}, ${location.country}` }}
    </div>
    <div class="subtitle">
      <clock :region="location.country" :tzId="location.tzId" />
    </div>
  </div>
</template>

<script setup>
import { format } from 'date-fns';
import { bn, enUS, ja } from 'date-fns/locale';
import { computed } from 'vue';
import { useStore } from 'vuex';
import { getCurrentDateTime } from '../../../utils/date-time';
import Clock from '../clock-view/Clock.vue';

const store = useStore();

const props = defineProps({
  date: {
    type: Date,
    required: false,
  },
  location: {
    type: Object,
    required: true,
  },
});

const currentLanguage = computed(() => store.getters.getCurrentLanguage);

const headPrefixText = computed(() =>
  currentLanguage.value === 'jp'
    ? '現在の天気'
    : currentLanguage.value === 'bd'
    ? 'বর্তমান আবহাওয়া'
    : 'Current Weather'
);

const headText = computed(() => {
  const formatStr =
    currentLanguage.value === 'jp'
      ? `yyyy年 MMMM dd日, EEEE`
      : `dd MMMM yyyy, EEEE`;

  const locale =
    currentLanguage.value === 'jp'
      ? ja
      : currentLanguage.value === 'bd'
      ? bn
      : enUS;
  if (!props.date) {
    return format(getCurrentDateTime(props.location.tzId), formatStr, {
      locale,
    });
  }
  return format(new Date(props.date), formatStr, { locale });
});
</script>

<style scoped>
.title {
  font-size: 1.4rem;
  font-weight: 700;
}

.subtitle {
  margin-top: 0.2rem;
  opacity: 0.8;
}
</style>
